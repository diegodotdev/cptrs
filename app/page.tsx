import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default function Home() {
  const { userId } = auth();

  return (
    <div className="hero h-[90vh]">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Unleash Your Creativity</h1>
          <p className="py-6">
            Where Images Speak Louder Than Words. Share your moments, inspire
            the world. Join a community of visual storytellers and explore
            breathtaking photography. Discover, connect, and capture the essence
            of life.
          </p>
          {!userId ? (
            <SignInButton mode="modal">
              <button className="btn btn-primary btn-sm">Get Started</button>
            </SignInButton>
          ) : (
            <Link href="/dashboard">
              <button className="btn btn-primary btn-sm">Dashboard</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
