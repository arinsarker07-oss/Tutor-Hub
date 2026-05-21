"use client"
import React from "react"
import Link from "next/link"
import { MobileMenu } from "./MobileMenu"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { authClient } from "@/lib/auth-client"
import { Avatar } from "@heroui/react"

export function Navbar() {
    const {
        data: session,
    } = authClient.useSession()
    const user = session?.user
    console.log(user);

    const signouthandle = async () => {
        await authClient.signOut();
    }

    const pathname = usePathname()
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Tutors", href: "/tutors" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ]
    const navlink = [
        { name: "Home", href: "/" },
        { name: "My Tutor", href: "/MyTutor" },
        { name: "Add Tutor", href: "/TutorRegister" },
        { name: "Booked Session", href: "/BookedSession" },
    ]

    return (
        <nav className="w-full bg-[#f8fafc] border-b border-slate-100 sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">

                    {/* Logo & Name */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center rounded ">
                            <Image src={"/logo.png"} height={60} width={40} alt="TH">
                            </Image>
                        </div>
                        <Link href="/">
                            <p className=" text-3xl bg-gradient-to-r from-[#0B253A] to-[#1D9299] bg-clip-text text-transparent font-black tracking-tight ">
                                TutorHub
                            </p>
                        </Link>
                    </div>

                    {/* Nav Links for Desktop */}
                    {
                        user ? <>
                            <div className="hidden md:flex items-center space-x-10">
                                {navlink.map((link) => {
                                    const isActive = pathname === link.href
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`${isActive ? " uppercase text-[#1D9299]" : "text-[#526677]"} relative text-sm font-medium  transition-colors hover:text-[#2c93a6]`}
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
                            {/* Buttons for Desktop */}
                            <div className="hidden md:flex items-center space-x-4">
                                <Link href={"/profile"}>
                                <div className={`p-0.5 rounded-full border-5 ${user?.emailVerified ? 'border-success' : 'border-[#237888]'}`}>
                                    <Avatar>
                                        <Avatar.Image alt={user?.name[0]} src={user?.image} referrerPolicy='no-referrer' />
                                        <Avatar.Fallback>{user?.name[0]}</Avatar.Fallback>
                                    </Avatar>
                                    </div>
                                </Link>
                                
                                <button onClick={signouthandle}  className=" rounded-2xl  px-6 py-2.5 text-sm font-medium  transition-all bg-[#882350] text-white shadow-sm">
                                    Log Out
                                </button>
                            </div>

                        </> : <>
                            <div className="hidden md:flex items-center space-x-10">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`${isActive ? " uppercase text-[#1D9299]" : "text-[#526677]"} relative text-sm font-medium  transition-colors hover:text-[#2c93a6]`}
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
                            {/* Buttons for Desktop */}
                            <div className="hidden md:flex items-center space-x-4">
                                <Link href="/login">
                                    <button className={`rounded-xl ${pathname === "/login" ? "bg-[#2c93a6] text-white" : "bg-white"}  px-6 py-2.5 text-sm font-medium  transition-all hover:bg-[#237888] hover:text-white shadow-sm`}>
                                        Login
                                    </button>
                                </Link>
                                <Link href="/signup">
                                    <button className={`rounded-xl ${pathname === "/signup" ? "bg-[#2c93a6] text-white" : "bg-white"}  px-6 py-2.5 text-sm font-medium  transition-all hover:bg-[#237888] hover:text-white shadow-sm`}>
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        </>
                    }


                    {/* Client Side Part */}
                    <MobileMenu navLinks={navLinks} />

                </div>
            </div>
        </nav>
    )
}