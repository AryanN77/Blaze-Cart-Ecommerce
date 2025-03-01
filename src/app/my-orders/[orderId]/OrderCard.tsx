import { Product } from '@prisma/client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { centsToDollars } from '@/lib/utils'
import Image from 'next/image'


function OrderCard({ product, quantity }: { product: Product, quantity: number }) {
    return (
        <Card className='relative flex items-center h-[170px] px-3 py-2 '>
            <CardHeader className='relative h-full w-1/6 flex'>
                <Image src={product.imageUrl} fill alt='Prod-Img' className='object-contain' />
            </CardHeader>
            <CardContent className='flex flex-col gap-1 justify-center h-full'>
                <h2 className='text-xl font-semibold text-primary'>{product.name}</h2>
                <h3 className='text-sm text-gray-500'>{product.description}</h3>
                <p className='text-lg font-bold'>$ {centsToDollars(product.price)}</p>
            </CardContent>
            <CardFooter className='ml-auto'>
                <div className="flex items-center gap-2">
                    <p className="font">Quantity: <span className='text-primary font-semibold'>{quantity}</span></p>
                </div>
            </CardFooter>
        </Card>
    )
}

export default OrderCard
