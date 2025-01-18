'use client'

import { useStore } from '@/hooks/useStore'
import React, { useEffect, useState } from 'react'

export default function AuthProvider({ children }: any) {
    const [isLoading, setIsLoading] = useState(true)

    const { isAuthenticated, token, user } = useStore((state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
    }))

    const checkAuth = async () => {
        try {
           
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
