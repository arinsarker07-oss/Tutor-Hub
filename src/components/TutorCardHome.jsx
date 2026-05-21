"use client"
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Card, Button, Chip } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaClock, FaBookOpen } from 'react-icons/fa';
import Link from 'next/link';

export default function TutorCards() {
    // ১. আপনার data.json ফাইলের ডেটা রাখার জন্য স্টেট
    const [tutors, setTutors] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(true);

    // ফিল্টার স্টেটসমূহ
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // ২. JSON ফাইল থেকে ডেটা নিয়ে আসার জন্য useEffect
    useEffect(() => {
        fetch('http://localhost:8000/TutorDetail')
            .then((res) => res.json())
            .then((data) => {
                setTutors(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching tutor data:", err);
                setLoading(false);
            });
    }, []);

    // ৩. আপনার রিকোয়ারমেন্ট অনুযায়ী নিখুঁত useMemo ফিল্টার লজিক
    const filteredTutors = useMemo(() => {
        let result = tutors;

        // নাম দিয়ে সার্চ ফিল্টার
        if (search.trim() !== '') {
            result = result.filter((tutor) =>
                tutor.tutor_name && tutor.tutor_name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // ৪. ডেট রেঞ্জের ভেতরে (Inside the Range) ফিল্টার করার লজিক
        if (startDate || endDate) {
            result = result.filter((tutor) => {
                const tutorStart = tutor.session_start_date; // টিউটরের সেশন শুরু
                const tutorEnd = tutor.session_end_date;     // টিউটরের সেশন শেষ

                // যদি কোনো টিউটরের ডেটা মিসিং থাকে, তাকে বাদ দেওয়া হবে ফিল্টার করার সময়
                if (!tutorStart || !tutorEnd) return false;

                // কন্ডিশন ১: যদি স্টার্ট এবং এন্ড ডেট দুটাই সিলেক্ট করা থাকে
                // টিউটরের পুরো সেশনটি ইউজারের সিলেক্ট করা রেঞ্জের ভেতরে থাকতে হবে
                if (startDate && endDate) {
                    return tutorStart >= startDate && tutorEnd <= endDate;
                }

                // কন্ডিশন ২: যদি শুধু Available From (Start) সিলেক্ট করা থাকে
                // টিউটরের সেশন অবশ্যই ইউজারের দেওয়া স্টার্ট ডেটের সমান বা পরে শুরু হতে হবে
                if (startDate) {
                    return tutorStart >= startDate;
                }

                // কন্ডিশন ৩: যদি শুধু Available Till (End) সিলেক্ট করা থাকে
                // টিউটরের সেশন অবশ্যই ইউজারের দেওয়া এন্ড ডেটের সমান বা আগে শেষ হতে হবে
                if (endDate) {
                    return tutorEnd <= endDate;
                }

                return true;
            });
        }

        return result;
    }, [search, startDate, endDate, tutors]);

    // রিসেট বাটন হ্যান্ডলার
    const handleReset = () => {
        setSearch('');
        setStartDate('');
        setEndDate('');
        setVisibleCount(6);
    };

    const showMoreTutors = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 6, filteredTutors.length));
    };

    if (loading) {
        return (
            <div className="w-full text-center my-20">
                <p className="text-zinc-500 dark:text-zinc-400 animate-pulse font-medium">Loading Tutors...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto my-10 px-4 relative overflow-visible bg-transparent">

            {/* ব্যাকগ্রাউন্ড ইফেক্ট */}
            <div className="absolute inset-0 pointer-events-none overflow-visible z-[-1]">
                <div className="absolute left-1/3 top-1/4 w-[600px] h-[600px] rounded-full blur-[130px] bg-gradient-to-br from-slate-200/40 via-slate-100/10 to-transparent dark:from-teal-600/5 dark:via-blue-500/5" />
            </div>

            {/* সেকশন হেডার */}
            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-800 dark:text-white tracking-tight">
                    Find Your Perfect <span className="text-[#237888] dark:text-teal-400">Expert Tutor</span>
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm md:text-base max-w-xl mx-auto">
                    Learn from top university experts with tailored slots and affordable fees.
                </p>
            </div>

            {/* সার্চ ও ফিল্টার প্যানেল */}
            <div className="w-full bg-white dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80 p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] backdrop-blur-md mb-3 transition-all duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">

                    {/* সার্চ ইনপুট */}
                    <div className="flex flex-col space-y-2 w-full text-left">
                        <label className="text-xs font-bold text-[#237888] dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5 h-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#237888] dark:bg-teal-400 inline-block"></span>
                            Search Tutor
                        </label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setVisibleCount(6);
                            }}
                            placeholder="Search tutor by name..."
                            className="w-full px-4 py-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-zinc-800 dark:text-white text-sm outline-none focus:border-[#237888] dark:focus:border-teal-500 focus:bg-white dark:focus:bg-zinc-950 shadow-inner transition-all duration-200"
                        />
                    </div>

                    {/* স্টার্ট ডেট ইনপুট */}
                    <div className="flex flex-col space-y-2 w-full text-left">
                        <label className="text-xs font-bold text-[#237888] dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5 h-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#237888] dark:bg-teal-400 inline-block"></span>
                            Available From
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                setVisibleCount(6);
                            }}
                            className="w-full px-4 py-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 text-sm outline-none focus:border-[#237888] dark:focus:border-teal-500 focus:bg-white dark:focus:bg-zinc-950 shadow-inner transition-all duration-200 cursor-pointer [color-scheme:light] dark:[color-scheme:dark]"
                        />
                    </div>

                    {/* এন্ড ডেট ইনপুট */}
                    <div className="flex flex-col space-y-2 w-full text-left">
                        <label className="text-xs font-bold text-[#237888] dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5 h-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#237888] dark:bg-teal-400 inline-block"></span>
                            Available Till
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                                setVisibleCount(6);
                            }}
                            className="w-full px-4 py-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 text-sm outline-none focus:border-[#237888] dark:focus:border-teal-500 focus:bg-white dark:focus:bg-zinc-950 shadow-inner transition-all duration-200 cursor-pointer [color-scheme:light] dark:[color-scheme:dark]"
                        />
                    </div>

                    {/* ফিল্টার রিসেট বাটন (১০০% সমান হাইট ফিক্সড) */}
                    <div className='mt-3'>
                        <Button onClick={handleReset} size='lg' className="w-full rounded-xl  ">Reset </Button>
                    </div>


                </div>
            </div>

            {/* ডাটা না পাওয়া গেলে */}
            {filteredTutors.length === 0 && (
                <div className="w-full text-center my-16">
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium">No tutors found matching the criteria.</p>
                </div>
            )}

            {/* টিউটর গ্রিড */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredTutors.slice(0, visibleCount).map((tutor, index) => (
                        <motion.div
                            key={tutor._id || index}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
                            whileHover={{ y: -6 }}
                            className="h-full"
                        >
                            <Card className="w-full border border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-[#237888]/30 dark:hover:border-teal-500/30 transition-all duration-300 rounded-2xl bg-white dark:bg-zinc-900/90 backdrop-blur-md overflow-hidden group flex flex-col p-0">

                                {/* ইমেজ বক্স */}
                                <div className="relative w-full overflow-hidden bg-slate-50 dark:bg-zinc-800 shrink-0">
                                    <Image
                                        src={tutor.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"}
                                        alt={tutor.tutor_name || "Tutor Photo"}
                                        width={400}
                                        height={400}
                                        sizes="(max-w-7xl) 33vw"
                                        priority={index < 3}
                                        className="object-cover overflow-hidden rounded-t-3xl p-2 group-hover:scale-102 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 z-10">
                                        <Chip size="sm" variant="flat" className="bg-black/60 backdrop-blur-md text-white text-xs border-none px-2 py-0.5 rounded-lg">
                                            {tutor.teaching_mode || "Both"}
                                        </Chip>
                                    </div>
                                </div>

                                {/* কন্টেন্ট এরিয়া */}
                                <div className="p-5 flex-1 flex flex-col justify-between w-full text-left">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#237888] dark:text-teal-400">
                                                <FaBookOpen className="text-[10px]" />
                                                {tutor.subject_category}
                                            </span>
                                            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                                                {tutor.total_slots} Slots Available
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-[#237888] dark:group-hover:text-teal-400 transition-colors duration-200">
                                            {tutor.tutor_name}
                                        </h3>

                                        <p className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 min-h-[16px]">
                                            <FaGraduationCap className="text-zinc-400 shrink-0 mt-0.5 text-sm" />
                                            <span className="line-clamp-1 font-medium">{tutor.institution}</span>
                                        </p>

                                        <hr className="my-3.5 border-slate-100 dark:border-zinc-800" />

                                        <div className="space-y-2">
                                            <p className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                                <FaClock className="text-zinc-400 text-sm shrink-0" />
                                                <span className="line-clamp-1">{tutor.available_days} ({tutor.available_time_slot})</span>
                                            </p>

                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                                                <span className="font-semibold text-zinc-400">Timeline:</span> {tutor.session_start_date} to {tutor.session_end_date}
                                            </p>

                                            <p className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                                <FaMapMarkerAlt className="text-zinc-400 text-sm shrink-0" />
                                                <span className="line-clamp-1">{tutor.location}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-100 dark:border-zinc-800/60 w-full">
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">Hourly Fee</p>
                                            <p className="text-base font-extrabold text-zinc-900 dark:text-white flex items-center">
                                                <span className="text-sm font-bold text-emerald-500 mr-0.5">৳</span>
                                                {tutor.hourly_fee} <span className="text-xs font-medium text-zinc-400 ml-0.5">/hr</span>
                                            </p>
                                        </div>
                                        <Link href={`/${tutor._id}`}>
                                         <Button size="lg" className="rounded-xl px-4 font-semibold text-xs text-white bg-[#237888] hover:bg-[#1a5c69] dark:bg-teal-600 dark:hover:bg-teal-500 shadow-sm transition-all">
                                            Book Session
                                        </Button>                                       
                                        </Link>

                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* View More বাটন */}
            <Link href={"/tutors"}>
                <div className="flex justify-center mt-12">
                    <Button onClick={showMoreTutors} size="lg" variant="bordered" className="rounded-xl px-8 py-3 text-sm font-bold  border-zinc-300 dark:border-zinc-700 bg-[#5dc5f1] dark:hover:border-teal-400 hover:text-white dark:text-zinc-300 dark:hover:text-teal-400 text-black dark:bg-zinc-900 shadow-sm transition-all duration-300">
                        ALL Tutors
                    </Button>
                </div>
            </Link>

        </div>
    );
}