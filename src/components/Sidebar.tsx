import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getKindeServerSession, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server'
import { Home, LucideShoppingBag, ServerIcon, Settings, ShoppingBag, ShoppingBasket, ShoppingCart, User, User2 } from 'lucide-react'
import Link from 'next/link';
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';

const LINKS = [
    {
        icon: Home,
        label: "Home",
        href: "/"
    },
    {
        icon: ShoppingCart,
        label: "Shop",
        href: "/shop"
    },
]

async function Sidebar() {
    const { getUser } = getKindeServerSession();

    const user = await getUser();
    const isAdmin = user?.email == process.env.ADMIN_EMAIL;
    return (
        <div className='hidden lg:flex lg:w-1/5 flex-col sticky top-0 left-0 h-screen border-r p-4 items-center gap-4'>
            <Image src={"/logo.svg"} alt='Logo' width={200} height={100} className='w-full h-10' />
            {user ? (
                <Avatar className='size-10'>
                    <AvatarImage src={`${user?.picture}`} />
                    <AvatarFallback>{user?.given_name?.charAt(0)} {user?.family_name?.charAt(0)}</AvatarFallback>
                </Avatar>
            ) : (
                <Link className={buttonVariants({ className: "text-lg tracking-wider w-full" })} href={"/api/auth/login"}>
                    Sign In
                </Link>
            )}
            <nav className='mt-6 flex flex-col justify-center items-center gap-5'>
                {LINKS.map((item, i) => (
                    <Link href={item.href} key={i} className='flex gap-3 hover:bg-gray-200 rounded-lg px-8 py-2 w-full transition-all hover:text-primary hover:text-primary '>
                        <item.icon className='w-8 h-8' />
                        <h2 className='text-lg'>{item.label}</h2>
                    </Link>
                ))}
                {user && <Link href={"/my-cart"} className='flex gap-3 hover:bg-gray-200 rounded-lg px-8 py-2 w-full transition-all   hover:text-primary '>
                    <ShoppingBasket className='w-8 h-8' />
                    <h2 className='text-lg'>My Cart</h2>
                </Link>}
            </nav>
            {user ?
                <div className="my-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <span className='flex gap-3 hover:bg-gray-200 rounded-lg w-full transition-all hover:text-primary px-8 py-2'>
                                <Settings className='w-8 h-8' />
                                <h2 className='text-lg '>Settings</h2>
                            </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='flex flex-col gap-2'>

                            <DropdownMenuItem className='flex  '>
                                <Link href={"/"} className=' hover:text-primary '>
                                    <span className='flex gap-2 items-center'>
                                        <User />
                                        <h2>Profile</h2>
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='flex '>
                                <Link href={"/"} className=' hover:text-primary '>
                                    <span className='flex gap-2 items-center'>
                                        <LucideShoppingBag />
                                        <h2>My Orders</h2>
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                            {isAdmin ? <DropdownMenuItem className='flex '>
                                <Link href={"/dashboard"} className=' hover:text-primary '>
                                    <span className='flex gap-2 items-center'>
                                        <ServerIcon />
                                        <h2>Configure</h2>
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                                : <></>}
                            <DropdownMenuItem className='flex justify-center '>
                                <LogoutLink >
                                    <h2 className='font-bold text-lg text-center tracking-wider'>Logout</h2>
                                </LogoutLink>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                : <></>}


        </div>
    )
}

export default Sidebar
