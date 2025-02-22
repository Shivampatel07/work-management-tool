export interface AuthState {
    isAuthenticated: boolean
    user: null | authUser
    token: string | null
    fetchProfile: () => Promise<boolean>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    register: (email: string, password: string) => Promise<void>
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
    profilePicture: string
    status: string
    is_online: boolean
    createdAt: Date
    updatedAt: Date
}

export interface ISuccessResponse<T> {
    success: number
    data: T
    message: string
}
