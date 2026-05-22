"use client";
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaPlus, FaTimes, FaBook, FaCalendarAlt, FaMoneyBillWave, FaThLarge, FaExclamationTriangle } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function MyTutorPage() {
    const [tutors, setTutors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [tutorToDelete, setTutorToDelete] = useState(null);

    const { data: session } = authClient.useSession();
    const userEmail = session?.user?.email;

    useEffect(() => {
        if (!userEmail) return;
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors/${userEmail}`)
            .then(res => res.json())
            .then(data => setTutors(data))
            .catch(err => console.error("Error fetching tutors:", err));
    }, [userEmail]);

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-tutor/${selectedTutor._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            if (response?.ok) {
                setIsModalOpen(false);
                
                toast.success("Tutor profile updated......", {
                    position: "top-right",
                    autoClose: 1800,
                    theme: "dark",
                });
                
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                toast.error("Failed to update - check backend route", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                });
            }
        } catch (err) {
            console.error("Error updating tutor:", err);
            toast.error("Something went wrong!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const confirmDelete = () => {
        if (!tutorToDelete) return;

        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/delete-tutor/${tutorToDelete}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    const remaining = tutors.filter(tutor => tutor._id !== tutorToDelete);
                    setTutors(remaining);
                    toast.success("Tutor deleted successfully!", {
                        position: "top-right",
                        autoClose: 2000,
                        theme: "dark",
                    });
                } else {
                    toast.error("Failed to delete tutor!", {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "dark",
                    });
                }
            })
            .catch(err => {
                console.error("Error deleting:", err);
                toast.error("Error deleting tutor!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                });
            })
            .finally(() => {
                setIsDeleteModalOpen(false);
                setTutorToDelete(null);
            });
    };

    const handleDeleteClick = (id) => {
        setTutorToDelete(id);
        setIsDeleteModalOpen(true);
    };

    return (
        <section className="container mx-auto px-4 md:px-6 mb-20 mt-6 md:mt-8">
            <ToastContainer />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900">My Added Tutors</h2>
                    <p className="text-xs text-zinc-500 mt-1">Manage and edit your registered tutors list.</p>
                </div>
                <Link href={"/TutorRegister"} className="w-full sm:w-auto">
                    <button className="w-full flex items-center justify-center gap-2 bg-[#237888] text-white px-5 py-3 sm:py-2.5 rounded-xl hover:bg-[#1a5c69] transition shadow-md font-medium text-sm">
                        <FaPlus size={14} /> Add New Tutor
                    </button>
                </Link>
            </div>

            {tutors.length === 0 ? (
                <div className="text-center py-16 md:py-20 bg-zinc-50 rounded-2xl md:rounded-3xl border-2 border-dashed border-zinc-200 px-4">
                    <p className="text-zinc-500 text-sm md:text-lg">You haven't added any tutors yet.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {tutors.map((tutor) => (
                            <div key={tutor._id} className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm space-y-3.5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-zinc-900 text-base">{tutor.tutor_name}</h3>
                                        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
                                            <FaBook className="text-[#237888]" /> {tutor.subject_category}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { setSelectedTutor(tutor); setIsModalOpen(true); }}
                                            className="text-blue-500 bg-blue-50 p-2.5 rounded-xl transition active:scale-95"
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteClick(tutor._id)} 
                                            className="text-red-500 bg-red-50 p-2.5 rounded-xl transition active:scale-95"
                                        >
                                            <FaTrashAlt size={14} />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-50 text-xs">
                                    <div className="space-y-1">
                                        <p className="text-zinc-400 font-medium flex items-center gap-1"><FaCalendarAlt /> Days</p>
                                        <p className="text-zinc-700 font-semibold truncate">{tutor.available_days}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-zinc-400 font-medium flex items-center gap-1"><FaThLarge /> Total Slots</p>
                                        <p className="text-zinc-800 font-bold">{tutor.total_slots}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2 bg-zinc-50/50 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl">
                                    <span className="text-xs text-zinc-400 font-medium flex items-center gap-1"><FaMoneyBillWave /> Hourly Fee</span>
                                    <span className="font-extrabold text-emerald-600 text-sm">৳{tutor.hourly_fee}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:block overflow-x-auto shadow-sm border border-zinc-100 rounded-3xl">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs tracking-wider font-bold">
                                <tr>
                                    <th className="px-6 py-4">Tutor Name</th>
                                    <th className="px-6 py-4">Subject</th>
                                    <th className="px-6 py-4">Availability</th>
                                    <th className="px-6 py-4">Fee</th>
                                    <th className="px-6 py-4 text-center">Total Slot</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {tutors.map((tutor) => (
                                    <tr key={tutor._id} className="hover:bg-zinc-50/50 transition">
                                        <td className="px-6 py-4 font-semibold text-zinc-900">{tutor.tutor_name}</td>
                                        <td className="px-6 py-4 text-zinc-600">{tutor.subject_category}</td>
                                        <td className="px-6 py-4 text-zinc-600">{tutor.available_days} </td>
                                        <td className="px-6 py-4 font-bold text-emerald-600">৳{tutor.hourly_fee}</td>
                                        <td className="px-6 py-4 font-bold text-[#1D9299] text-center">{tutor.total_slots}</td>
                                        <td className="px-6 py-4 flex justify-center gap-4">
                                            <button
                                                onClick={() => { setSelectedTutor(tutor); setIsModalOpen(true); }}
                                                className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-lg transition"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button onClick={() => handleDeleteClick(tutor._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition">
                                                <FaTrashAlt size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-zinc-900 p-5 md:p-8 rounded-2xl md:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-5 md:mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-white">Edit Tutor Profile</h2>
                            <button
                                onClick={() => !isUpdating && setIsModalOpen(false)}
                                className={`text-zinc-500 hover:text-red-500 transition p-1 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isUpdating}
                            >
                                <FaTimes size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 md:gap-6">
                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500">Full Name</label>
                                <input name="tutor_name" defaultValue={selectedTutor?.tutor_name} className="p-3 text-sm rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#237888]" required disabled={isUpdating} />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500">Profile Photo URL</label>
                                <input name="photo" defaultValue={selectedTutor?.photo} className="p-3 text-sm rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#237888]" required disabled={isUpdating} />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500">Subject Category</label>
                                <input name="subject_category" defaultValue={selectedTutor?.subject_category} className="p-3 text-sm rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#237888]" required disabled={isUpdating} />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500">Hourly Fee (BDT)</label>
                                <input name="hourly_fee" defaultValue={selectedTutor?.hourly_fee} type="number" className="p-3 text-sm rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#237888]" required disabled={isUpdating} />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500">Available Days</label>
                                <input name="available_days" defaultValue={selectedTutor?.available_days} className="p-3 text-sm rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#237888]" required disabled={isUpdating} />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-bold text-zinc-500">Total Slots</label>
                                <input name="total_slots" defaultValue={selectedTutor?.total_slots} type="number" className="p-3 text-sm rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#237888]" required disabled={isUpdating} />
                            </div>

                            <div className="flex flex-col space-y-1.5 sm:col-span-2">
                                <label className="text-xs font-bold text-zinc-500">Location</label>
                                <input name="location" defaultValue={selectedTutor?.location} className="p-3 text-sm rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#237888]" required disabled={isUpdating} />
                            </div>

                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="sm:col-span-2 w-full bg-[#237888] hover:bg-[#1a5c69] disabled:bg-zinc-400 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md mt-2 flex justify-center items-center gap-2"
                            >
                                {isUpdating ? (
                                    <>
                                        <ClipLoader size={16} color="#ffffff" />
                                        <span>Saving Changes...</span>
                                    </>
                                ) : (
                                    <span>Save Changes</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl w-full max-w-md shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="mx-auto bg-red-50 text-red-500 w-12 h-12 rounded-full flex items-center justify-center">
                            <FaExclamationTriangle size={22} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Delete Tutor Profile?</h3>
                            <p className="text-sm text-zinc-500 mt-1">Are you sure you want to delete this tutor? This action cannot be undone.</p>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => { setIsDeleteModalOpen(false); setTutorToDelete(null); }}
                                className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 py-2.5 rounded-xl font-semibold text-sm transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-semibold text-sm transition shadow-md"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}