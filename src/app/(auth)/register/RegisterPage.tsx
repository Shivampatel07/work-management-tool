'use client'

import React, { useEffect, useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import InputType from '@/components/common/InputType';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { useStore } from '@/hooks/useStore';
import { useRouter } from 'next/navigation';
import Loader from '@/components/common/Loader';

const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const router = useRouter();
  const { isAuthenticated, registerUser } = useStore((state) => ({
    registerUser: state.register,
    isAuthenticated: state.isAuthenticated
  }));

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsSubmitting(true);
      console.log(data)
      await registerUser(data.email, data.create_password);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#16404D' }}>
      <div className="w-full max-w-md p-8 rounded-lg" style={{ backgroundColor: 'rgba(184, 216, 225, 0.05)' }}>
        {/* Logo/Brand Area */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#B8D8E1' }}>
            Create Account
          </h1>
          <p className="mt-2 text-sm" style={{ color: '#8CB9C7' }}>
            Sign up for your account
          </p>
        </div>

        {/* Registration Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#8CB9C7' }}>
              Email Address
            </label>
            <InputType
              Icon={Mail}
              type='text'
              placeholder='Enter your email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Invalid email address'
                }
              })}
              errorMessage={errors.email?.message?.toString()} />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#8CB9C7' }}>
              Create Password
            </label>
            <InputType
              Icon={Lock}
              type="password"
              placeholder='Enter your password'
              {...register('create_password', {
                required: 'Password is required',
                minLength: {
                  value: 5,
                  message: 'Password must be at least 5 characters'
                }
              })}
              errorMessage={errors.create_password?.message?.toString()} />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#8CB9C7' }}>
              Confirm Password
            </label>
            <InputType
              Icon={Lock}
              type="password"
              placeholder='Confirm your password'
              {...register('confirm_password', {
                validate: (value) => value === watch('create_password') || 'Passwords do not match'
              })}
              errorMessage={errors.confirm_password?.message?.toString()} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all hover:opacity-90"
            style={{ backgroundColor: '#8CB9C7' }}
            disabled={isSubmitting}
          >
            {
              isSubmitting ? <Loader color='#16404d' width='24px' height='24px' /> : <>
                <span className="font-medium" style={{ color: '#16404D' }}>Register</span>
                <ArrowRight className="w-5 h-5" style={{ color: '#16404D' }} />
              </>
            }
          </button>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p style={{ color: '#8CB9C7' }}>
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium hover:underline transition-all"
                style={{ color: '#B8D8E1' }}
              >
                Log in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
