"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  BriefcaseBusiness,
  ChevronRight,
  CirclePlus,
  EllipsisVertical,
  Globe,
  MapPin,
  Pencil,
  Trash2,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type JobStatus = "Active" | "Expired"
type JobType = "Full-time" | "Part-time"

type Job = {
  id: string
  title: string
  department: string
  company: string
  location: string
  locationType: "Remote" | "Hybrid" | "On-site"
  type: JobType
  compensation: string
  applicants: number
  status: JobStatus
  deadline: string
}

type Toast = {
  id: number
  message: string
  tone: "success" | "error"
}

const INITIAL_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    department: "Engineering",
    company: "HirePulse Network",
    location: "Remote (New York, USA)",
    locationType: "Remote",
    type: "Full-time",
    compensation: "€25 – €40 / hr",
    applicants: 34,
    status: "Active",
    deadline: "May 30, 2025",
  },
  {
    id: "job-2",
    title: "Senior Product Designer",
    department: "Design",
    company: "HirePulse Labs",
    location: "London, UK (Hybrid)",
    locationType: "Hybrid",
    type: "Full-time",
    compensation: "€90k – €115k / yr",
    applicants: 19,
    status: "Active",
    deadline: "Jun 14, 2025",
  },
  {
    id: "job-3",
    title: "DevOps Specialist",
    department: "Infrastructure",
    company: "HirePulse Platform",
    location: "Berlin, Germany",
    locationType: "On-site",
    type: "Full-time",
    compensation: "€95k – €120k / yr",
    applicants: 12,
    status: "Active",
    deadline: "Jun 30, 2025",
  },
  {
    id: "job-4",
    title: "Product Marketing Lead",
    department: "Marketing",
    company: "HirePulse Network",
    location: "Remote (EU/US)",
    locationType: "Remote",
    type: "Full-time",
    compensation: "€80k – €105k / yr",
    applicants: 27,
    status: "Active",
    deadline: "Jul 15, 2025",
  },
  {
    id: "job-5",
    title: "QA Automation Engineer",
    department: "Quality",
    company: "HirePulse Platform",
    location: "Dublin, Ireland (Hybrid)",
    locationType: "Hybrid",
    type: "Part-time",
    compensation: "€35 – €50 / hr",
    applicants: 8,
    status: "Expired",
    deadline: "May 01, 2025",
  },
]

function StatusBadge({ status }: { status: JobStatus }) {
  const active = status === "Active"
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        active
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-zinc-500/15 text-zinc-400"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          active ? "bg-emerald-400" : "bg-zinc-500"
        )}
      />
      {status}
    </span>
  )
}

function TypeBadge({ type }: { type: JobType }) {
  return (
    <span className="inline-flex rounded-full border border-[#2f2f33] bg-[#1c1c1f] px-2.5 py-1 text-xs font-medium text-[#d4d4d8]">
      {type}
    </span>
  )
}

function LoadingRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="border-b border-[#232327] last:border-b-0">
          {Array.from({ length: 8 }).map((__, cellIndex) => (
            <td key={cellIndex} className="px-4 py-4">
              <div className="h-4 w-full max-w-[140px] animate-pulse rounded bg-[#232327]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null)
  const [openMenuJobId, setOpenMenuJobId] = useState<string | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setJobs(INITIAL_JOBS)
      setIsLoading(false)
    }, 450)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpenMenuJobId(null)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    return () => document.removeEventListener("mousedown", handlePointerDown)
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenuJobId(null)
        setJobToDelete(null)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  function pushToast(message: string, tone: Toast["tone"]) {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    setToasts((current) => [...current, { id, message, tone }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 2800)
  }

  function handleDelete() {
    if (!jobToDelete) return

    try {
      setJobs((current) => current.filter((job) => job.id !== jobToDelete.id))
      pushToast(`"${jobToDelete.title}" was deleted.`, "success")
      setJobToDelete(null)
      setOpenMenuJobId(null)
    } catch {
      pushToast("Failed to delete job post.", "error")
    }
  }

  return (
    <div className="min-h-svh bg-[#131314] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6">
        <header className="flex flex-col gap-4 border-b border-[#232327] pb-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1 text-xs font-medium text-[#a0a0ab]"
            >
              <span>Manage Jobs</span>
              <ChevronRight className="size-3.5 text-[#5a5a60]" aria-hidden="true" />
              <span className="text-[#c3c0ff]">Job Listings &amp; Postings</span>
            </nav>

            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-[2rem]">
                Manage Job Posts
              </h1>
              <p className="max-w-3xl text-sm leading-6 text-[#a0a0ab] sm:text-[15px]">
                Review live listings, monitor applicants, and update job details
                across your organization.
              </p>
            </div>
          </div>

          <Button
            nativeButton={false}
            render={<Link href="/dashboard/recruiter/jobs/new" />}
            className="h-11 w-full gap-2 rounded-xl bg-[#5c53fe] px-5 text-sm font-semibold text-white hover:bg-[#6d66ff] sm:w-auto"
          >
            <CirclePlus className="size-4" aria-hidden="true" />
            New Job Post
          </Button>
        </header>

        <section className="overflow-hidden rounded-2xl border border-[#232327] bg-[#151516]">
          <div className="overflow-x-auto">
            <table className="min-w-[1120px] w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#232327] bg-[#18181b]">
                  {[
                    "Job Title & Dept",
                    "Company & Location",
                    "Type",
                    "Compensation",
                    "Applicants",
                    "Status",
                    "Deadline",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-4 text-[11px] font-semibold tracking-[0.08em] text-[#8e8e96] uppercase"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <LoadingRows />
                ) : jobs.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <div className="mx-auto flex max-w-md flex-col items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-xl border border-[#2a2a2d] bg-[#1c1c1f]">
                          <BriefcaseBusiness className="size-5 text-[#8e8e96]" />
                        </div>
                        <h2 className="text-lg font-medium text-white">
                          No job posts yet
                        </h2>
                        <p className="text-sm leading-6 text-[#a0a0ab]">
                          Create your first job post to start receiving
                          applicants and managing listings here.
                        </p>
                        <Button
                          nativeButton={false}
                          render={<Link href="/dashboard/recruiter/jobs/new" />}
                          className="mt-2 h-10 rounded-xl bg-[#5c53fe] px-4 text-sm font-semibold text-white hover:bg-[#6d66ff]"
                        >
                          Create Job Post
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => {
                    const LocationIcon =
                      job.locationType === "Remote" ? Globe : MapPin

                    return (
                      <tr
                        key={job.id}
                        className="border-b border-[#232327] transition-colors hover:bg-[#19191c] last:border-b-0"
                      >
                        <td className="px-4 py-4 align-top">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#2d2d31] bg-[#1d1d20] text-[#c3c0ff]">
                              <BriefcaseBusiness
                                className="size-4"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white">
                                {job.title}
                              </p>
                              <p className="mt-1 text-xs font-medium text-[#8d87ff]">
                                {job.department}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <p className="text-sm font-medium text-[#f4f4f5]">
                            {job.company}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-[#a0a0ab]">
                            <LocationIcon
                              className="size-3.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{job.location}</span>
                          </p>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <TypeBadge type={job.type} />
                        </td>

                        <td className="px-4 py-4 align-top text-sm text-[#e4e4e7]">
                          {job.compensation}
                        </td>

                        <td className="px-4 py-4 align-top">
                          <Link
                            href={`/dashboard/recruiter/applications?jobId=${job.id}`}
                            className="inline-flex items-center gap-1.5 text-sm text-[#d4d4d8] transition-colors hover:text-white"
                          >
                            <Users className="size-4 text-[#8e8e96]" aria-hidden="true" />
                            <span>{job.applicants} Candidates</span>
                          </Link>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <StatusBadge status={job.status} />
                        </td>

                        <td className="px-4 py-4 align-top">
                          <p className="text-sm text-[#e4e4e7]">{job.deadline}</p>
                          <p className="mt-1 text-xs text-[#71717a]">Deadline</p>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <div className="flex items-center gap-2">
                            <Button
                              nativeButton={false}
                              render={
                                <Link href={`/dashboard/recruiter/jobs/${job.id}/edit`} />
                              }
                              variant="outline"
                              className="h-9 gap-1.5 rounded-lg border-[#34343a] bg-transparent px-3 text-xs font-medium text-[#f4f4f5] hover:bg-[#232327] hover:text-white"
                            >
                              <Pencil className="size-3.5" aria-hidden="true" />
                              Update
                            </Button>

                            <button
                              type="button"
                              aria-label={`Delete ${job.title}`}
                              onClick={() => setJobToDelete(job)}
                              className="inline-flex size-9 items-center justify-center rounded-lg border border-[#34343a] text-[#a0a0ab] transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                            >
                              <Trash2 className="size-4" aria-hidden="true" />
                            </button>

                            <div
                              className="relative"
                              ref={openMenuJobId === job.id ? menuRef : null}
                            >
                              <button
                                type="button"
                                aria-label={`More options for ${job.title}`}
                                aria-haspopup="menu"
                                aria-expanded={openMenuJobId === job.id}
                                onClick={() =>
                                  setOpenMenuJobId((current) =>
                                    current === job.id ? null : job.id
                                  )
                                }
                                className="inline-flex size-9 items-center justify-center rounded-lg border border-[#34343a] text-[#a0a0ab] transition-colors hover:bg-[#232327] hover:text-white"
                              >
                                <EllipsisVertical
                                  className="size-4"
                                  aria-hidden="true"
                                />
                              </button>

                              {openMenuJobId === job.id && (
                                <div
                                  role="menu"
                                  className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-[#2f2f33] bg-[#1b1b1e] p-1 shadow-xl"
                                >
                                  <Link
                                    role="menuitem"
                                    href={`/dashboard/recruiter/jobs/${job.id}`}
                                    className="block rounded-lg px-3 py-2 text-sm text-[#e4e4e7] hover:bg-[#232327]"
                                    onClick={() => setOpenMenuJobId(null)}
                                  >
                                    View details
                                  </Link>
                                  <Link
                                    role="menuitem"
                                    href={`/dashboard/recruiter/applications?jobId=${job.id}`}
                                    className="block rounded-lg px-3 py-2 text-sm text-[#e4e4e7] hover:bg-[#232327]"
                                    onClick={() => setOpenMenuJobId(null)}
                                  >
                                    View applicants
                                  </Link>
                                  <button
                                    type="button"
                                    role="menuitem"
                                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10"
                                    onClick={() => {
                                      setOpenMenuJobId(null)
                                      setJobToDelete(job)
                                    }}
                                  >
                                    Delete job
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {jobToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-job-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setJobToDelete(null)
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-[#2f2f33] bg-[#18181b] p-6 shadow-2xl">
            <h2 id="delete-job-title" className="text-lg font-semibold text-white">
              Delete job post?
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#a0a0ab]">
              Are you sure you want to delete{" "}
              <span className="font-medium text-white">{jobToDelete.title}</span>?
              This action cannot be undone.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-xl border-[#34343a] bg-transparent text-[#f4f4f5] hover:bg-[#232327] hover:text-white"
                onClick={() => setJobToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="h-10 rounded-xl bg-red-500 text-white hover:bg-red-400"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={cn(
              "pointer-events-auto rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur",
              toast.tone === "success"
                ? "border-emerald-500/30 bg-[#13201a]/95 text-emerald-200"
                : "border-red-500/30 bg-[#241516]/95 text-red-200"
            )}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  )
}