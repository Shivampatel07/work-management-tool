'use client'

import React from 'react'
import { CircleUserIcon } from 'lucide-react'

export default function Navbar() {


    return (
        <div className='flex justify-between items-center px-4 py-3 bg-[#16404D] text-white h-[52px]'>
            <h1 className='text-lg font-bold'>Discusync</h1>
            <div>
                <CircleUserIcon size={24} />
            </div>
        </div>
    )
}
