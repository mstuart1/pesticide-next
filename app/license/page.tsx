'use client';

import { useSession } from "next-auth/react"
import { roboto } from "@/app/ui/fonts";
import EmailForm from "./email-form";
import { Button } from "../ui/button";
import {ArrowRightIcon} from '@heroicons/react/24/outline';
import ResponsibleApplicator from "./responsible-applicator";
import { useEffect, useState } from "react";
import BusinessView from "./business-view";
import { useRouter } from "next/navigation";
import { SessionUser, SessionData } from "@/app/lib/definitions";


const LicensePage = () => {


  // todo check if this is a user or a business and show appropriate content
  // todo if individual, provide the option to select that you are the responsible applicator and show all of the employees for that employer or allow the user to remove the employer

  const { data: session, status } = useSession() as { data: SessionData | null, status: string };
  const router = useRouter();
  const [isBusiness, setIsBusiness] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

   useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

    useEffect(() => {
    if (!user) return;
    if (user.role === 'business' || user.license?.[0] === '9') {
      setIsBusiness(true);
    } else {
      setIsBusiness(false);
    }
  }, [user]);


 // Don't render anything until session is loaded and user is set
  if (status === 'loading' || !user) {
    // Optionally, show a loading spinner or skeleton here
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.replace('/login');
    return null;
  }
  
  return (

    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">

      {/* user info */}
      <div className={`mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ${roboto.className}`}>
        <h1 className={`${roboto.className} mb-3 text-2xl text-blue-900`}>
          Please take a moment to verify your information.
        </h1>
        <span className={`text-xl text-left block my-2`}></span>
        <span>License: {user?.license}</span>
        <span>Name: {user?.name}</span>
        <EmailForm
          email={user?.email ?? undefined}
          license={user?.license ?? ""}
        />
       {isBusiness ? <BusinessView user={user}/> :  <ResponsibleApplicator user={user}/>}
        
        
            
         
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