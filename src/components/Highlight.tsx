import React, { ReactNode } from 'react'

function Highlight({ children }: { children: ReactNode }) {
    return (
        <span className='relative whitespace-nowrap'>
            <span className='absolute bg-primary -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1 mx-2' aria-hidden='true' />
            <span className='relative text-white uppercase'>
                {children}
            </span>
        </span>
    )
}

export default Highlight
