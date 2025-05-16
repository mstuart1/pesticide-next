import DepLogo from '@/app/ui/dep-logo';
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '../ui/header';

export const metadata: Metadata = {
  title: 'Login',
}
 
export default function LoginPage() {
  return (
   <main className="flex min-h-screen flex-col p-6">
        
          <Header/>
      <div className="mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ">
        
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}