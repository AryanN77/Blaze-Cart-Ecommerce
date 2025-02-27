import prisma from "@/db/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";



export async function POST(req: Request) {
    try {
        const body = await req.text();
        const signature = (await headers()).get("stripe-signature");

        if (!signature) return new Response("Invalid signature", { status: 400 });

        const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

        if (event.type == "checkout.session.completed") {
            if (!event.data.object.customer_details?.email) throw new Error("Missing Email");
        }

        const session = event.data.object as Stripe.Checkout.Session

        const { userId, orderId, cartId } = session.metadata || { userId: null, orderId: null, cartId: null }

        if (!userId || !orderId || !cartId) throw new Error("Invalid Metadata");

        const shippingAddress = session.customer_details?.address;

        await prisma.order.update({
            where: { id: orderId },
            data: {
                status: "Delivered",
                shippingAddress: {
                    create: {
                        name: session.customer_details?.name!,
                        city: session.customer_details?.address?.city!,
                        street: session.customer_details?.address?.line1!,
                        country: session.customer_details?.address?.country!,
                        postalCode: session.customer_details?.address?.postal_code!,
                        state: session.customer_details?.address?.state
                    }
                }
            },

        })

        await prisma.cartItem.deleteMany({
            where: {
                cartId,
            }
        })

        return NextResponse.json({ result: event, ok: true })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something Went Wrong", ok: false }, { status: 300 })
    }
}