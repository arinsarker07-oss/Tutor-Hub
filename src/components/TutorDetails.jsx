"use client"
import React, { useState } from "react";
import Image from "next/image";
import {
    FaCalendarAlt,
    FaClock,
    FaGraduationCap,
    FaBriefcase,
    FaMapMarkerAlt,
    FaLaptop,
    FaUser,
    FaPhone,
    FaEnvelope,
    FaCheckCircle,
    FaTimes
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const TutorDetails = ({ initialTutorData }) => {
    const {
        data: session,
    } = authClient.useSession()
    const user = session?.user

    const [tutor, setTutor] = useState(initialTutorData);
    const [isOpen, setIsOpen] = useState(false);

    const handleBooking = async () => {
        const bookingData = {
        student_email: user.email,
        tutor_name: tutor.tutor_name,
        tutor_id: tutor._id,
        student_name: studentName,
        phone: phone,
        booking_date: new Date()
    };
        console.log(bookingData);

        const res = await fetch("http://localhost:8000/booking",{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(bookingData)
        })
        const data = await res.json()
        console.log(data);
        


    }


    const [studentName, setStudentName] = useState("");
    const [phone, setPhone] = useState("");
    const loggedInUserEmail = "student@example.com";

  
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

   
    const handleBookingClick = () => {
        const currentDate = new Date("2026-05-20");
        const sessionStartDate = new Date(tutor.session_start_date);

        if (tutor.total_slots === 0) {
            setAlertType("error");
            setAlertMessage("No available slots left.");
            return;
        }

        if (currentDate < sessionStartDate) {
            setAlertType("error");
            setAlertMessage("Booking is not available yet for this tutor");
            return;
        }

        setAlertMessage("");
        setIsOpen(true);
    };

    const handleConfirmBooking = (e) => {
        e.preventDefault();

        if (!studentName || !phone) return;

        setTutor(prevTutor => {
            const updatedSlots = prevTutor.total_slots - 1;

            if (updatedSlots === 0) {
                setAlertType("error");
                setAlertMessage("This session is fully booked. You can’t join at the moment.");
            } else {
                setAlertType("success");
                setAlertMessage(`Booking Successful! Status: Confirmed. Remaining slots: ${updatedSlots}`);
            }

            return { ...prevTutor, total_slots: updatedSlots };
        });

        setStudentName("");
        setPhone("");
        setIsOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto">

              
                {alertMessage && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-medium border shadow-sm flex items-center gap-2 transition-all ${alertType === "error"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-teal-50 text-teal-800 border-teal-200"
                        }`}>
                        <span>{alertMessage}</span>
                    </div>
                )}

              
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden w-full">
                    <div className="flex flex-col md:flex-row w-full min-h-[450px]">

               
                        <div className="w-full md:w-5/12 relative min-h-[300px] md:min-h-[450px] bg-gray-100">
                            <Image
                                src={tutor.photo}
                                alt={tutor.tutor_name}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-w-768px) 100vw, 40vw"
                            />
                            <span className="absolute top-4 left-4 bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm z-10">
                                {tutor.teaching_mode}
                            </span>
                        </div>

                     
                        <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between bg-white">
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-teal-600 font-bold tracking-wider uppercase text-xs">
                                        {tutor.subject_category}
                                    </span>
                                    <span className="text-gray-500 text-xs font-semibold bg-gray-100 px-2.5 py-1 rounded-md">
                                        {tutor.total_slots} Slots Available
                                    </span>
                                </div>

                                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">{tutor.tutor_name}</h1>
                                <div className="flex items-center gap-2 text-gray-600 mb-6 text-sm font-medium">
                                    <FaGraduationCap className="text-teal-600 text-base" />
                                    <span>{tutor.institution}</span>
                                </div>

                                <hr className="border-gray-100 mb-5" />

                          
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-gray-600 mb-6">
                                    <div className="flex items-start gap-2.5">
                                        <FaBriefcase className="text-teal-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Experience</p>
                                            <p className="font-semibold text-slate-700">{tutor.experience}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2.5">
                                        <FaMapMarkerAlt className="text-teal-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Location</p>
                                            <p className="font-semibold text-slate-700">{tutor.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2.5">
                                        <FaCalendarAlt className="text-teal-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Available Days</p>
                                            <p className="font-semibold text-slate-700">{tutor.available_days}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2.5">
                                        <FaClock className="text-teal-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Time Slot</p>
                                            <p className="font-semibold text-slate-700">{tutor.available_time_slot}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2.5 sm:col-span-2">
                                        <FaLaptop className="text-teal-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Session Timeline</p>
                                            <p className="font-semibold text-slate-700">
                                                {tutor.session_start_date} to {tutor.session_end_date}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100 mb-5" />

                        
                            <div className="flex items-center justify-between mt-auto pt-2">
                                <div>
                                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Hourly Fee</p>
                                    <p className="text-2xl font-bold text-slate-800 flex items-center">
                                        ৳ {tutor.hourly_fee}<span className="text-xs text-gray-400 font-normal">/hr</span>
                                    </p>
                                </div>

                                <button
                                    onClick={handleBookingClick}
                                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition-all"
                                >
                                    Book Session
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

             
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                   
                        <div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                            onClick={() => setIsOpen(false)}
                        ></div>

                  
                        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl z-10 overflow-hidden border border-gray-100 transition-all transform scale-100">
                            <form onSubmit={handleConfirmBooking}>

                      
                                <div className="flex justify-between items-center text-xl font-bold text-slate-800 border-b border-gray-100 px-6 py-4">
                                    <h2>Confirm Your Booking</h2>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors"
                                    >
                                        <FaTimes className="text-lg" />
                                    </button>
                                </div>

                            
                                <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">

                        
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Tutor ID</label>
                                        <input
                                            type="text"
                                            value={tutor._id}
                                            disabled
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm outline-none"
                                        />
                                    </div>

                              
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Tutor Name</label>
                                        <input
                                            type="text"
                                            value={tutor.tutor_name}
                                            disabled
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Your Email</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                                <FaEnvelope />
                                            </span>
                                            <input
                                                type="email"
                                                value={loggedInUserEmail}
                                                disabled
                                                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm outline-none"
                                            />
                                        </div>
                                    </div>

                         
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Your Name <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                                <FaUser />
                                            </span>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Enter your full name"
                                                value={studentName}
                                                onChange={(e) => setStudentName(e.target.value)}
                                                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-slate-800 text-sm outline-none focus:border-teal-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                               
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                                <FaPhone />
                                            </span>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="Enter your phone number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-slate-800 text-sm outline-none focus:border-teal-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                               
                                    <div className="flex items-center gap-2 mt-1 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg text-xs font-semibold border border-emerald-100 w-fit">
                                        <FaCheckCircle />
                                        <span>Booking Status: Auto-Confirmed</span>
                                    </div>
                                </div>

                        
                                <div className="border-t border-gray-100 px-6 py-4 flex justify-end gap-3 bg-gray-50/50">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleBooking}
                                        type="submit"
                                        className="px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition-colors"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default TutorDetails;