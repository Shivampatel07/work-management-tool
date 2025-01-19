'use client'

import { useStore } from '@/hooks/useStore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MainPageLoader from '../MainPageLoader'

export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
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
                if (!authenticatedOrNot) {
                    router.push('/login')
                    return
                }
            } catch (error) {
                console.error(error)
            }
        }

        checkAuth().finally(() => { 
            setIsLoading(false)
        }) 
    }, [fetchProfile, isAuthenticated, router])

    if (isLoading) {
        return <MainPageLoader />
    }

    return children
}
