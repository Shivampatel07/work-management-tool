'use client'

import React, { useEffect, useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import InputType from '@/components/common/InputType';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { useStore } from '@/hooks/useStore';
import { useRouter } from 'next/navigation';
import Loader from '@/components/common/Loader';

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setIsSubmitting(true)
      const email = data.email
      const password = data.password
      await login(email, password)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary dark:bg-secondary">
      <div className="w-full max-w-md p-8 rounded-lg bg-ternary dark:bg-ternary shadow-lg text-text1 dark:text-text1">
        {/* Logo/Brand Area */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm">
            Sign in to continue to your account
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-2 text-input-label dark:text-input-label">
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
            <label className="block text-sm font-medium mb-2 text-input-label dark:text-input-label">
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
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all hover:opacity-90 bg-primary dark:bg-primary text-secondary dark:text-secondary"
            disabled={isSubmitting}
          >
            {
              isSubmitting ? <Loader color='#16404d' width='24px' height='24px' /> : <>
                <span className="font-medium">Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </>
            }
          </button>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p>
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="font-medium hover:underline transition-all"
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