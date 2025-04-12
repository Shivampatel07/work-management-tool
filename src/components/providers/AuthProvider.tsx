'use client'

import { useStore } from '@/hooks/useStore'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MainPageLoader from '../MainPageLoader'

export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter()
    const path = usePathname()
    const [isLoading, setIsLoading] = useState(true)

    const { isAuthenticated, fetchProfile } = useStore((state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
        fetchProfile: state.fetchProfile
    }))

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authenticatedOrNot = await fetchProfile()
                const publicPath = ['/login', '/register']
                if (!authenticatedOrNot && !publicPath.includes(path)) {
                    router.push('/login')
                    return
                }
                else if (authenticatedOrNot && publicPath.includes(path)) {
                    router.push('/')
                    return
                }
                else {
                    setIsLoading(false)
                }
            } catch (error) {
                console.error(error)
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [fetchProfile, isAuthenticated, path, router])

    return isLoading ? <MainPageLoader /> : <>{children}</>
}
