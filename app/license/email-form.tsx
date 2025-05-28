"use client";

import { useEffect, useState } from "react";
import {
  AtSymbolIcon,

} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../ui/button';


export default function EmailForm({license, email}: {license: string, email?: string}) {

  console.log("EmailForm rendered with license:", license, "and email:", email);
  
  const [currentEmail, setCurrentEmail] = useState(email);

  useEffect(()=> {
    setCurrentEmail(email);
  }, [email])

  console.log("Current email state:", currentEmail);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEmail(event.target.value);
  };

 async function updateUser({ email, license }: { email?: string, license: string }) {
  if (!email || !license) {
    console.error("Email and license are required to update user.");
    return;
  }
  const res = await fetch("/api/user/update-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, license }),
  });
  return res.json();
}

  return (
    <div>
      <label
        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
        htmlFor="email"
      >
        Email
      </label>
      <div className="flex gap-2 items-center"> {/* Flex container */}
        <div className="relative flex-1">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-blue-900 text-blue-900"
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            required
            onChange={handleChange}
            value={currentEmail ?? ""}
          />
          <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      <Button
  onClick={() => updateUser({ email: currentEmail, license })}
  className="h-[42px] px-4 flex-shrink-0 border border-blue-900 bg-transparent text-blue-900! hover:bg-blue-50 hover:border-blue-900 hover:text-blue-900 transition-colors"
>
  Update <ArrowRightIcon className="ml-2 h-5 w-5 text-blue-900" />
</Button>
      </div>
    </div>
  );
}

