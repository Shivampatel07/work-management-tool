import React from 'react';
import LoginPage from './LoginPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Discusync',
  description: 'Login to join the conversation',
}
 
const page = () => {

 return <LoginPage />
};

export default page;