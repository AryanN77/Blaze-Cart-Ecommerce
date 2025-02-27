import React from 'react'
import { Skeleton } from './ui/skeleton'

function CartSkeleton() {
    return (
        <div className="flex justify-between items-center space-y-3 bg-white h-[170px] px-3 py-2">
            <Skeleton className="h-[105px] w-[150px] rounded-xl bg-slate-600" />
            <div className="space-y-2 w-full px-4">
                <Skeleton className="h-4 w-full bg-slate-600" />
                <Skeleton className="h-4 w-full bg-slate-600" />
            </div>
        </div>
    )
}

export default CartSkeleton
