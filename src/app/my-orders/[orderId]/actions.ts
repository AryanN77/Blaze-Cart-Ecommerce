"use server"

import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function getAllOrdersAction() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("Authenticate To Proceed");

    const foundUser = await prisma.user.findUnique({
        where: {
            id: user?.id
        }
    })

    if (!foundUser) throw new Error("User Not Found");

    const orders = await prisma.order.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 5
    })

    if (!orders) return { orders: [] }
    return { orders }
}

export async function getOrderDetailsAction({ orderId }: { orderId: string }) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("Authenticate To Proceed");

    const foundUser = await prisma.user.findUnique({
        where: {
            id: user?.id
        }
    })

    if (!foundUser) throw new Error("User Not Found");

    const myOrder = await prisma.order.findUnique({
        where: {
            userId: user.id,
            id: orderId,
        },
        include: {
            items: {
                include: {
                    product: true
                }
            },
        }
    })

    let totalPrice = 0;
    myOrder?.items.map((item) => {
        totalPrice += item.quantity * (item.product.price / 100);
    })
    if (totalPrice) {
        return { items: myOrder?.items, totalPrice, status: myOrder?.status }
    }
    return { items: [] }
}