import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div className='border-t w-full relative mt-full'>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-slate-50 -z-10" />
            <div className="w-full flex justify-between px-8 py-5">
                <div className="">
                    <p>By Aryan Naithani</p>
                </div>
                <div className="flex gap-5">
                    <Link href={"/"} className='hover:text-primary hover:font-bold transition-colors'>GitHub</Link>
                    <Link href={"/"} className='hover:text-primary hover:font-bold transition-colors'>LinkedIn</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer
