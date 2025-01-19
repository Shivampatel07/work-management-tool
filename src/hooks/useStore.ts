import { useState, useEffect } from 'react'
import type { RootState } from '@/store/types'
import { rootStore } from '@/store'

export function useStore<T>(selector: (state: RootState) => T): T {
  const [isHydrated, setHydrated] = useState(false)
  const [store, setStore] = useState(selector(rootStore.getState()))
  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    const unsubscribe = rootStore.subscribe(() => {
      setStore(selector(rootStore.getState()))
    })
    return unsubscribe
  }, [selector])

  return isHydrated ? store : selector(rootStore.getState())
}
