"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

const inputClass =
    "h-12 w-full rounded-xl border border-white/20 bg-[#101010] px-4 text-base text-white outline-none transition-colors placeholder:text-white/60 focus:border-[#5c53fe]/60 focus:ring-2 focus:ring-[#5c53fe]/30"

export default function SignInPage() {
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        console.log("sign-in form data:", data)

        const { data: result, error } = await authClient.signIn.email({
            email: data.email as string, // required, The email address of the user.
            password: data.password as string,
            rememberMe: true,
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
                    Welcome back
                </h1>
                <p className="mt-2 text-sm text-white/60">
                    Sign in to continue your job search.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
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
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-white/80"
                        >
                            Password
                        </label>
                        {/* TODO: forgot-password flow */}
                        <Link
                            href="#"
                            className="text-xs font-medium text-[#8d87ff] hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className={inputClass}
                    />
                </div>

                <Button
                    type="submit"
                    className="mt-2 h-12 w-full rounded-xl bg-[#5c53fe] text-base font-medium text-white hover:bg-[#5c53fe]/90"
                >
                    Sign In
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-white/60">
                New to HireLoop?{" "}
                <Link
                    href="/sign-up"
                    className="font-medium text-[#8d87ff] hover:underline"
                >
                    Create an account
                </Link>
            </p>
        </div>
    )
}
