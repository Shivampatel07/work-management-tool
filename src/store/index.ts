import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { RootState } from './types'
import { createAuthSlice } from './slices/auth.slice'

export const rootStore = create<RootState>()(
  persist(
    (...a) => ({
        ...createAuthSlice(...a),
    }),
    {
      name: 'app-store',
    }
  )
)