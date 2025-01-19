import { Metadata } from 'next'
import React from 'react'
import RegisterPage from './RegisterPage'

export const metadata: Metadata = {
    title: 'Register | Discusync',
    description: 'We are excited to have you on board',
}

export default function page() {
  return <RegisterPage />
}
