"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="border-b sticky top-0 bg-background z-40">
      <div className="container mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-semibold">Staybnb</Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/" className={pathname === "/" ? "text-foreground" : ""}>Explore</Link>
            <Link href="/host/new" className={pathname?.startsWith("/host") ? "text-foreground" : ""}>Host your home</Link>
          </nav>
        </div>
        <div className="flex-1 max-w-xl">
          <input
            className="w-full border rounded-full px-4 py-2"
            placeholder="Search destinations"
          />
        </div>
        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <span className="hidden sm:inline text-sm">Hello, {session.user.name || session.user.email}</span>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="border px-3 py-1 rounded">Sign out</button>
            </>
          ) : (
            <button onClick={() => signIn()} className="border px-3 py-1 rounded">Sign in</button>
          )}
        </div>
      </div>
    </header>
  );
}