'use client'

import React from 'react'
import Navbar from '../Navbar'
import { useStore } from '@/hooks/useStore'
import ServerSideBar from '../ServerSideBar'

export default function CommonAllComponents({ children }: Readonly<{ children: React.ReactNode }>) {

    const { isAuthenticated } = useStore((state) => ({
        isAuthenticated: state.isAuthenticated,
    }))

    if (!isAuthenticated) {
        return children
    }

    return (
        <div className='flex flex-col'>
            <Navbar />
            <div className='flex flex-row h-[calc(100vh-52px)] w-full'>
                <ServerSideBar />
                <div className='w-full'>
                    {children}
                </div>
            </div>
        </div>
    )
}
