"use server"

import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type ProdArgs = {
    name: string,
    stock: string,
    price: string,
    description: string,
    imageUrl: string,
    category: string
}

export async function addProductAction({ name, stock, price, description, imageUrl, category }: ProdArgs) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const isAdmin = user.email == process.env.ADMIN_EMAIL;

    if (!user || !isAdmin) throw new Error("Unauthorized Command")
    if (!name || !stock || !price || !description || !imageUrl || !category) throw new Error("Invalid or Empty Field");

    const priceInCents = Math.round(parseFloat(price) * 100);

    await prisma.product.create({
        data: {
            name,
            price: priceInCents,
            stock: parseInt(stock),
            category,
            description,
            imageUrl
        }
    })

    return { success: true }
}