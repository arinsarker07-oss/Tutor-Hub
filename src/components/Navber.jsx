"use client"
import React from "react"
import Link from "next/link"
import { MobileMenu } from "./MobileMenu"
import Image from "next/image"
import { usePathname } from "next/navigation"

export  function Navbar() {
    const pathname= usePathname()
    console.log(pathname);
    
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Tutors", href: "/tutors" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
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
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-[#526677] transition-colors hover:text-[#2c93a6]"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Buttons for Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/login">
                            <button className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-[#072133] transition-all hover:bg-slate-50 shadow-sm">
                                Login
                            </button>
                        </Link>

                        <Link href="/register">
                            <button className="rounded-xl bg-[#2c93a6] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#237888] shadow-sm">
                                Sign Up
                            </button>
                        </Link>
                    </div>

                    {/* Client Side Part */}
                    <MobileMenu navLinks={navLinks} />

                </div>
            </div>
        </nav>
    )
}