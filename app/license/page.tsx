'use client';

import { useSession } from "next-auth/react"
import { roboto } from "@/app/ui/fonts";
import EmailForm from "./email-form";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import {ArrowRightIcon} from '@heroicons/react/24/outline';
import ResponsibleApplicator from "./responsible-applicator";
import { useState } from "react";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  license?: string | null;
  employer?: string | null;
  role?: string | null;
};

type SessionData = {
  user?: SessionUser;
};

const LicensePage = () => {


  // todo check if this is a user or a business and show appropriate content
  // todo if individual, provide the option to select that you are the responsible applicator and show all of the employees for that employer or allow the user to remove the employer

  const { data: session } = useSession() as { data: SessionData | null };
  const [isBusiness, setIsBusiness] = useState(false);

  if (!session || !session.user || !session.user.license) {
   redirect('/login');
  }

  if (session.user.role === 'business') {
    setIsBusiness(true);
  }  else if (session.user.license[0] === '9') {
    setIsBusiness(true);
  }

  return (

    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">

      {/* user info */}
      <div className={`mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ${roboto.className}`}>
        <h1 className={`${roboto.className} mb-3 text-2xl text-blue-900`}>
          Please take a moment to verify your information.
        </h1>
        <span className={`text-xl text-left block my-2`}></span>
        <span>License: {session?.user?.license}</span>
        <span>Name: {session?.user?.name}</span>
        <EmailForm
          email={session?.user?.email ?? undefined}
          license={session?.user?.license}
        />
       {isBusiness ? <BusinessView/> :  <ResponsibleApplicator user={session.user}/>}
        
        
            
         
    <Button
  // onClick={() => updateUser({ email: currentEmail, license })}
  className="h-[42px] px-4 flex-shrink-0  hover:bg-blue-50 hover:border-blue-900 hover:text-blue-900 transition-colors"
>
  This information is correct <ArrowRightIcon className="ml-2 h-5 w-5" />
</Button>
      </div>

    </div>

  )
}

export default LicensePage