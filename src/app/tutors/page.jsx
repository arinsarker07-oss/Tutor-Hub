"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, Button, Chip } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaClock, FaBookOpen } from 'react-icons/fa';

export default function TutorCardsSection() {
    const [tutors, setTutors] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data.json')
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

    const showMoreTutors = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 6, tutors.length));
    };

    if (loading) {
        return (
            <div className="w-full text-center my-20">
                <p className="text-zinc-500 dark:text-zinc-400 animate-pulse font-medium">Loading Tutors...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto my-16 px-4 relative overflow-visible bg-transparent">
            
            {/* ব্যাকগ্রাউন্ড ইফেক্ট */}
            <div className="absolute inset-0 pointer-events-none overflow-visible z-[-1]">
                <div className="absolute left-1/3 top-1/4 w-[600px] h-[600px] rounded-full blur-[130px] bg-gradient-to-br from-slate-200/40 via-slate-100/10 to-transparent dark:from-teal-600/5 dark:via-blue-500/5" />
            </div>

            {/* সেকশন হেডার */}
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-800 dark:text-white tracking-tight">
                    Find Your Perfect <span className="text-[#237888] dark:text-teal-400">Expert Tutor</span>
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm md:text-base max-w-xl mx-auto">
                    Learn from top university experts with tailored slots and affordable fees.
                </p>
            </div>

            {/* টিউটর গ্রিড */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <AnimatePresence>
                    {tutors.slice(0, visibleCount).map((tutor, index) => (
                        <motion.div
                            key={tutor.id}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -25 }}
                            transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
                            whileHover={{ y: -6 }} // ইজ-প্রেসাবলের বদলে ফ্রেমার মোশনের স্মুথ হোভার
                            className="h-full"
                        >
                            {/* এরর এড়াতে isPressable বাদ দেওয়া হয়েছে */}
                            <Card className="w-full  border border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-[#237888]/30 dark:hover:border-teal-500/30 transition-all duration-300 rounded-2xl bg-white dark:bg-zinc-900/90 backdrop-blur-md overflow-hidden group flex flex-col p-0">
                                
                                {/* ─── ইমেজ বক্স (জুম আউট ও ফেস ফিক্সড) ─── */}
                                <div className="relative w-full  overflow-hidden bg-slate-50 dark:bg-zinc-800 shrink-0">
                                    <Image
                                        src={tutor.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"}
                                        alt={tutor.tutor_name}
                                        width={400}
                                        height={400}
                                        sizes="(max-w-7xl) 33vw"
                                        priority={index < 3}
                                        // object-contain ব্যবহার করায় পুরো মুখ ও বডি একদম ফ্রেমের মাঝে জুম-আউট হয়ে থাকবে, মাথা কাটবে না
                                        className="object-cover overflow-hidden rounded-t-3xl p-2 group-hover:scale-102 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 z-10">
                                        <Chip size="sm" variant="flat" className="bg-black/60 backdrop-blur-md text-white text-xs border-none px-2 py-0.5 rounded-lg">
                                            {tutor.teaching_mode}
                                        </Chip>
                                    </div>
                                </div>

                                {/* কন্টেন্ট এরিয়া */}
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
                                        <Button size="sm" className="rounded-xl px-4 font-semibold text-xs text-white bg-[#237888] hover:bg-[#1a5c69] dark:bg-teal-600 dark:hover:bg-teal-500 shadow-sm transition-all">
                                            Details
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* View More বাটন */}
            {visibleCount < tutors.length && (
                <div className="flex justify-center mt-12">
                    <Button onClick={showMoreTutors} size="lg" variant="bordered" className="rounded-xl px-8 py-3 text-sm font-bold text-black border-zinc-300 dark:border-zinc-700 hover:bg-[#238883] dark:hover:border-teal-400 hover:text-white dark:text-zinc-300 dark:hover:text-teal-400 bg-white dark:bg-zinc-900 shadow-sm transition-all duration-300">
                        View More Tutors
                    </Button>
                </div>
            )}
        </div>
    );
}