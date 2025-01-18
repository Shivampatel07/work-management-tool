import { StateCreator } from 'zustand'
import { AuthState, RootState } from '../types'

export const createAuthSlice: StateCreator<
    RootState,
    [],
    [],
    AuthState
> = (set) => ({
    isAuthenticated: false,
    user: null,
    token: null,
})