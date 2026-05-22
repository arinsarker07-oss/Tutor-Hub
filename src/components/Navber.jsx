"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import { Avatar } from "@heroui/react"
import { HiMenu, HiX } from "react-icons/hi"
import { FiSun, FiMoon } from "react-icons/fi" // Dark mode icons
import { useTheme } from "next-themes" // Theme handler
import { toast } from "react-toastify"

// Theme Toggle Component
function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Hydration error bandsatar jonno mounted check kora dorkar
    useEffect(() => setMounted(true), [])
    if (!mounted) return <div className="w-9 h-9" /> 

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-[#072133] dark:text-slate-100 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? <FiSun className="text-xl text-amber-500" /> : <FiMoon className="text-xl" />}
        </button>
    )
}

function MobileMenu({ navLinks, user, signouthandle, pathname }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="md:hidden flex items-center gap-2">
            {/* Mobile context-eo jeno theme change kora jay */}
            <ThemeToggle />
            
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#072133] dark:text-slate-100 outline-none p-2 flex items-center justify-center transition-transform active:scale-95"
                aria-label="Toggle Menu"
            >
                {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 top-20 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-5 duration-200 z-50">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block py-2 text-base font-medium transition-colors ${isActive ? "text-[#1D9299] font-bold" : "text-[#526677] dark:text-slate-400 hover:text-[#2c93a6]"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        )
                    })}

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                        {user ? (
                            <>
                                <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 py-2">
                                    <div className={`p-0.5 rounded-full border-2 ${user?.emailVerified ? 'border-success' : 'border-[#237888]'}`}>
                                        <Avatar size="sm">
                                            <Avatar.Image alt={user?.name?.[0]} src={user?.image} referrerPolicy='no-referrer' />
                                            <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                                        </Avatar>
                                    </div>
                                    <span className="text-sm font-medium text-[#072133] dark:text-slate-200">{user?.name || "Profile"}</span>
                                </Link>

                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        signouthandle();
                                    }}
                                    className="w-full rounded-xl bg-[#882350] py-3 text-sm font-medium text-white shadow-sm"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setIsOpen(false)}>
                                    <button className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3 text-sm font-medium text-[#072133] dark:text-slate-200 shadow-sm">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/signup" onClick={() => setIsOpen(false)}>
                                    <button className="w-full rounded-xl bg-[#2c93a6] py-3 text-sm font-medium text-white shadow-sm">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export function Navbar() {
    const { data: session } = authClient.useSession()
    const user = session?.user
    const pathname = usePathname()
    const router = useRouter()

    const signouthandle = async () => {
        try {
            const toastId = toast.loading("Logging out... Please wait.");
            await authClient.signOut();
            
            toast.update(toastId, { 
                render: "Logged out successfully!", 
                type: "success", 
                isLoading: false,
                autoClose: 2000 
            });

            setTimeout(() => {
                router.push("/");
                router.refresh();
            }, 1000);

        } catch (error) {
            toast.error("Something went wrong while logging out.");
            console.error("Signout error:", error);
        }
    }

    const navLinksOut = [
        { name: "Home", href: "/" },
        { name: "All Tutor", href: "/tutors" },
        { name: "About", href: "/#about-section" },
        { name: "Contact", href: "/#contact" },
    ]

    const navLinksIn = [
        { name: "Home", href: "/" },
        { name: "All Tutor", href: "/tutors" },
        { name: "My Tutor", href: "/MyTutor" },
        { name: "Add Tutor", href: "/TutorRegister" },
        { name: "Booked Session", href: "/BookedSession" },
    ]

    const activeLinks = user ? navLinksIn : navLinksOut

    return (
        <nav className="w-full bg-[#f8fafc] dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 sticky top-0 z-50 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">

                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center rounded">
                            <Image src={"/logo.png"} height={60} width={40} alt="TH" />
                        </div>
                        <Link href="/">
                            <p className="text-3xl bg-gradient-to-r from-[#0B253A] to-[#1D9299] dark:from-slate-100 dark:to-[#1D9299] bg-clip-text text-transparent font-black tracking-tight">
                                TutorHub
                            </p>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-10">
                        {activeLinks.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`${isActive ? "uppercase text-[#1D9299]" : "text-[#526677] dark:text-slate-400"} relative text-sm font-medium transition-colors hover:text-[#2c93a6]`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeUnderline"
                                            className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2c93a6] rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {/* Desktop Theme Toggle */}
                        <ThemeToggle />

                        {user ? (
                            <>
                                <Link href={"/profile"}>
                                    <div className={`p-0.5 rounded-full border-5 ${user?.emailVerified ? 'border-success' : 'border-[#237888]'}`}>
                                        <Avatar>
                                            <Avatar.Image alt={user?.name?.[0]} src={user?.image} referrerPolicy='no-referrer' />
                                            <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                                        </Avatar>
                                    </div>
                                </Link>
                                <button onClick={signouthandle} className="rounded-2xl px-6 py-2.5 text-sm font-medium transition-all bg-[#882350] text-white shadow-sm">
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <button className={`rounded-xl ${pathname === "/login" ? "bg-[#2c93a6] text-white" : "bg-white dark:bg-slate-900"} px-6 py-2.5 text-sm font-medium transition-all hover:bg-[#237888] dark:hover:bg-[#237888] hover:text-white dark:text-slate-200 shadow-sm`}>
                                        Login
                                    </button>
                                </Link>
                                <Link href="/signup">
                                    <button className={`rounded-xl ${pathname === "/signup" ? "bg-[#2c93a6] text-white" : "bg-white dark:bg-slate-900"} px-6 py-2.5 text-sm font-medium transition-all hover:bg-[#237888] dark:hover:bg-[#237888] hover:text-white dark:text-slate-200 shadow-sm`}>
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>

                    <MobileMenu
                        navLinks={activeLinks}
                        user={user}
                        signouthandle={signouthandle}
                        pathname={pathname}
                    />

                </div>
            </div>
        </nav>
    )
}