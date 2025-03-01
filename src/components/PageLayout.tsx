import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Footer from './Footer';
import Image from 'next/image';

function PageLayout({ children }: { children: ReactNode }) {
    return (
        <div className='flex'>
            <Sidebar />
            <div className="w-full relative flex flex-col overflow-hidden">
                {children}
                <Footer />
            </div>
        </div>
    )
}

export default PageLayout;