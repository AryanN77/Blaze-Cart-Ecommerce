import { cn } from '@/lib/utils'
import { url } from 'inspector'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { Book, Computer, Pencil, Shirt, WashingMachine } from 'lucide-react'
import { Testimonials } from './Testimonal'

const Categories = [
    {
        icon: Computer,
        label: "Electronics",
        href: "/"
    },
    {
        icon: Book,
        label: "Art & Literature",
        href: "/"
    },
    {
        icon: Pencil,
        label: "Stationary",
        href: "/"
    },
    {
        icon: Shirt,
        label: "Clothing & Footware",
        href: "/"
    },
    {
        icon: WashingMachine,
        label: "Home Appliances",
        href: "/"
    },

]

function HomeScreen() {
    return (
        <div className='relative min-h-screen'>
            <div className='h-screen p-4  px-5  w-full grid grid-cols-1 md:grid-cols-2 gap-3 relative'>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-950 to-violet-600 -z-10" />
                <div className="py-10 px-5 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <h3 className='text-3xl text-center text-balance underline underline-offset-2 text-purple-400'>Get your Favorite Items at your own Shopping stop</h3>
                        <h2 className='text-5xl font-bold  my-4 bg-gradient-to-r from-white to-slate-300 text-transparent  bg-clip-text'>Blaze Cart</h2>
                        <div className=" flex items-center gap-2">
                            <Link href="/shop" className={cn(buttonVariants())}>Shop Now</Link>
                            <Link href="/shop" className={cn(buttonVariants({ variant: "outline" }))}>My Cart</Link>
                        </div>
                    </div>
                </div>
                <div className="relative ">
                    <Image src={"/landing.jpg"} alt='Landing' fill className='' />
                </div>
            </div>
            <div className="max-h-screen px-10 py-5 overflow-x-clip">
                <div className="flex flex-col items-center gap-5">
                    <h2 className='text-5xl tracking-wider font-bold'>Shop by Category</h2>
                    <div className="flex flex-wrap gap-5 justify-center items-center my-3">
                        {Categories.map((item, i) => (
                            <Link href={item.href} key={i} className='border border-b p-10 flex flex-col items-center rounded-full relative gap-2 text-white hover:text-slate-300 hover:scale-105 transition-all'>
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-950 to-violet-600 -z-10 rounded-full" />
                                <item.icon className='w-8 h-8' />
                                <p className='font-bold'>{item.label}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto relative overflow-clip">
                <Testimonials />
            </div>
        </div>
    )
}

export default HomeScreen
