import React from 'react';
import { useRouter } from 'next/router';
import SignupPage from './signup';
import LoginPage from './signin';

const Index = () => {
  const router = useRouter();

  return (
    <>
      {router.pathname === '/' && <LoginPage />}
      {router.pathname === '/signup' && <SignupPage />}
    </>
  );
};

export default Index;