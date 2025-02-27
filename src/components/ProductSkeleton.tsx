import React from 'react'
import { Skeleton } from './ui/skeleton'

function ProductSkeleton() {
    return (

        <div className="flex flex-col justify-center items-center space-y-3 bg-white min-h-[270px]">
            <Skeleton className="h-[125px] w-[350px] rounded-xl bg-slate-600" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[350px] bg-slate-600" />
                <Skeleton className="h-4 w-[300px] bg-slate-600" />
            </div>
        </div>

    )
}

export default ProductSkeleton
