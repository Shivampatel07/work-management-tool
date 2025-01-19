import { StateCreator } from 'zustand'
import { AuthState, authUser, RootState } from '../types'
import { getRequestWithToken } from '@/components/utils/axios.request'

export const createAuthSlice: StateCreator<
    RootState,
    [],
    [],
    AuthState
> = (set) => ({
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
                    user: userData.data,
                    token
                }))
                return true
            }
            return false
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const status = error.response.status
            if (status === 401) {
                localStorage.removeItem('token')
            }
            return false
        }

    }
})