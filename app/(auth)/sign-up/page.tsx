"use client"

import Link from "next/link"

import {
    Building2Icon,
    ShieldCheckIcon,
    UserSearchIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

const inputClass =
    "h-12 w-full rounded-xl border border-white/20 bg-[#101010] px-4 text-base text-white outline-none transition-colors placeholder:text-white/60 focus:border-[#5c53fe]/60 focus:ring-2 focus:ring-[#5c53fe]/30"

const roles = [
    { value: "seeker", label: "Seeker", icon: UserSearchIcon },
    { value: "recruiter", label: "Recruiter", icon: Building2Icon },
    { value: "admin", label: "Admin", icon: ShieldCheckIcon },
]

export default function SignUpPage() {
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        console.log("sign-up form data:", data)


        const { data: result, error } = await authClient.signUp.email({
            name: data.name as string,
            email: data.email as string,
            password: data.password as string,
            role: data.role as "seeker" | "recruiter" | "admin",
            callbackURL: "/",
        });
        if (error) {
            console.log("Signup failed:", error.message);
            return;
        }

        console.log("Signup successful:", result);
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-[#0d0d0f]/90 p-8">
            <header className="text-center">
                <h1 className="font-manrope text-2xl font-bold text-white">
                    Create your account
                </h1>
                <p className="mt-2 text-sm text-white/60">
                    Join HireLoop and land your next role — faster.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-white/80">
                        Full name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Alex Sterling"
                        className={inputClass}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-white/80">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={inputClass}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-white/80"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="new-password"
                        placeholder="At least 8 characters"
                        className={inputClass}
                    />
                </div>

                <fieldset className="flex flex-col gap-2">
                    <legend className="text-sm font-medium text-white/80">
                        I am a...
                    </legend>
                    <div className="grid grid-cols-3 gap-2">
                        {roles.map((role) => (
                            <label
                                key={role.value}
                                className="cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value={role.value}
                                    defaultChecked={role.value === "seeker"}
                                    required
                                    className="peer sr-only"
                                />
                                <span className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-[#101010] text-sm text-white/70 transition-colors hover:border-white/40 peer-checked:border-transparent peer-checked:bg-[#5c53fe] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#5c53fe]/40">
                                    <role.icon className="size-4" />
                                    {role.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <Button
                    type="submit"
                    className="mt-2 h-12 w-full rounded-xl bg-[#5c53fe] text-base font-medium text-white hover:bg-[#5c53fe]/90"
                >
                    Sign Up
                </Button>

                <p className="text-center text-xs leading-relaxed text-white/40">
                    By creating an account, you agree to HireLoop&apos;s{" "}
                    <Link
                        href="#"
                        className="text-[#8d87ff] hover:underline"
                    >
                        Terms &amp; Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="#"
                        className="text-[#8d87ff] hover:underline"
                    >
                        Privacy Guideline
                    </Link>
                    .
                </p>
            </form>

            <p className="mt-6 text-center text-sm text-white/60">
                Already have an account?{" "}
                <Link
                    href="/sign-in"
                    className="font-medium text-[#8d87ff] hover:underline"
                >
                    Sign in
                </Link>
            </p>
        </div>
    )
}
