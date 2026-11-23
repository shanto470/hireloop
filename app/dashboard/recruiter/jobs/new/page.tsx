"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
    Building2Icon,
    CalendarIcon,
    ChevronRightIcon,
    DollarSignIcon,
    GlobeIcon,
    MapPinIcon,
    SendIcon,
} from "lucide-react"
import { createJob } from "@/lib/actions/jobs"

/* ------------------------------------------------------------------ */
/* Shared field styles — from the Figma "Add New Job" frame            */
/* ------------------------------------------------------------------ */

const inputClass =
    "h-11 rounded-xl border-0 bg-[#1e1e21]! pl-10 pr-4 text-sm text-white [color-scheme:dark] placeholder:text-[#a0a0ab] focus-visible:ring-2 focus-visible:ring-[#5c53fe]/40"

const labelClass = "leading-[18px] text-[#f4f4f5]"

const sectionClass = "rounded-2xl bg-[#151516] p-6"

const selectTriggerClass =
    "h-11! w-full rounded-xl border-0 bg-[#1e1e21]! px-4 text-sm text-white focus-visible:ring-2 focus-visible:ring-[#5c53fe]/40 [&_svg]:size-3 [&_svg]:text-[#a0a0ab]"

const categories = [
    "Engineering & Tech",
    "Design & Creative",
    "Marketing & Sales",
    "Finance & Accounting",
    "Customer Support",
    "Other",
]

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

const frequencies = ["per hour", "per day", "per week", "per month", "per year"]

const responsibilitiesPlaceholder =
    "Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems \ndesigners and backend engineers to craft responsive, micro-interaction rich products."

