"use client"

import Link from "next/link"
import Image from "next/image"

import { MenuIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "@/lib/auth-client"



const signInClasses = cn(
  buttonVariants(),
  "h-[58px] rounded-[12px] border-[#090a15]/10 bg- font-manrope text-lg leading-[1.45] font-semibold text-[#5c53fe] hover:bg-[#5c53fe] hover:text-white"
)

const getStartedClasses = cn(
  buttonVariants(),
  "h-[52px] rounded-[12px] bg-[#5c53fe] font-instrument text-lg leading-[1.45] font-medium text-white hover:bg-[#5c53fe]/90"
)

function Logo() {
  return (
    <Link href="/" className="shrink-0" aria-label="HireLoop home">
      <Image
        src="/logo.png"
        alt="HireLoop"
        width={154}
        height={44}
        className="h-11 w-auto"
        priority
      />
    </Link>
  )
}

export function SiteHeader() {
  const { data: session } = useSession()
  // console.log("user session in navbar", session);
  const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/companies" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: `/dashboard/${session?.user?.role || 'seeker'}` },
  ]

  const handleSignOut = async () => {
    await signOut();
  }
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="mx-auto flex h-[74px] w-full max-w-[1320px] items-center justify-between rounded-2xl bg-[#222222] pr-2 pl-6">
        <Logo />

        {/* Desktop */}
        <div className="hidden h-full items-center py-2 pl-8 lg:flex">
          <nav aria-label="Main">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base leading-[1.8] font-normal tracking-[-0.2px] whitespace-nowrap text-white transition-opacity hover:opacity-80"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <span aria-hidden="true" className="mx-6 w-px h-6  bg-[#a8a8a8]/40" />
          {
            session?.user ?
              <>
                <h3>
                  Welcome,<span className=" font-extrabold mx-1"> {session.user.name}
                  </span>
                </h3>
                <Link onClick={handleSignOut} href="/" className={signInClasses} >
                  Sign Out
                </Link>
              </> :
              <>
                <div className="flex items-center gap-4">
                  <Link href="/sign-in" className={signInClasses}>
                    Sign In
                  </Link>
                  <Link href="/sign-up" className={getStartedClasses}>
                    Get Started
                  </Link>
                </div>
              </>
          }
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <button
                  type="button"
                  aria-label="Open menu"
                  className="rounded-lg p-2 text-white outline-none hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              }
            >
              <MenuIcon className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 gap-0 rounded-2xl border-white/10 bg-[#222222] text-white"
            >
              <SheetHeader className="border-b border-white/10">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <Logo />
              </SheetHeader>
              <nav aria-label="Main" className="p-4">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose
                        render={<Link href={link.href} />}
                        nativeButton={false}
                        className="block rounded-lg px-3 py-2.5 text-base text-white transition-colors hover:bg-white/10"
                      >
                        {link.label}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div aria-hidden="true" className="mx-4 h-px bg-[#a8a8a8]/40" />


              {
                session?.user ?
                  <>
                    <h3 className="ml-6">
                      Welcome,<span className=" font-extrabold text-xl mx-1" > {session.user.name}
                      </span>
                    </h3>
                    <Link onClick={handleSignOut} href="/" className={signInClasses} >
                      Sign Out
                    </Link>
                  </>
                  : <>
                    <div className="flex flex-col gap-2 p-4">
                      <SheetClose
                        render={<Link href="/sign-in" />}
                        nativeButton={false}
                        className={cn(signInClasses, "h-12 w-full")}
                      >
                        Sign In
                      </SheetClose>
                      <SheetClose
                        render={<Link href="/sign-up" />}
                        nativeButton={false}
                        className={cn(getStartedClasses, "h-12 w-full")}
                      >
                        Get Started
                      </SheetClose>
                    </div>
                  </>
              }
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
