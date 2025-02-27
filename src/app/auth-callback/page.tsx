"use client"
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { getAuthActions } from './actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function Page() {
    const router = useRouter();
    const { data, isLoading } = useQuery({
        queryKey: ["getAuth"],
        queryFn: async () => await getAuthActions()
    })
    useEffect(() => {
        if (data?.success) {
            toast("Logged In Successfully!")
            router.push("/")
        }
    }, [data, isLoading, router])

    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <div className="flex justify-center items-center gap-5">
                <Loader2 className='text-primary animate-spin size-10' />
                <p className='font-bold text-xl'>Redirecting, Please Wait...</p>
            </div>
        </div>
    )
}

export default Page
