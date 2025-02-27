import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { centsToDollars } from '@/lib/utils'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateQuantityActions } from './actions'
import { toast } from 'sonner'
import { error } from 'console'

type CartArgs = {
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    imageUrl: string,
    category: string,
}

function CartCard({ item, qty }: { item: CartArgs, qty: number }) {
    const queryClient = useQueryClient();
    const [action, setAction] = useState<"inc" | "dec">("inc");
    const { mutate } = useMutation({
        mutationKey: ['incQuant'],
        mutationFn: async () => await updateQuantityActions({ prodId: item.id, action }),
        onSuccess: ({ message }) => {
            queryClient.invalidateQueries({ queryKey: ["getMyCart"] })
            toast(message);
        },
        onError: (error) => {
            toast(error.message);
        }
    })
    return (
        <Card className='relative flex items-center h-[170px] px-3 py-2 '>
            <CardHeader className='relative h-full w-1/6 flex'>
                <Image src={item.imageUrl} fill alt='Prod-Img' className='object-contain' />
            </CardHeader>
            <CardContent className='flex flex-col gap-1 justify-center h-full'>
                <h2 className='text-xl font-semibold text-primary'>{item.name}</h2>
                <h3 className='text-sm text-gray-500'>{item.description}</h3>
                <p className='text-lg font-bold'>$ {centsToDollars(item.price)}</p>
            </CardContent>
            <CardFooter className='ml-auto'>
                <div className="flex items-center gap-2">
                    <Button variant={"outline"} className='border-2' onClick={(e) => {
                        setAction("inc");
                        mutate();
                    }}>+</Button>
                    <p className="">{qty}</p>
                    <Button variant={"outline"} className='border-2' onClick={(e) => {
                        setAction("dec");
                        mutate();
                    }}>-</Button>
                </div>
            </CardFooter>
        </Card>

    )
}

export default CartCard
