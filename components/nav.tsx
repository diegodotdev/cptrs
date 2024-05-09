import { cn } from "@/lib/utils";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import ThemeController from "./theme-controller";
import { Pacifico } from "next/font/google";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Menu } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });

export default function Nav() {
  const { userId } = auth();

  return (
    <header className="w-full h-[10vh] flex justify-between items-center">
      <Link href="/">
        <span className={cn(pacifico.className, "text-4xl")}>cptrs</span>
      </Link>
      <nav className="hidden md:flex items-center gap-5">
        {userId ? (
          <>
            <SignOutButton redirectUrl="https://cptrs.vercel.app">
              <button className="btn btn-primary btn-sm">Sign Out</button>
            </SignOutButton>
            <Link href="/feed">
              <button className="btn btn-primary btn-sm">Feed</button>
            </Link>
            <Link href="/dashboard">
              <button className="btn btn-primary btn-sm">Dashboard</button>
            </Link>
          </>
        ) : (
          <SignInButton
            mode="modal"
            forceRedirectUrl="https://cptrs.vercel.app/dashboard"
          >
            <button className="btn btn-primary btn-sm">Sign In</button>
          </SignInButton>
        )}
        <ThemeController />
      </nav>
      <div className="md:hidden dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-sm  m-1">
          <Menu size="15px" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <SignedIn>
            <li>
              <Link href="/feed">Feed</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <SignOutButton redirectUrl="https://cptrs.vercel.app">
                Sign Out
              </SignOutButton>
            </li>
          </SignedIn>
          <SignedOut>
            <li>
              <SignInButton mode="modal">Sign In</SignInButton>
            </li>
          </SignedOut>
        </ul>
      </div>
    </header>
  );
}
