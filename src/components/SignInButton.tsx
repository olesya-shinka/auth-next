"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user)
    return (
      <div>
        <p>{session.user.name}</p>
        <Link href={"/api/auth/signout"}>Sign Out</Link>
      </div>
    );

  return (
    <div>
      <Link href={"/login"}>Sign In</Link>
      <Link href={"/signup"}>Sign Up</Link>
    </div>
  );
};

export default SignInButton;
