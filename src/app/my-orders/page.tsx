"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllOrdersAction } from './[orderId]/actions'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { centsToDollars } from '@/lib/utils'
import Link from 'next/link'
import CartSkeleton from '@/components/CartSkeleton'
function Page() {
    const { data, isFetching } = useQuery({
        queryKey: ["getAllOrders"],
        queryFn: async () => await getAllOrdersAction()
    })
    if (isFetching) {
        return (


            [...new Array(3)].map((_, i) => (
                <CartSkeleton key={i} />
            ))

        )
    }
    if (data?.orders.length === 0) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h2 className='text-primary font-semibold'>No Order Found</h2>
                    <p className='font-semibold'>Add items to your cart to Place Order</p>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen w-full">
            <div className="px-5 py-10 grid grid-cols-1 gap-2">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <h2 className='text-3xl text-primary font-semibold underline underline-offset-2'>Your Orders</h2>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    {
                        data?.orders.map((order) => (
                            <Link href={`/my-orders/${order.id}`} key={order.id}>
                                <Card className='relative flex flex-col md:flex-row items-center justify-center sm:h-[160px] md:h-[130px] px-3 py-1 ' >
                                    <CardContent className='flex flex-col gap-1 justify-center h-full'>
                                        <h2 className='text-xl font-semibold text-primary'><span className='text-black'>Order ID: </span>{order.id}</h2>
                                        <p className='text-lg font-bold'>$ {centsToDollars(order.totalPrice)}</p>
                                        <p className='font-semibold'>Status: <span className={`${order.status == "Delivered" ? "text-green-500" : "text-red-500"} `}>{order.status}</span></p>
                                    </CardContent>
                                    <CardFooter className='ml-auto'>
                                        <div className="flex items-center gap-2">
                                            <p className="font">Order Placed On: <span className='text-primary font-semibold'>{order.createdAt.toDateString()}</span></p>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Page
