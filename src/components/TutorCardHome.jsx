"use client"
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Card, Button, Chip } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaClock, FaBookOpen } from 'react-icons/fa';
import Link from 'next/link';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function TutorCards() {
    const [tutors, setTutors] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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

    const filteredTutors = useMemo(() => {
        let result = tutors;

        if (search.trim() !== '') {
            result = result.filter((tutor) =>
                tutor.tutor_name && tutor.tutor_name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (startDate || endDate) {
            result = result.filter((tutor) => {
                const tutorStart = tutor.session_start_date;
                const tutorEnd = tutor.session_end_date;

                if (!tutorStart || !tutorEnd) return false;

                if (startDate && endDate) {
                    return tutorStart >= startDate && tutorEnd <= endDate;
                }
                if (startDate) {
                    return tutorStart >= startDate;
                }
                if (endDate) {
                    return tutorEnd <= endDate;
                }
                return true;
            });
        }

        return result;
    }, [search, startDate, endDate, tutors]);

    const handleReset = () => {
        setSearch('');
        setStartDate('');
        setEndDate('');
        setVisibleCount(6);
        toast('Rest Successful', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const showMoreTutors = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 6, filteredTutors.length));
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <HashLoader color="#0ee1dd" loading size={80} speedMultiplier={1} />
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto my-6 md:my-10 px-4 relative overflow-visible bg-transparent">
            
            <div className="absolute inset-0 pointer-events-none overflow-visible z-[-1]">
                <div className="absolute left-1/3 top-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[80px] md:blur-[130px] bg-gradient-to-br from-slate-200/40 via-slate-100/10 to-transparent dark:from-teal-600/5 dark:via-blue-500/5" />
            </div>
            {/* find your card  */}
            <div className="text-center mb-6">
                <h2 className="text-xl md:text-4xl font-extrabold text-zinc-800 dark:text-white tracking-tight">
                    Find Your Perfect <span className="text-[#237888] dark:text-teal-400">Expert Tutor</span>
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-xs md:text-base max-w-xl mx-auto">
                    Learn from top university experts with tailored slots and affordable fees.
                </p>
            </div>

            <div className="w-full bg-white dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80 p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-sm backdrop-blur-md mb-6 transition-all duration-300">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 items-end">
                    
                    <div className="flex flex-col space-y-1 w-full text-left col-span-2 sm:col-span-1">
                        <label className="text-[10px] md:text-xs font-bold text-[#237888] dark:text-teal-400 uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-[#237888] dark:bg-teal-400 inline-block"></span>
                            Search Tutor
                        </label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setVisibleCount(6);
                            }}
                            placeholder="Name..."
                            className="w-full px-3 py-2 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-500 shadow-inner transition-all duration-200"
                        />
                    </div>

                    <div className="flex flex-col space-y-1 w-full text-left">
                        <label className="text-[10px] md:text-xs font-bold text-[#237888] dark:text-teal-400 uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-[#237888] dark:bg-teal-400 inline-block"></span>
                            From
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                setVisibleCount(6);
                            }}
                            className="w-full px-3 py-2 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-500 shadow-inner transition-all duration-200 [color-scheme:light] dark:[color-scheme:dark]"
                        />
                    </div>

                    <div className="flex flex-col space-y-1 w-full text-left">
                        <label className="text-[10px] md:text-xs font-bold text-[#237888] dark:text-teal-400 uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-[#237888] dark:bg-teal-400 inline-block"></span>
                            Till
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                                setVisibleCount(6);
                            }}
                            className="w-full px-3 py-2 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-500 shadow-inner transition-all duration-200 [color-scheme:light] dark:[color-scheme:dark]"
                        />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <Button onClick={handleReset} size='md' className="w-full rounded-xl text-xs font-bold  dark:bg-zinc-800 text-white dark:text-zinc-300 h-9">
                            Reset
                        </Button>
                    </div>

                </div>
            </div>

            {filteredTutors.length === 0 && (
                <div className="w-full text-center my-10">
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm md:text-xl p-20 border-2 rounded-xl border-dashed">No tutors found matching the criteria.</p>
                </div>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredTutors.slice(0, visibleCount).map((tutor, index) => (
                        <motion.div
                            key={tutor._id || index}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: (index % 2) * 0.05 }}
                            whileHover={{ y: -4 }}
                            className="h-full"
                        >
                            <Card className="w-full border border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-[#237888]/30 dark:hover:border-teal-500/30 transition-all duration-300 rounded-xl md:rounded-2xl bg-white dark:bg-zinc-900/90 backdrop-blur-md overflow-hidden group flex flex-col p-0 h-full">
                                
                                <div className="relative w-full overflow-hidden bg-slate-50 dark:bg-zinc-800 aspect-square shrink-0">
                                    <Image
                                        src={tutor.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"}
                                        alt={tutor.tutor_name || "Tutor Photo"}
                                        fill
                                        sizes="(max-w-7xl) 50vw, 33vw"
                                        priority={index < 4}
                                        className="object-cover rounded-t-xl md:rounded-t-2xl p-1 md:p-2 group-hover:scale-102 transition-transform duration-500"
                                    />
                                    <div className="absolute top-1.5 right-1.5 z-10">
                                        <Chip size="sm" variant="flat" className="bg-black/60 backdrop-blur-md text-white text-[9px] md:text-xs border-none px-1 py-0.5 rounded-md h-4 md:h-6">
                                            {tutor.teaching_mode || "Both"}
                                        </Chip>
                                    </div>
                                </div>

                                <div className="p-2.5 md:p-5 flex-1 flex flex-col justify-between w-full text-left gap-1.5">
                                    <div>
                                        <div className="flex justify-between items-center gap-1">
                                            <span className="flex items-center gap-1 text-[9px] md:text-xs font-semibold uppercase tracking-wider text-[#237888] dark:text-teal-400 truncate max-w-[65%]">
                                                <FaBookOpen className="text-[8px] md:text-[10px] shrink-0" />
                                                {tutor.subject_category}
                                            </span>
                                            <span className="text-[8px] md:text-xs text-zinc-400 dark:text-zinc-500 font-medium shrink-0">
                                                {tutor.total_slots} Slots
                                            </span>
                                        </div>

                                        <h3 className="text-xs md:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-[#237888] dark:group-hover:text-teal-400 transition-colors duration-200 line-clamp-1 mt-0.5">
                                            {tutor.tutor_name}
                                        </h3>

                                        <p className="flex items-center gap-1 text-[9px] md:text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 min-h-[12px]">
                                            <FaGraduationCap className="text-zinc-400 shrink-0 text-[10px] md:text-sm" />
                                            <span className="line-clamp-1 font-medium">{tutor.institution}</span>
                                        </p>

                                        <hr className="my-1.5 md:my-3.5 border-slate-100 dark:border-zinc-800" />

                                        <div className="space-y-0.5 md:space-y-2">
                                            <p className="flex items-center gap-1 text-[9px] md:text-xs text-zinc-500 dark:text-zinc-400">
                                                <FaClock className="text-zinc-400 text-[10px] md:text-sm shrink-0" />
                                                <span className="line-clamp-1">{tutor.available_days}</span>
                                            </p>

                                            <p className="flex items-center gap-1 text-[9px] md:text-xs text-zinc-500 dark:text-zinc-400">
                                                <FaMapMarkerAlt className="text-zinc-400 text-[10px] md:text-sm shrink-0" />
                                                <span className="line-clamp-1">{tutor.location}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-2 pt-1.5 md:mt-5 md:pt-3 border-t border-slate-100 dark:border-zinc-800/60 w-full gap-1">
                                        <div className="min-w-0">
                                            <p className="text-[8px] md:text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider truncate">Fee/hr</p>
                                            <p className="text-xs md:text-base font-extrabold text-zinc-900 dark:text-white flex items-center truncate">
                                                <span className="text-[10px] md:text-sm font-bold text-emerald-500 mr-0.5">৳</span>
                                                {tutor.hourly_fee}
                                            </p>
                                        </div>
                                        <Link href={`Detail/${tutor._id}`} className="shrink-0">
                                            <Button size="sm" className="rounded-lg md:rounded-xl px-2.5 md:px-4 font-semibold text-[10px] md:text-xs text-white bg-[#237888] hover:bg-[#1a5c69] dark:bg-teal-600 dark:hover:bg-teal-500 h-7 md:h-10 transition-all">
                                                Book
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            {/* all tutor  */}
            <Link href={"/tutors"}>
                <div className="flex justify-center mt-8 md:mt-12">
                    <Button onClick={showMoreTutors} size="md" variant="bordered" className="rounded-xl px-6 py-2 text-xs font-bold border-zinc-300 dark:border-zinc-700 bg-[#5dc5f1] text-black dark:bg-zinc-900 shadow-sm transition-all duration-300">
                        ALL Tutors
                    </Button>
                </div>
            </Link>

        </div>
    );
}