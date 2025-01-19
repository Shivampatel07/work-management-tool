'use client'

import React, { useEffect } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import InputType from '@/components/common/InputType';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { useStore } from '@/hooks/useStore';
import { useRouter } from 'next/navigation';

const LoginPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const router = useRouter()

  const { login, isAuthenticated } = useStore((state) => ({
    login: state.login,
    isAuthenticated: state.isAuthenticated
  }))

  const onsubmit = async (data: FieldValues) => {
    try {
      const email = data.email
      const password = data.password
      await login(email, password)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#16404D' }}>
      <div className="w-full max-w-md p-8 rounded-lg" style={{ backgroundColor: 'rgba(184, 216, 225, 0.05)' }}>
        {/* Logo/Brand Area */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#B8D8E1' }}>
            Welcome Back
          </h1>
          <p className="mt-2 text-sm" style={{ color: '#8CB9C7' }}>
            Sign in to continue to your account
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
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
              Password
            </label>
            <InputType
              Icon={Lock}
              type="password"
              placeholder='Enter your password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 5,
                  message: 'Password must be at least 5 characters'
                }
              })}
              errorMessage={errors.password?.message?.toString()} />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm hover:underline transition-all"
              style={{ color: '#8CB9C7' }}
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all hover:opacity-90"
            style={{ backgroundColor: '#8CB9C7' }}
          >
            <span className="font-medium" style={{ color: '#16404D' }}>Sign In</span>
            <ArrowRight className="w-5 h-5" style={{ color: '#16404D' }} />
          </button>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p style={{ color: '#8CB9C7' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="font-medium hover:underline transition-all"
                style={{ color: '#B8D8E1' }}
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;