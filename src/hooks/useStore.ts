import { useState, useEffect } from 'react'
import { useStore as useStoreBase } from '@/store'
import type { RootState } from '@/store/types'

export function useStore<T>(selector: (state: RootState) => T): T {
  const [isHydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  const store = useStoreBase(selector)

  return isHydrated ? store : selector(useStoreBase.getState())
}
