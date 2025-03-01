"use client"
import { CART_ITEMS } from '@/dummy/data'
import React, { useEffect, useState } from 'react'
import CartCard from './CartCard'
import { Button, buttonVariants } from '@/components/ui/button'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createCheckoutSessionActions, getMyCart } from './actions'
import { centsToDollars, cn } from '@/lib/utils'
import CartSkeleton from '@/components/CartSkeleton'
import { Loader2Icon, SmileIcon } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

function Page() {
    const router = useRouter();
    const { user } = useKindeBrowserClient();
    const { data, isFetching } = useQuery({
        queryKey: ["getMyCart"],
        queryFn: async () => await getMyCart()
    })
    const { mutate, isPending } = useMutation({
        mutationKey: ["placeOrder"],
        mutationFn: async () => await createCheckoutSessionActions({ cartId: data?.myCart?.id!, totalPrice: data?.total! }),
        onSuccess: ({ url }) => {
            console.log(url);
            if (url) router.push(url);
            else throw new Error("Unable to Retrieve Payment Link ")
        },
        onError: (e) => {
            toast(e.message);
        }
    })
    const handleCheckout = () => {
        mutate()
    }
    if (isFetching) {
        return (

            <div className="min-h-screen py-12 px-5">
                <div className="flex flex-col justify-center items-start">
                    <h2 className='text-3xl font-bold underline underline-offset-2 text-primary'>Your Cart</h2>
                </div>
                <div className="grid grid-cols-1 gap-5 my-3">
                    {[...new Array(3)].map((_, i) => (

                        <CartSkeleton key={i} />
                    ))}
                </div>
            </div>
        )
    }
    if (data?.myCart?.items.length == 0) {
        return (
            <div className="min-h-screen py-12 px-5">
                <div className="flex flex-col justify-center items-start">
                    <h2 className='text-3xl font-bold underline underline-offset-2 text-primary'>Your Cart</h2>
                </div>
                <div className="w-full h-full flex justify-center items-center">
                    <div className=" flex flex-col items-center gap-3">
                        <h2 className='text-xl font-semibold '>Looks Like your Cart Is Empty!</h2>
                        <p className='flex items-center gap-2'>Visit <Link href={"/shop"} className='font-bold text-lg text-primary'> Store</Link> to begin Adding new Products<SmileIcon className='size-12 text-primary' /> </p>
                        <Link className={cn(buttonVariants())} href="/my-orders">My Orders</Link>
                    </div>

                </div>
            </div>
        )
    }
    return (
        <div className='min-h-screen py-12 px-5'>
            <div className="flex flex-col justify-center items-start">
                <h2 className='text-3xl font-bold underline underline-offset-2 text-primary'>Your Cart</h2>
                <p className='text-sm text-gray-900'>Click on Buy Now Button to Checkout</p>
                <Link className={cn(buttonVariants())} href="/my-orders">My Orders</Link>
            </div>
            <div className="grid grid-cols-1 gap-5 my-3">
                {data?.myCart?.items.map((item, i) => (

                    <CartCard item={item.product} qty={item.quantity} key={item.id} />
                ))}
            </div>
            <div className="mt-auto flex flex-col items-start gap-3 px-2">
                <h2 className='text-2xl text-primary'> Grand Total: <span className='text-black'>$ {centsToDollars(data?.total!)}</span> </h2>
                <Button onClick={handleCheckout} disabled={isPending}>
                    {isPending ?
                        <>
                            <span className='flex items-center gap-2'><Loader2Icon className='text-white animate-spin' /><p>Please Wait...</p></span>
                        </> :
                        <>
                            <span>Checkout</span>
                        </>
                    }
                </Button>
            </div>
        </div>
    )
}

export default Page
