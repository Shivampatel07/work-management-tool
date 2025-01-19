'use client'

import { useStore } from '@/hooks/useStore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function AuthProvider({ children }: any) {
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const { isAuthenticated, fetchProfile } = useStore((state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
        fetchProfile: state.fetchProfile
    }))

    const checkAuth = async () => {
        try {
            await fetchProfile()
            if (isAuthenticated) {
                router.push('/')
            }
            else {
                router.push('/login')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        checkAuth()
    },[])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return children
}
