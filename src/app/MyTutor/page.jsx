"use client";
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

export default function MyTutorPage() {
    const [tutors, setTutors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTutor, setSelectedTutor] = useState(null);

    const { data: session } = authClient.useSession();
    const userEmail = session?.user?.email;

    useEffect(() => {
        if (!userEmail) return;
        fetch(`http://localhost:8000/my-tutors/${userEmail}`)
            .then(res => res.json())
            .then(data => setTutors(data))
            .catch(err => console.error("Error fetching tutors:", err));
    }, [userEmail]);

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData);

        try {
            const response = await fetch(`http://localhost:8000/update-tutor/${selectedTutor._id}`, {
                method: 'PATCH', // Changed to PATCH
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                setIsModalOpen(false);
                window.location.reload(); // Refreshes page to show updated data
            } else {
                console.error("Failed to update - check backend route");
            }
        } catch (err) {
            console.error("Error updating tutor:", err);
        }
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/delete-tutor/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    // ডিলিট সফল হলে স্টেট থেকে ফিল্টার করে ডাটা রিমুভ করা
                    const remaining = tutors.filter(tutor => tutor._id !== id);
                    setTutors(remaining);
                    alert("Tutor deleted successfully!");
                }
            })
            .catch(err => console.error("Error deleting:", err));
    };
    return (
        <section className="container mx-auto px-6 mb-50 mt-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-extrabold text-zinc-900">My Added Tutors</h2>
                <Link href={"/TutorRegister"}>
                    <button className="flex items-center gap-2 bg-[#237888] text-white px-5 py-2 rounded-xl hover:bg-[#1a5c69] transition shadow-lg">
                        <FaPlus /> Add New Tutor
                    </button>
                </Link>
            </div>

            {tutors.length === 0 ? (
                <div className="text-center py-20 bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200">
                    <p className="text-zinc-500 text-lg">You haven't added any tutors yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-sm border border-zinc-100 rounded-3xl">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Tutor Name</th>
                                <th className="px-6 py-4">Subject</th>
                                <th className="px-6 py-4">Availability</th>
                                <th className="px-6 py-4">Fee</th>
                                <th className="px-6 py-4">Total Slot</th>
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
                                    <td className="px-6 py-4 font-bold text-[#1D9299] ">{tutor.total_slots}</td>
                                    <td className="px-6 py-4 flex justify-center gap-4">
                                        <button
                                            onClick={() => { setSelectedTutor(tutor); setIsModalOpen(true); }}
                                            className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-lg transition"
                                        >
                                            <FaEdit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(tutor._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition">
                                            <FaTrashAlt size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">Edit Tutor Profile</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-zinc-500 hover:text-red-500 transition"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-xs font-bold text-zinc-500">Full Name</label>
                                <input name="tutor_name" defaultValue={selectedTutor?.tutor_name} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#237888]" required />
                            </div>

                            {/* Photo URL */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-xs font-bold text-zinc-500">Profile Photo URL</label>
                                <input name="photo" defaultValue={selectedTutor?.photo} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#237888]" required />
                            </div>

                            {/* Subject Category */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-xs font-bold text-zinc-500">Subject Category</label>
                                <input name="subject_category" defaultValue={selectedTutor?.subject_category} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#237888]" required />
                            </div>

                            {/* Hourly Fee */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-xs font-bold text-zinc-500">Hourly Fee (BDT)</label>
                                <input name="hourly_fee" defaultValue={selectedTutor?.hourly_fee} type="number" className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#237888]" required />
                            </div>

                            {/* Available Days */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-xs font-bold text-zinc-500">Available Days</label>
                                <input name="available_days" defaultValue={selectedTutor?.available_days} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#237888]" required />
                            </div>

                            {/* Total Slots */}
                            <div className="flex flex-col space-y-2">
                                <label className="text-xs font-bold text-zinc-500">Total Slots</label>
                                <input name="total_slots" defaultValue={selectedTutor?.total_slots} type="number" className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#237888]" required />
                            </div>

                            {/* Location */}
                            <div className="flex flex-col space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-zinc-500">Location</label>
                                <input name="location" defaultValue={selectedTutor?.location} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 outline-none focus:border-[#237888]" required />
                            </div>

                            {/* Save Button */}
                            <button
                                type="submit"
                                className="md:col-span-2 w-full bg-[#237888] hover:bg-[#1a5c69] text-white py-4 rounded-xl font-bold transition-all shadow-lg"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}