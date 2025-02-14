'use client'

import { Button } from '@/components/ui/button'
import { useStore } from '@/hooks/useStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ProfilePage() {
    const user = useStore((state) => state.user)
    const router = useRouter()

    const redirectToEditProfile = () => {
        router.push('/profile/edit')
    }

    return (
        <div className='w-full h-[calc(100vh-52px)] flex justify-center items-center bg-white text-white'>
            <div className='w-[450px] bg-[#12323A] border border-gray-600 rounded-lg shadow-lg p-6'>
                <div className='flex flex-col items-center gap-4'>
                    {user?.profilePicture?.trim() !== '' ? (
                        <Image 
                            src={user?.profilePicture as string} 
                            alt='avatar' 
                            width={90} 
                            height={90} 
                            className='rounded-full border-4 border-[#24697D] shadow-md'
                        />
                    ) : (
                        <div className='w-24 h-24 bg-[#24697D] rounded-full flex justify-center items-center text-2xl font-bold border-4 border-white shadow-md'>
                            {user?.name?.split(' ').map(a => a.charAt(0).toUpperCase()).join('') || "A"}
                        </div>
                    )}
                    <h2 className='text-2xl font-semibold'>{user?.name || "Not Available"}</h2>
                    <p className='text-gray-300 text-sm'>{user?.email || "Not Available"}</p>
                </div>
                <div className='mt-6 flex justify-center'>
                    <Button variant='default' size='lg' className='bg-[#24697D] text-white hover:bg-[#2E7E91] px-6 py-2 rounded-md shadow-md' onClick={redirectToEditProfile}>Edit Profile</Button>
                </div>
            </div>
        </div>
    )
}