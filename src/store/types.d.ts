export interface AuthState {
    isAuthenticated: boolean
    user: null | authUser
    token: string | null
    fetchProfile: () => Promise<boolean>
}

export interface UserState {
    preferences: Record<string, unknown>
    updatePreferences: (preferences: Record<string, unknown>) => void
}

export type RootState = AuthState

export interface authUser {
    _id: string
    email: string
    name: string
    role: string
    createdAt: Date
    updatedAt: Date
}

export interface ISuccessResponse<T> {
    success: number
    data: T
    message: string
}
