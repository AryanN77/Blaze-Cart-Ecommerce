"use client"
import React, { ReactEventHandler, useCallback, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PRODUCTS } from '@/dummy/data';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductsAction } from './actions';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

function Page() {
    const { user } = useKindeBrowserClient();
    const isAdmin = true;
    const [category, setCategory] = useState<string | undefined>();
    const queryClient = useQueryClient();

    const { data, isFetching } = useQuery({
        queryKey: ["getProds"],
        queryFn: async () => await getProductsAction({ category }),
    })


    const handleChange = () => {
        console.log(category)
        queryClient.invalidateQueries({ queryKey: ["getProds"] })
    }
    useEffect(() => {
        handleChange();
    }, [setCategory])

    return (
        <div className='min-h-screen'>
            <div className="py-5 px-10 flex flex-col items-center">
                <h2 className='text-5xl text-center text-primary font-bold underline underline-offset-8 py-5'>Shop For Exciting Offers</h2>
                <p className='text-gray-700 font-semibold text-lg'> Get exciting offer on Your Purchases at Blaze Cart</p>
                <div className="py-5 w-full flex justify-start ">
                    <div className=" flex flex-col gap-2">
                        <label htmlFor="category">Select a Category:</label>
                        <select id='category' onChange={useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
                            setCategory(e.target.value)
                            queryClient.invalidateQueries({ queryKey: ["getProds"] });
                        }, [queryClient, setCategory])} value={category} className='bg-gray-300 px-2 rounded-md py-2' >
                            <option value="">None</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Literature">Art & Literature</option>
                            <option value="Stationary">Stationary</option>
                            <option value="Clothing">Clothing & Footware</option>
                            <option value="Appliances">Home Appliances</option>
                        </select>
                    </div>
                </div>
                <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {
                        isFetching ?
                            <>
                                {
                                    [...new Array(6)].map((_, i) => (
                                        <ProductSkeleton key={i} />
                                    ))
                                }
                            </> :
                            <>
                                {data?.products.map((item) => (
                                    <ProductCard item={item} key={item.id} />
                                ))}
                            </>

                    }
                </div>
            </div>
        </div >
    )
}

export default Page
