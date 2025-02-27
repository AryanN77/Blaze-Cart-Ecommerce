"use server"


import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function getProductsAction({ category }: { category?: string }) {
    let products;
    if (category?.length) {
        products = await prisma.product.findMany({
            where: {
                category,
            },
            take: 5
        })
    }
    else {
        products = await prisma.product.findMany({
            take: 5
        })
    }

    return { products };
}


export async function addToCartActions({ prodId }: { prodId: string }) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) throw new Error("Sign In to Access the Feature");
    const checkProd = await prisma.product.findUnique({
        where: {
            id: prodId,
        }
    })

    if (!checkProd) throw new Error("Product not available in Inventory")

    let userCart = await prisma.cart.findUnique({
        where: { userId: user.id },
        include: { items: true }
    })
    if (!userCart) {
        userCart = await prisma.cart.create({
            data: {
                userId: user.id,
                items: {
                    create: [{ productId: prodId, quantity: 1 }]
                }
            },
            include: { items: true }
        })
    } else {
        const existItem = userCart.items.find((item) => item.productId === prodId);

        if (existItem) {
            await prisma.cartItem.update({
                where: { id: existItem.id },
                data: { quantity: existItem.quantity + 1 }
            })
        } else {
            await prisma.cartItem.create({
                data: { cartId: userCart.id, productId: prodId, quantity: 1 }
            })
        }
    }

    return { success: true }
}

