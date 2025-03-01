"use client"
import PageLayout from '@/components/PageLayout'
import React from 'react'
import { useParams } from "next/navigation";
import { useQuery } from '@tanstack/react-query';
import { getOrderDetailsAction } from './actions';
import OrderCard from './OrderCard';
import { Loader2Icon } from 'lucide-react';
import { CART_ITEMS } from '@/dummy/data';

function Page() {
    const params = useParams<{ orderId: string }>()
    const orderId = params.orderId
    const { data, isFetching } = useQuery({
        queryKey: ["getMyOrder"],
        queryFn: async () => await getOrderDetailsAction({ orderId })
    })
    if (isFetching) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <div className="flex gap-2 items-center">
                    <Loader2Icon className='animate-spin size-8 text-primary' />
                    <p className='text-lg'>Loading, Please Wait...</p>
                </div>
            </div>
        )
    }
    if (data?.items?.length == 0) {
        return (
            <div className="h-screen w-full justify-center items-center">
                <div className="flex gap-2 items-center">
                    <h2 className='text-ld font-semibold text-primary'>Sorry! No Order Found</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full">
            <div className="px-5 py-10 grid grid-cols-1 gap-2">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <h2 className='text-3xl text-primary font-semibold'>Order ID: <span className='text-black'>{orderId}</span></h2>
                    {
                        data?.status !== "Delivered" && <p className='text-md text-gray-700'>Order will be Delivered in 2-3 working days after Payment</p>
                    }
                </div>
                <div className="flex flex-col items-center md:items-start gap-1">
                    <h2 className='font-bold'>Total Price: $ {data?.totalPrice}</h2>
                    <p className='text-lg font-semibold'>Order Status: <span className={`${data?.status == "Delivered" ? "text-green-500" : "text-red-600"}`}>{data?.status!}</span></p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    {data?.items?.map((item) => (
                        <OrderCard product={item.product} quantity={item.quantity} key={item.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page
