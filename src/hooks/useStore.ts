import { useState, useEffect } from 'react'
import type { RootState } from '@/store/types'
import { rootStore } from '@/store'

export function useStore<T>(selector: (state: RootState) => T): T {
  const [isHydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  const store = rootStore(selector)

  return isHydrated ? store : selector(rootStore.getState())
}
