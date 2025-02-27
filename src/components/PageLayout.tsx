import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Footer from './Footer';
import Image from 'next/image';

function PageLayout({ children }: { children: ReactNode }) {
    return (
        <div className='flex'>
            <Sidebar />
            <div className="w-full relative flex flex-col">
                <Image src={"/logo.svg"} alt='Logo' fill className='absolute inset-0 pointer-events-none select-none opacity-5 -z-100' />
                {children}
                <Footer />
            </div>
        </div>
    )
}

export default PageLayout;