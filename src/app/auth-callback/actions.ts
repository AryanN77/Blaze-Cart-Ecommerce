"use server"

import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function getAuthActions() {
    const { getUser } = getKindeServerSession()
    const user = await getUser();

    const isRegistered = await prisma.user.findUnique({
        where: {
            id: user.id!
        }
    })

    if (isRegistered) return { success: true };

    const newUser = await prisma.user.create({
        data: {
            id: user.id,
            name: user?.given_name + " " + user?.family_name,
            email: user?.email!,
            image: user?.picture
        }
    })
    return { success: true }
}