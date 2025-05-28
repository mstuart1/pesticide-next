'use client';

import { signOut } from "next-auth/react";
import { Button } from "./button";

const LogoutButton = () => (
  <Button
    onClick={() => signOut()}
    className="h-[42px] px-4 flex-shrink-0 bg-white text-blue-900! hover:bg-blue-50 hover:border-blue-900 hover:text-blue-900 transition-colors"
  >
    Logout
  </Button>
);

export default LogoutButton;