import LoginForm from '@/app/login/login-form';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Login',
}
 
export default async function LoginPage() {
  
  return (
   
      <div className="mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ">
        
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
   
  );
}