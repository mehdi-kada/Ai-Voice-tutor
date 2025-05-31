import Link from "next/link";
import React from "react";
import Image from "next/image";
import NavBarItems from "./navbaritems";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function NavBar() {
  return (
    <nav className="navbar">
      <Link href={"/"}>
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="logo" height={44} width={46} />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavBarItems />
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="btn-signin">Sign In</button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
