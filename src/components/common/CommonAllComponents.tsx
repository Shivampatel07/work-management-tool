'use client'

import React from 'react'
import { useStore } from '@/hooks/useStore'
import ServerSideBar from '../ServerSideBar'
import { usePathname } from 'next/navigation'

export default function CommonAllComponents({ children }: Readonly<{ children: React.ReactNode }>) {

    const path = usePathname()
    const sideBarBlockedRoutes = ['']

    const { isAuthenticated } = useStore((state) => ({
        isAuthenticated: state.isAuthenticated,
    }))

    if (!isAuthenticated) {
        return children
    }

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row h-svh w-full'>
                {!sideBarBlockedRoutes.includes(path) && <ServerSideBar />}
                <div className='w-full'>
                    {children}
                </div>
            </div>
        </div>
    )
}
