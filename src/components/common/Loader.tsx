import { LoaderCircle } from 'lucide-react'
import React from 'react'

export default function Loader({ color = '#8CB9C7', width = '30px', height = '30px' }: { color?: string, width?: string, height?: string }) {
  return (
    <div className="flex items-center justify-center h-full">
        <LoaderCircle className="animate-spin" width={width} height={height} style={{ color }} />
    </div>
  )
}
