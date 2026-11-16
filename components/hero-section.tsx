import Link from "next/link"

import {
  BriefcaseIcon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  TrophyIcon,
  UserSearchIcon,
} from "lucide-react"

const stats = [
  { icon: SearchIcon, value: "50K", label: "Active Jobs" },
  { icon: TrophyIcon, value: "12K", label: "Companies" },
  { icon: UserSearchIcon, value: "2M", label: "Job Seekers" },
  { icon: StarIcon, value: "97%", label: "Satisfaction Rate" },
]

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

export function HeroSection() {
  return (
    <section className="pb-18">
      {/* Hero content */}
      <div className="mx-auto flex max-w-[784px] flex-col items-center px-6 pt-44">
        {/* Badge */}
        <div className="flex w-full items-center justify-center gap-0">
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-linear-to-r from-transparent to-[#a8a8a8]/70 sm:block"
          />
          <span className="flex h-12 items-center gap-3 rounded-full bg-linear-to-br from-[#474747] to-[#010108] px-4 shadow-[inset_0_0_6px_rgba(0,0,0,0.25)] sm:gap-4 sm:px-6">
            <BriefcaseIcon className="size-6 shrink-0 text-white" />
            <span className="text-center font-space-mono text-sm whitespace-nowrap text-white sm:text-xl">
              50,000+ new jobs this month
            </span>
          </span>
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-linear-to-r from-[#a8a8a8]/70 to-transparent sm:block"
          />
        </div>

        {/* Headline */}
        <h1 className="mt-8 text-center font-manrope text-4xl font-bold text-white sm:text-5xl lg:text-[56px] lg:leading-[64px]">
          Find Your Dream Job Today
        </h1>

        {/* Subheadline */}
        <p className="mt-4 text-center font-manrope text-lg text-white sm:text-xl sm:leading-[32px]">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <form
          action="/jobs"
          method="get"
          className="mt-12 flex w-full flex-col gap-2 rounded-2xl border border-white/20 bg-[#101010] p-2 sm:flex-row sm:items-center"
        >
          <label className="flex min-w-0 flex-1 items-center gap-2 px-4 py-2">
            <SearchIcon className="size-6 shrink-0 text-white" />
            <input
              type="search"
              name="q"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/80"
            />
          </label>
          <div aria-hidden="true" className="hidden h-8 w-px bg-white/20 sm:block" />
          <label className="flex min-w-0 flex-1 items-center gap-2 px-4 py-2">
            <MapPinIcon className="size-6 shrink-0 text-white" />
            <input
              type="search"
              name="location"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/80"
            />
          </label>
          <button
            type="submit"
            aria-label="Search jobs"
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#5c53fe] text-white transition-colors hover:bg-[#5c53fe]/90 sm:mx-0"
          >
            <SearchIcon className="size-6" />
          </button>
        </form>

        {/* Trending positions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span className="font-manrope text-base text-white">
            Trending Position
          </span>
          {trendingPositions.map((position) => (
            <Link
              key={position}
              href="/jobs"
              className="rounded-full border border-white/10 bg-[#1a1a1b] px-3 py-1.5 font-manrope text-sm text-white transition-colors hover:bg-white/10"
            >
              {position}
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto mt-24 max-w-[1320px] px-4 sm:px-6 lg:mt-[358px]">
        <p className="mx-auto max-w-[600px] text-center font-instrument text-3xl font-medium text-white sm:text-4xl lg:text-[40px] lg:leading-[52px]">
          Assisting over 15,000 job seekers find their dream positions.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col rounded-2xl border border-white/10 bg-linear-to-b from-[#010102] to-[#313131] p-6"
            >
              <stat.icon className="size-6 text-white" />
              <p className="mt-[72px] font-jakarta text-5xl font-semibold tracking-[-2%] text-white lg:text-[56px] lg:leading-[64px]">
                {stat.value}
              </p>
              <p className="mt-4 font-inter-tight text-lg leading-[1.65] text-white">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
