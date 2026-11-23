import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#010108] px-4 py-10 text-white">
      {/* Ambient glow, same palette as the homepage hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-[50%] bg-[#dc02ce]/25 blur-[220px]" />
        <div className="absolute top-1/3 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#5c53fe]/15 blur-[180px]" />
      </div>

      <Link href="/" className="relative mb-8 shrink-0">
        <Image
          src="/logo.png"
          alt="HireLoop — back to home"
          width={154}
          height={44}
          priority
          className="h-11 w-auto"
        />
      </Link>

      <main className="relative w-full max-w-[420px]">{children}</main>

      <p className="relative mt-8 shrink-0 text-center text-sm text-white/40">
        <Link href="/" className="transition-colors hover:text-white">
          ← Back to home
        </Link>
      </p>
    </div>
  )
}