const qualificationsPlaceholder =
    "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function NewJobPage() {
    const [status, setStatus] = useState<string | null>(null)
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const jobData = Object.fromEntries(
                new FormData(event.currentTarget).entries()
            );

            const result = await createJob(jobData);

            console.log(result);
            setStatus("Job created successfully!");

        } catch (error) {
            console.error(error);
            setStatus("Failed to create job.");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-screen bg-[#131314] px-4 text-white sm:px-6"
        >
            <div className="mx-auto w-full max-w-[984px]">
                {/* ---------------- Top bar ---------------- */}
                <header className="flex flex-col gap-4 border-b border-[#2a2a2b] py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <div className="flex flex-col gap-1">
                        <nav className="flex items-center gap-1 text-xs leading-4 font-medium">
                            <Link
                                href="/dashboard/recruiter/jobs"
                                className="text-[#a0a0ab] transition-colors hover:text-white"
                            >
                                Manage Jobs
                            </Link>
                            <ChevronRightIcon
                                className="size-3 text-[#5a5a60]"
                                aria-hidden="true"
                            />
                            <span className="text-[#c3c0ff]">Create New Listing</span>
                        </nav>
                        <h1 className="text-[32px] leading-[42px] font-medium">
                            Post a New Job
                        </h1>
                        <p className="text-[13px] leading-5 text-[#a0a0ab]">
                            Fill in the position specifications to attract qualified talent
                            across our network.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="h-11 shrink-0 gap-1 rounded-xl bg-[#5c53fe] px-6 font-bold text-white hover:bg-[#6d66ff]"
                    >
                        Publish Job
                        <SendIcon className="size-4" />
                    </Button>
                </header>

                {/* ---------------- Form sections ---------------- */}
                <div className="mt-6 flex flex-col gap-6">
                    {/* Section 1 — Basic Information */}
                    <section className={sectionClass}>
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-[#5c53fe]" />
                            <h2 className="text-base leading-6 font-medium">
                                1. Basic Information
                            </h2>
                        </div>

                        <div className="mt-5 flex flex-col gap-4">
                            {/* Job Title */}
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="jobTitle" className={labelClass}>
                                    Job Title *
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="jobTitle"
                                        name="jobTitle"
                                        placeholder="Frontend Developer"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Company Name + Job Category */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="flex flex-col gap-1">
                                    <Label htmlFor="companyName" className={labelClass}>
                                        Company Name *
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="companyName"
                                            name="companyName"

                                            placeholder="HirePulse Network"
                                            className={inputClass}
                                        />
                                        <Building2Icon
                                            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#a0a0ab]"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <Label className={labelClass}>Job Category *</Label>
                                    <Select
                                        name="jobCategory"
                                        defaultValue="Engineering & Tech"
                                    >
                                        <SelectTrigger className={selectTriggerClass}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1e1e21] text-white ring-[#2a2a2b]">
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category}
                                                    value={category}
                                                    className="focus:bg-[#232327] focus:text-white"
                                                >
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Job Type */}
                            <div className="flex flex-col gap-1">
                                <Label className={labelClass}>Job Type *</Label>
                                <RadioGroup
                                    name="jobType"
                                    defaultValue="Full-time"
                                    className="grid grid-cols-2 gap-1 md:grid-cols-4"
                                >
                                    {jobTypes.map((type) => (
                                        <RadioGroupItem
                                            key={type}
                                            value={type}
                                            className="h-11! w-auto! text-center aspect-auto rounded-xl border border-transparent bg-[#1e1e21]! px-4 text-sm text-white after:inset-x-0 data-checked:border-[#5c53fe]! data-checked:bg-[#232327]! data-checked:text-white [&_[data-slot=radio-group-indicator]]:hidden"
                                        >
                                            {type}
                                        </RadioGroupItem>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 — Location, Compensation & Timeline */}
                    <section className={sectionClass}>
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-[#5c53fe]" />
                            <h2 className="text-base leading-6 font-medium">
                                2. Location, Compensation &amp; Timeline
                            </h2>
                        </div>

                        <div className="mt-5 flex flex-col gap-4">
                            {/* Remote toggle */}
                            <div className="flex items-center justify-between gap-4 rounded-xl border border-[#232327] bg-[#1e1e21] p-[13px]">
                                <div className="flex items-center gap-2">
                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
                                        <GlobeIcon
                                            className="size-5 text-[#c3c0ff]"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    <span className="flex flex-col">
                                        <span className="text-sm leading-[18px] font-medium text-white">
                                            Remote Work Allowed (isRemote)
                                        </span>
                                        <span className="text-[13px] leading-5 text-[#a0a0ab]">
                                            Enable worldwide or distributed candidate
                                            applications
                                        </span>
                                    </span>
                                </div>
                                <Switch
                                    name="isRemote"
                                    value="true"
                                    uncheckedValue="false"
                                    className="h-6 w-11! data-unchecked:bg-[#1f1f1f]! data-checked:bg-[#5c53fe]! [&_[data-slot=switch-thumb]]:size-5! [&_[data-slot=switch-thumb]]:bg-white! [&[data-checked]_[data-slot=switch-thumb]]:translate-x-[calc(100%+2px)]!"
                                />
                            </div>

                            {/* Location + Deadline */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="location" className={labelClass}>
                                            Job Location (location)
                                        </Label>
                                        <span className="text-xs leading-4 text-[#5a5a60]">
                                            Required
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="location"
                                            name="location"
                                            placeholder="New York, USA"
                                            className={inputClass}
                                        />
                                        <MapPinIcon
                                            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#a0a0ab]"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <Label htmlFor="deadline" className={labelClass}>
                                        Application Deadline (deadline)
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="deadline"
                                            name="deadline"
                                            type="date"
                                            className={inputClass}
                                        />
                                        <CalendarIcon
                                            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#a0a0ab]"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Salary range + frequency */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="flex flex-col gap-1">
                                    <Label htmlFor="minSalary" className={labelClass}>
                                        Min Salary / Rate
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="minSalary"
                                            name="minSalary"
                                            type="number"
                                            placeholder="25"
                                            className={inputClass}
                                        />
                                        <DollarSignIcon
                                            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#a0a0ab]"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <Label htmlFor="maxSalary" className={labelClass}>
                                        Max Salary / Rate
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="maxSalary"
                                            name="maxSalary"
                                            type="number"
                                            placeholder="40"
                                            className={inputClass}
                                        />
                                        <DollarSignIcon
                                            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#a0a0ab]"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <Label className={labelClass}>Frequency</Label>
                                    <Select name="frequency" defaultValue="per hour">
                                        <SelectTrigger className={selectTriggerClass}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1e1e21] text-white ring-[#2a2a2b]">
                                            {frequencies.map((frequency) => (
                                                <SelectItem
                                                    key={frequency}
                                                    value={frequency}
                                                    className="focus:bg-[#232327] focus:text-white"
                                                >
                                                    {frequency}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 — Responsibilities & Requirements */}
                    <section className={sectionClass}>
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-[#5c53fe]" />
                            <h2 className="text-base leading-6 font-medium">
                                3. Responsibilities &amp; Requirements
                            </h2>
                        </div>

                        <div className="mt-5 flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="responsibilities" className={labelClass}>
                                    Key Responsibilities *
                                </Label>
                                <Textarea
                                    id="responsibilities"
                                    name="responsibilities"
                                    placeholder={responsibilitiesPlaceholder}
                                    className="h-[98px] rounded-xl border-0 bg-[#1e1e21]! px-4 py-3 text-sm leading-[22px] text-white placeholder:text-[#a0a0ab] focus-visible:ring-2 focus-visible:ring-[#5c53fe]/40"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label htmlFor="qualifications" className={labelClass}>
                                    Qualifications &amp; Requirements *
                                </Label>
                                <Textarea
                                    id="qualifications"
                                    name="qualifications"
                                    placeholder={qualificationsPlaceholder}
                                    className="h-[98px] rounded-xl border-0 bg-[#1e1e21]! px-4 py-3 text-sm leading-[22px] text-white placeholder:text-[#a0a0ab] focus-visible:ring-2 focus-visible:ring-[#5c53fe]/40"
                                />
                            </div>
                        </div>
                    </section>
                </div>
                {status && (
                    <p className="py-4 text-xs text-[#c3c0ff]" role="status">
                        {status}
                    </p>
                )}
            </div>
        </form>
    )
}
