"use server"

import prisma from "@/db/prisma";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Order } from "@prisma/client";


export async function getMyCart() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("Invalid Action");

    const foundUser = await prisma.user.findUnique({
        where: {
            email: user?.email!,
        }
    })

    if (!foundUser) throw new Error("Invalid User")

    const myCart = await prisma.cart.findUnique({
        where: {
            userId: user?.id,
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    })

    let total = 0;
    myCart?.items.map((item) => {
        total += item.quantity * (item.product.price)
    })
    if (total) {
        return { myCart, total }
    }
    return { items: [] }
}

export async function updateQuantityActions({ prodId, action }: { prodId: string, action: string }) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("Invalid Action");

    const foundUser = await prisma.user.findUnique({
        where: {
            email: user?.email!,
        }
    })

    if (!foundUser) throw new Error("Invalid User")

    const foundProd = await prisma.product.findUnique({
        where: {
            id: prodId
        }
    })
    if (!foundProd) throw new Error("Product not found in Inventory");

    const myCart = await prisma.cart.findUnique({
        where: {
            userId: user?.id,
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    })
    if (!myCart) throw new Error("No Cart Found")

    const inCart = myCart?.items.find((item) => item.productId == prodId);

    if (!inCart) throw new Error("Product not Found in The Cart");

    const newQuant = action == "inc" ? inCart.quantity + 1 : inCart.quantity - 1;
    if (newQuant > foundProd.stock) throw new Error("Insufficient Stock")
    if (newQuant < 1) {
        await prisma.cartItem.delete({
            where: {
                id: inCart.id
            }
        })

        return { success: true, message: "Product Removed from Cart" }
    } else {

        await prisma.cartItem.update({
            where: {
                id: inCart.id
            },
            data: {
                quantity: newQuant
            }
        })

        return { success: true, message: "Quantity Updated" }
    }
}

export async function createCheckoutSessionActions({ cartId, totalPrice }: { cartId: string, totalPrice: number }) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("Invalid Action");

    const foundCart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    })

    if (!foundCart) throw new Error("Invalid Cart")

    const myOrder = await prisma.order.create({
        data: {
            userId: user?.id,
            totalPrice,
            status: "Pending",
            items: {
                create: foundCart.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity
                }))
            }
        },
        include: { items: true }
    })



    for (const items in myOrder.items) {

    }
    const lineItems = await Promise.all(
        myOrder.items.map(async (item) => {
            const product = await prisma.product.findUnique({
                where: { id: item.productId }
            })

            if (!product) {
                throw new Error(`Product with ID ${item.productId} not Found`);
            }

            return {
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: product.name,
                        images: [product.imageUrl]
                    },
                    unit_amount: product.price,
                },
                quantity: item.quantity
            }

        })
    )


    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/my-orders/${myOrder.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/my-cart`,
        payment_method_types: ['card'],
        mode: "payment",
        shipping_address_collection: { allowed_countries: ["IN", "US", "NZ"] },
        metadata: {
            userId: user?.id,
            orderId: myOrder.id,
            cartId: foundCart.id
        },
        line_items: lineItems

    })


    // console.log(stripeSession.url)
    return { url: stripeSession.url }

}