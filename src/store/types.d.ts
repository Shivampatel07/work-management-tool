export interface AuthState {
    isAuthenticated: boolean
    user: null | { id: string; name: string }
    token: string | null
}

export interface UserState {
    preferences: Record<string, unknown>
    updatePreferences: (preferences: Record<string, unknown>) => void
}

export interface RootState extends AuthState { }
