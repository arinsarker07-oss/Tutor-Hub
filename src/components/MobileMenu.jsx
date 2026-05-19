// src/components/MobileMenu.jsx
"use client"

import React, { useState } from "react"
import Link from "next/link"
import { HiMenu, HiX } from "react-icons/hi" // react-icons থেকে ইম্পোর্ট করা হয়েছে

export function MobileMenu({ navLinks }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* মোবাইল মেনু টগল বাটন */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#072133] outline-none p-2 flex items-center justify-center transition-transform active:scale-95"
        aria-label="Toggle Menu"
      >
        {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
      </button>

      {/* মোবাইল ড্রপডাউন মেনু */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-20 border-t border-slate-100 bg-white px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-base font-medium text-[#526677] hover:text-[#2c93a6]"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <button className="w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-[#072133] shadow-sm">
                Login
              </button>
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)}>
              <button className="w-full rounded-xl bg-[#2c93a6] py-3 text-sm font-medium text-white shadow-sm">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}