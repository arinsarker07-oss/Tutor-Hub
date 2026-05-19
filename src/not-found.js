import React from "react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-[#f8fafc] px-6 text-center">
      <div className="mx-auto max-w-md">
        
        {/* ১. ৪MD৪ জ্যামিতিক ও মিনিমালিস্ট ইলাস্ট্রেশন (আপনার থিমের লোগোর স্টাইলে) */}
        <div className="relative flex justify-center mb-8">
          <div className="text-9xl font-extrabold tracking-tighter text-slate-200 select-none">
            404
          </div>
          {/* মাঝখানে থিম কালারের একটি জ্যামিতিক শেপ পপ-আপ করবে */}
          <div className="absolute inset-0 flex items-center justify-center top-4">
            <div className="h-16 w-16 rotate-45 bg-[#2c93a6] rounded-2xl animate-pulse shadow-lg opacity-90 flex items-center justify-center">
              <div className="h-6 w-6 -rotate-45 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* ২. টেক্সট সেকশন (নেভি ব্লু ও স্লেট কালার) */}
        <h1 className="text-3xl font-bold tracking-tight text-[#072133] sm:text-4xl">
          Page Not Found
        </h1>
        
        <p className="mt-4 text-base leading-7 text-[#526677]">
          Oops! The page you are looking for doesn't exist or has been moved. 
          Let's get you back on track to finding the best tutors.
        </p>

        {/* ৩. অ্যাকশন বাটন (আপনার নেবারের সাইনআপ বাটনের থিমে) */}
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Link href="/">
            <button className="rounded-xl bg-[#2c93a6] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#237888] active:scale-95">
              Back to Home
            </button>
          </Link>
          
          <Link href="/tutors">
            <button className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-[#072133] shadow-sm transition-all hover:bg-slate-50">
              Browse Tutors
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}