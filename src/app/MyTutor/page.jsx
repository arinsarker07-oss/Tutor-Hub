
// export default async function MyTutorPage({params}) {
//     const {id}= await params
//     const res = await fetch(`http://localhost:8000/TutorDetails/${id}`)
//     const initialTutorData = await res.json()
//     console.log(initialTutorData);
    
//     return(
//         <div></div>
//     )
     
// }

"use client";
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

export default function MyTutorPage() {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    // ডেটা ফেচ করার লজিক
    useEffect(() => {
        fetch(`http://localhost:8000/TutorDetails/${id}`) 
            .then(res => res.json())
            .then(data => {
                setTutors(data);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        // এখানে ডিলিট লজিক এবং কনফার্মেশন মোডাল বসাবেন
        alert(`Delete tutor with ID: ${id}`);
    };

    const handleUpdate = (tutor) => {
        // এখানে আপডেট মোডাল ওপেন করার লজিক বসাবেন
        alert(`Update tutor: ${tutor.tutor_name}`);
    };

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <section className="max-w-6xl mx-auto px-4 my-12">
            <h2 className="text-3xl font-bold mb-8 text-zinc-800">My Added Tutors</h2>

            {tutors.length === 0 ? (
                // খালি স্টেট (Empty State)
                <div className="text-center py-20 bg-zinc-50 rounded-3xl border border-dashed border-zinc-300">
                    <p className="text-zinc-500 font-medium">You haven't added any tutors yet.</p>
                    <button className="mt-4 px-6 py-2 bg-[#237888] text-white rounded-lg hover:bg-[#1a5c69] flex items-center gap-2 mx-auto">
                        <FaPlus /> Add Your First Tutor
                    </button>
                </div>
            ) : (
                // টেবিল ভিউ
                <div className="overflow-x-auto shadow-sm border border-zinc-200 rounded-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-zinc-100 text-zinc-600 uppercase text-xs font-bold">
                            <tr>
                                <th className="p-4">Tutor Name</th>
                                <th className="p-4">Subject</th>
                                <th className="p-4">Available</th>
                                <th className="p-4">Fee</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {tutors.map((tutor) => (
                                <tr key={tutor._id} className="hover:bg-zinc-50 transition-colors">
                                    <td className="p-4 font-semibold text-zinc-800">{tutor.tutor_name}</td>
                                    <td className="p-4 text-zinc-600">{tutor.subject_category}</td>
                                    <td className="p-4 text-zinc-600">{tutor.available_days}</td>
                                    <td className="p-4 font-bold text-emerald-600">৳{tutor.hourly_fee}</td>
                                    <td className="p-4 flex gap-3">
                                        <button 
                                            onClick={() => handleUpdate(tutor)}
                                            className="text-blue-500 hover:text-blue-700 transition-colors"
                                            title="Edit"
                                        >
                                            <FaEdit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(tutor._id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                            title="Delete"
                                        >
                                            <FaTrashAlt size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}