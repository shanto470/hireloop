import Link from "next/link"
import {
  BriefcaseBusiness,
  ChevronRight,
  CirclePlus,
  Globe,
  MapPin,
  Pencil,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getJobs } from "@/lib/api/jobs"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"

type JobStatus = "Active" | "Expired"
type JobType = "Full-time" | "Part-time" | "Internship" | "Contract"

export type Job = {
  _id: string
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

type ApiJob = Record<string, unknown>

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return fallback
}

function normalizeJob(job: ApiJob, index: number): Job {
  const id = asString(job._id) || asString(job.id) || `job-${index}`
  const minSalary = asString(job.minSalary)
  const maxSalary = asString(job.maxSalary)
  const frequency = asString(job.frequency)
  const compensation =
    asString(job.compensation) ||
    (minSalary && maxSalary
      ? `${minSalary} – ${maxSalary}${frequency ? ` / ${frequency.replace(/^per\s+/, "")}` : ""}`
      : minSalary || maxSalary || "Not specified")

  const rawStatus = asString(job.status)
  const deadline = asString(job.deadline, "No deadline")
  const deadlineDate = new Date(deadline)
  const isExpired =
    rawStatus.toLowerCase() === "expired" ||
    (!Number.isNaN(deadlineDate.getTime()) && deadlineDate < new Date())

  const remoteValue = job.isRemote
  const isRemote =
    remoteValue === true ||
    (typeof remoteValue === "string" && remoteValue.toLowerCase() === "true")

  const location = asString(job.location, "Location not specified")
  const locationType: Job["locationType"] = isRemote
    ? "Remote"
    : location.toLowerCase().includes("hybrid")
      ? "Hybrid"
      : "On-site"

  const rawType = asString(job.jobType) || asString(job.type)
  const allowedTypes: JobType[] = ["Full-time", "Part-time", "Internship", "Contract"]
  const type: JobType = allowedTypes.includes(rawType as JobType)
    ? (rawType as JobType)
    : "Full-time"

  return {
    _id: id,
    id,
    title: asString(job.jobTitle) || asString(job.title, "Untitled job"),
    department: asString(job.jobCategory) || asString(job.department, "General"),
    company: asString(job.companyName) || asString(job.company, "Unknown company"),
    location,
    locationType,
    type,
    compensation,
    applicants: asNumber(job.applicants),
    status: isExpired ? "Expired" : "Active",
    deadline,
  }
}

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

export default async function ManageJobsPage() {
  const data = await getJobs()
  const jobs: Job[] = (Array.isArray(data) ? data : []).map((job, index) =>
    normalizeJob(job as ApiJob, index)
  )

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
                {jobs.length === 0 ? (
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
                        key={job._id}
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
                            <Users
                              className="size-4 text-[#8e8e96]"
                              aria-hidden="true"
                            />
                            <span>{job.applicants} Candidates</span>
                          </Link>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <StatusBadge status={job.status} />
                        </td>

                        <td className="px-4 py-4 align-top">
                          <p className="text-sm text-[#e4e4e7]">
                            {job.deadline}
                          </p>
                          <p className="mt-1 text-xs text-[#71717a]">
                            Deadline
                          </p>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <Button
                            nativeButton={false}
                            render={
                              <Link
                                href={`/dashboard/recruiter/jobs/${job.id}/edit`}
                              />
                            }
                            variant="outline"
                            className="h-9 gap-1.5 rounded-lg border-[#34343a] bg-transparent px-3 text-xs font-medium text-[#f4f4f5] hover:bg-[#232327] hover:text-white"
                          >
                            <Pencil
                              className="size-3.5"
                              aria-hidden="true"
                            />
                            Update
                          </Button>
                        </td>
                        <td>
                          <DeleteJobDialog job={job}></DeleteJobDialog>

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
    </div>
  )
}
