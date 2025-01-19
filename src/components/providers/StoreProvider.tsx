'use client'

import { rootStore } from '@/store'
import { useEffect } from 'react'

export function StoreProvider() {
  useEffect(() => {
    rootStore.persist.rehydrate()
  }, [])

  return null;
}