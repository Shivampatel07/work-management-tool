'use client'

import React from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import InputType from '@/components/common/InputType';
import Link from 'next/link';

const LoginPage = () => {
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
        <form className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#8CB9C7' }}>
              Email Address
            </label>
            <InputType
              Icon={Mail}
              type='email'
              placeholder='Enter your email' />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#8CB9C7' }}>
              Password
            </label>
            <InputType
              Icon={Lock}
              type="password"
              placeholder='Enter your password' />
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