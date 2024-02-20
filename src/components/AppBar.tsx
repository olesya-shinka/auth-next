import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";

const AppBar = () => {
  return (
    <header>
      <Link href={"/"}>Home Page</Link>
      <Link href={"/dashboard"}>DashBoard</Link>

      <SignInButton />
    </header>
  );
};

export default AppBar;
