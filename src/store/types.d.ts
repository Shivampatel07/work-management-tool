export interface AuthState {
    isAuthenticated: boolean
    user: null | authUser
    token: string | null
    fetchProfile: () => Promise<boolean>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    register: (email: string, password: string, name: string) => Promise<void>
}

export interface WorkSpace {
    _id: string
    name: string
    owner: string
    members: {
        role: string
        user: string
    }[]
    uuid: string
    image?: string
    createdAt: Date
    updatedAt: Date
}

export interface WorkspaceState {
    workspaces: Array<WorkSpace>
    fetchWorkspaces: () => Promise<void>
}


export interface UserState {
    preferences: Record<string, unknown>
    updatePreferences: (preferences: Record<string, unknown>) => void
}

export type RootState = AuthState & WorkspaceState

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
