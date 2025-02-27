"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from './ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { addToCartActions } from '@/app/shop/actions'
import { centsToDollars } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'

export type ProdType = {
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    imageUrl: string,
    category: string
}

function ProductCard({ item }: { item: ProdType }) {
    const { mutate, isPending } = useMutation({
        mutationKey: ["addToCart"],
        mutationFn: async () => await addToCartActions({ prodId: item.id }),
        onSuccess: () => {
            toast("Added To Cart")
        }
    })
    const inStore = item.stock > 0;
    const isAdmin = true;
    return (
        <Card className='min-w-[300px]  z-10 relative shadow-md hover:scale-105 transition-all hover:shadow-purple-500'>
            <CardHeader className='relative flex justify-center items-center'>
                <Image src={item.imageUrl} height={100} width={150} alt="Pro-Img" className='object-contain w-44 h-48' />
            </CardHeader>
            <CardContent className='flex flex-col items-start gap-1'>
                <h3 className='text-2xl font-bold'>{item.name}</h3>
                <h2 className='line-clamp-1 text-sm text-gray-600'>{item.description}</h2>
                <p className='text-2xl'>$ {centsToDollars(item.price)}</p>
            </CardContent>
            <CardFooter className='flex justify-between w-full pb-5'>
                <div className="">

                    <Button onClick={() => {
                        console.log(item.id);
                        mutate()
                    }} disabled={isPending}>
                        {isPending ? <span className='flex gap-2 items-center '><Loader2Icon className='animate-spin' /><p>Adding ...</p></span> : <span>Add To Cart</span>}
                    </Button>
                </div>
                {isAdmin ? inStore ? <span className='inline-block text-green-500'>In-Stock</span> : <span className='inline-block text-red-600'>Out of Stock</span> : <></>}
            </CardFooter>
        </Card>

    )
}

export default ProductCard
