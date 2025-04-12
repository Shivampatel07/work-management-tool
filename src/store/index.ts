import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { RootState } from './types'
import { createAuthSlice } from './slices/auth.slice'
import { createWorkSpaceSlice } from './slices/workspace.slice'

export const rootStore = create<RootState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createWorkSpaceSlice(...a),
    }),
    {
      name: 'app-store',
    }
  )
)