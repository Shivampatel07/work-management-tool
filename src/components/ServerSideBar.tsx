'use client'

import Image from 'next/image'
import React from 'react'

export default function ServerSideBar() {
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

  const data = [
    {
      profileImageUrl: 'https://res.cloudinary.com/dj43xxam7/image/upload/v1737873289/eliscops_zend86.png',
      name: 'Eliscops',
      joinId: crypto.randomUUID(),
      role: 'Admin',
    },
    {
      profileImageUrl: '',
      name: 'Shivam Patel',
      joinId: crypto.randomUUID(),
      role: 'Admin',
    },
  ]
  return (
    <div className='px-2 py-4 w-16 bg-[#1E4854]'>
      <div className='overflow-y-auto custom-scrollbar h-full  flex flex-col items-center gap-3'>
        {data.map((server) => {
          return (
            <div key={server.joinId} className='flex flex-col items-center' title={server.name}>
              {server.profileImageUrl.trim() !== '' ? <Image src={server.profileImageUrl} alt={server.joinId} className='w-10 h-10 rounded-md object-contain bg-white' width={32} height={32} /> :
                <div className='w-10 h-10 rounded-md flex justify-center items-center' style={{ backgroundColor: getRandomLightColor() }}>{getFirstLetters(server.name)}</div>}
              <p className='text-white text-xs font-semibold line-clamp-1'>{server.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
