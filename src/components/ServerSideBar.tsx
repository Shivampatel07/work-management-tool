'use client'

import { useStore } from '@/hooks/useStore'
import { Plus, SquareUser } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function ServerSideBar() {
  const [dataLoading, setDataLoading] = useState(false)
  const { workspaces, fetchWorkspaces } = useStore((state) => ({
    workspaces: state.workspaces,
    fetchWorkspaces: state.fetchWorkspaces
  }));

  const getFirstLetters = (input: string) => {
    // Remove leading/trailing whitespace and split into words
    const words = input.trim().split(/\s+/);

    // Get the first letter of each word
    const firstLetters = words.map(word => word.charAt(0).toUpperCase());

    // Join the letters back together
    return firstLetters.join('');
  }

  const getRandomLightColor = () => {
    // Generate random RGB values between 128 and 255
    const r = Math.floor(Math.random() * 128 + 128).toString(16).padStart(2, '0');
    const g = Math.floor(Math.random() * 128 + 128).toString(16).padStart(2, '0');
    const b = Math.floor(Math.random() * 128 + 128).toString(16).padStart(2, '0');

    // Combine RGB values into a color string
    return `#${r}${g}${b}`;
  }

  const getWorkspaceList = React.useCallback(async () => {
    setDataLoading(true)
    try {
      await fetchWorkspaces()
    } catch (error) {
      console.log(error)
    } finally {
      setDataLoading(false)
    }
  }, [fetchWorkspaces])

  useEffect(() => {
    getWorkspaceList()
  }, [getWorkspaceList])

  return (
    <div className='px-2 py-4 w-20 bg-secondary dark:bg-secondary'>
      <div className='h-full flex flex-col items-center justify-between'>
        <div className='flex flex-col items-center h-full overflow-y-auto custom-scrollbar'>
          <Link href={'/profile'} className='border-b border-text3 dark:border-text3 pb-5'>
            <SquareUser className='w-8 h-8 rounded-md object-contain bg-white' />
          </Link>
          <div className='flex flex-col items-center gap-3 mt-5'>
            {!dataLoading && workspaces.map((server) => {
              return (
                <div key={server._id} className='flex flex-col items-center w-full cursor-pointer' title={server.name}>
                  {server.image?.trim() !== '' ? <Image src={server.image!} alt={server._id} className='w-10 h-10 rounded-md object-contain bg-white' width={32} height={32} /> :
                    <div className='w-10 h-10 rounded-md flex justify-center items-center' style={{ backgroundColor: getRandomLightColor() }}>{getFirstLetters(server.name)}</div>}
                  <p className='w-full text-text1 dark:text-text1 text-xs font-semibold line-clamp-1 text-start'>{server.name}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className='bg-muted-foreground p-1 rounded-md opacity-75 hover:opacity-100 transition-all duration-200 ease-in-out cursor-pointer mt-3 shadow-md'>
          <Plus className='w-8 h-8 rounded-md object-contain cursor-pointer text-white' />
        </div>
      </div>
    </div>
  )
}
