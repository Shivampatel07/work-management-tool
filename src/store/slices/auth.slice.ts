/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator } from 'zustand'
import { AuthState, authUser, RootState } from '../types'
import { getRequestWithToken, postRequestWithoutToken } from '@/components/utils/axios.request'
import toast from 'react-hot-toast'

export const createAuthSlice: StateCreator<
    RootState,
    [],
    [],
    AuthState
> = (set, get) => ({
    isAuthenticated: false,
    user: null,
    token: null,
    fetchProfile: async () => {
        try {
            const token = localStorage.getItem('token') || null
            if (!token) {
                return false
            }
            const response = await getRequestWithToken<authUser>('auth/profile', token || '')
            if (response.status === 200) {
                const userData = response.data
                set(() => ({
                    isAuthenticated: true,
                    user: {
                        _id: userData.data._id,
                        email: userData.data.email,
                        name: userData.data.name || "",
                        role: userData.data.role,
                        profilePicture: userData.data.profilePicture || "",
                        status: userData.data.status,
                        is_online: userData.data.is_online,
                        createdAt: new Date(userData.data.createdAt),
                        updatedAt: new Date(userData.data.updatedAt)
                    },
                    token
                }))
                return true
            }
            return false
        } catch (error: any) {
            const status = error.response.status
            if (status === 401) {
                localStorage.removeItem('token')
            }
            return false
        }
    },
    login: async (email: string, password: string) => {
        try {
            const requestData = {
                email,
                password
            }

            const response = await postRequestWithoutToken<{ token: string }>('auth/login', requestData)
            const data = response.data.data
            const token = data.token
            localStorage.setItem('token', token)
            await get().fetchProfile();
        } catch (error: any) {
            const status = error.response.status
            if ([404, 400].includes(status)) {
                toast.error(error.response.data.message)
            }
        }
    },
    register: async (email: string, password: string) => {
        try {
            const requestData = {
                email,
                password
            }

            const response = await postRequestWithoutToken<{ token: string }>('auth/register', requestData)
            const data = response.data.data
            const token = data.token
            localStorage.setItem('token', token)
            await get().fetchProfile();
        } catch (error: any) {
            const status = error.response.status
            if ([404, 400].includes(status)) {
                toast.error(error.response.data.message)
            }
        }
    }
})