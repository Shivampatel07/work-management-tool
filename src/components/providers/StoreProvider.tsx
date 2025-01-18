'use client'

import { useStore } from '@/store'
import { useEffect } from 'react'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useStore.persist.rehydrate()
  }, [])

  return children
}