'use client'

import InputType from '@/components/common/InputType'
import { Button } from '@/components/ui/button'
import { useStore } from '@/hooks/useStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ProfilePage() {
    const user = useStore((state) => state.user);
    const router = useRouter()
    const [previewImage, setPreviewImage] = useState(user?.profilePicture || '');

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            profilePicture: user?.profilePicture || ''
        }
    });

    const handleSave = (data: { name: string, email: string, profilePicture: string }) => {
        console.log('Updated Profile:', data);
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        router.push('/profile');
    }

    return (
        <div className='w-full min-h-[calc(100vh-52px)] flex justify-center items-center bg-white p-4'>
            <div className='w-full max-w-[450px] bg-[#12323A] border border-gray-600 rounded-lg shadow-lg p-4 md:p-6'>
                <form onSubmit={handleSubmit(handleSave)} className='flex flex-col items-center gap-4'>
                    <label className='cursor-pointer transition-transform hover:scale-105'>
                        {(user?.profilePicture?.trim() !== '' || previewImage !== '') ? (
                            <div className='relative w-20 h-20 md:w-24 md:h-24'>
                                <Image
                                    src={previewImage || user?.profilePicture as string}
                                    alt='avatar'
                                    fill
                                    className='rounded-full border-4 border-[#24697D] shadow-md object-cover'
                                />
                            </div>
                        ) : (
                            <div className='w-20 h-20 md:w-24 md:h-24 bg-[#24697D] rounded-full flex justify-center items-center text-xl md:text-2xl font-bold border-4 border-white shadow-md'>
                                {user?.name?.split(' ').map(a => a.charAt(0).toUpperCase()).join('') || "A"}
                            </div>
                        )}
                        <InputType
                            type='file'
                            accept="image/*"
                            {...register('profilePicture')}
                            placeholder='Profile Picture'
                            onChange={handleImageChange}
                            className='hidden'
                        />
                    </label>
                    
                    <div className='w-full space-y-4'>
                        <InputType
                            type='text'
                            {...register('name')}
                            placeholder='Display Name'
                            className='w-full'
                        />
                        <InputType
                            type='email'
                            {...register('email')}
                            placeholder='Email'
                            className='w-full'
                        />
                    </div>

                    <div className='mt-4 flex flex-col sm:flex-row justify-between w-full gap-4'>
                        <Button 
                            type='button' 
                            className='w-full sm:w-auto bg-red-500 text-white hover:bg-red-400 px-6 py-2 rounded-md shadow-md order-2 sm:order-1' 
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type='submit' 
                            className='w-full sm:w-auto bg-[#24697D] text-white hover:bg-[#2E7E91] px-6 py-2 rounded-md shadow-md order-1 sm:order-2'
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}