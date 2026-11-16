import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import Globe from "@/app/images/globe.png"
import Image from "next/image"

export default function Page() {
  return (
    <div className="relative isolate min-h-svh overflow-x-clip bg-[#010108] text-white">
      {/* Hero backdrop art — magenta glow, stars, purple ring & globe */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 z-[-10] w-[1440px] max-w-none -translate-x-1/2 select-none"
      >
        {/* White corner glows from the Figma design (top-left / top-right) */}
        <div className="absolute top-0 left-0 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-[90px]" />
        <div className="absolute top-0 right-0 size-[400px] translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-[90px]" />
        <Image src={Globe} priority className="w-[1440px]" alt="" />
      </div>
      <SiteHeader />
      <HeroSection />
      <main className="p-6">
        <div className="mx-auto max-w-[1320px]">
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
        </div>
      </main>
    </div>
  )
}
