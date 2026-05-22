"use client";
import { authClient } from '@/lib/auth-client';
import React from 'react';
import {
  FaUser,
  FaBook,
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaLayerGroup,
  FaUniversity,
  FaBriefcase,
  FaMapMarkerAlt,
  FaLaptopHouse,
  FaCamera,
  FaUserPlus
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TutorRegisterSection() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleTutorSignUp = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const tutorData = {
      tutor_name: formData.get('tutor_name'),
      photo: formData.get('photo'),
      subject_category: formData.get('subject_category'),
      available_days: formData.get('available_days'),
      available_time_slot: formData.get('available_time_slot'),
      hourly_fee: Number(formData.get('hourly_fee')),
      total_slots: Number(formData.get('total_slots')),
      session_start_date: formData.get('session_start_date'),
      session_end_date: formData.get('session_end_date'),
      institution: formData.get('institution'),
      experience: formData.get('experience'),
      location: formData.get('location'),
      teaching_mode: formData.get('teaching_mode'),
      user_email: user?.email,
    };

    try {
      const res = await fetch('http://localhost:8000/TutorDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tutorData)
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Registration Successful!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        form.reset();
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to register. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 my-8 md:my-16 relative">
      <ToastContainer />
      <div className="absolute right-0 top-0 w-60 h-60 md:w-80 md:h-80 rounded-full bg-[#237888]/5 blur-[100px] md:blur-[120px] pointer-events-none" />

      <div className="text-center mb-6 md:mb-10">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#237888] dark:text-teal-400 bg-[#237888]/10 dark:bg-teal-500/10 px-2.5 py-1 rounded-full">
          Join As A Tutor
        </span>
        <h2 className="text-xl md:text-4xl font-extrabold bg-gradient-to-r from-[#0B253A] to-[#1D9299] bg-clip-text text-transparent dark:text-white tracking-tight mt-2 md:mt-3">
          Create Your Professional Profile
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-xs md:text-sm max-w-md mx-auto px-2">
          Fill in your teaching details to start receiving session booking requests from students nationwide.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl md:rounded-3xl p-5 md:p-10 shadow-sm">
        <form onSubmit={handleTutorSignUp} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Full Name</label>
              <div className="relative flex items-center">
                <FaUser className="absolute left-4 text-zinc-400 text-xs md:text-sm" />
                <input
                  type="text"
                  name="tutor_name"
                  required
                  placeholder="e.g., Imran Hossen"
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Profile Photo URL</label>
              <div className="relative flex items-center">
                <FaCamera className="absolute left-4 text-zinc-400 text-xs md:text-sm" />
                <input
                  type="url"
                  name="photo"
                  required
                  placeholder="e.g., https://images.unsplash.com/photo-..."
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Subject Category</label>
              <div className="relative flex items-center">
                <FaBook className="absolute left-4 text-zinc-400 text-xs md:text-sm" />
                <input
                  type="text"
                  name="subject_category"
                  required
                  placeholder="e.g., Economics"
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Available Days</label>
              <div className="relative flex items-center">
                <FaCalendarAlt className="absolute left-4 text-zinc-400 text-xs md:text-sm" />
                <input
                  type="text"
                  name="available_days"
                  required
                  placeholder="e.g., Sat - Mon - Wed"
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Available Time Slot</label>
              <div className="relative flex items-center">
                <FaClock className="absolute left-4 text-zinc-400 text-xs md:text-sm" />
                <input
                  type="text"
                  name="available_time_slot"
                  required
                  placeholder="e.g., 4:00 PM - 6:00 PM"
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Hourly Fee (BDT)</label>
              <div className="relative flex items-center">
                <FaDollarSign className="absolute left-4 text-zinc-400 text-xs md:text-sm" />
                <input
                  type="number"
                  name="hourly_fee"
                  required
                  placeholder="e.g., 400"
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Total Available Slots</label>
              <div className="relative flex items-center">
                <FaLayerGroup className="absolute left-4 text-zinc-400 text-xs md:text-sm" />
                <input
                  type="number"
                  name="total_slots"
                  required
                  placeholder="e.g., 50"
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Session Start Date</label>
              <div className="relative flex items-center">
                <FaCalendarAlt className="absolute left-4 text-zinc-400 text-xs md:text-sm" />
                <input
                  type="date"
                  name="session_start_date"
                  required
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Educational Institution</label>
              <div className="relative flex items-center">
                <FaUniversity className="absolute left-4 text-zinc-400 text-xs md:text-sm" />
                <input
                  type="text"
                  name="institution"
                  required
                  placeholder="e.g., Rajshahi University (RU)"
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Session End Date</label>
              <div className="relative flex items-center">
                <FaCalendarAlt className="absolute left-4 text-zinc-400 text-xs md:text-sm" />
                <input
                  type="date"
                  name="session_end_date"
                  required
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Tutoring Experience</label>
              <div className="relative flex items-center">
                <FaBriefcase className="absolute left-4 text-zinc-400 text-xs md:text-sm" />
                <input
                  type="text"
                  name="experience"
                  required
                  placeholder="e.g., 2 Years Private Tutoring"
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Location</label>
              <div className="relative flex items-center">
                <FaMapMarkerAlt className="absolute left-4 text-zinc-400 text-xs md:text-sm" />
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="e.g., Kazla, Rajshahi"
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Teaching Mode</label>
              <div className="relative flex items-center">
                <FaLaptopHouse className="absolute left-4 text-zinc-400 text-xs md:text-sm" />
                <select
                  name="teaching_mode"
                  required
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors appearance-none cursor-pointer"
                >
                  <option value="Offline" className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white">Offline</option>
                  <option value="Online" className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white">Online</option>
                  <option value="Hybrid" className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white">Hybrid</option>
                </select>
              </div>
            </div>

          </div>

          <div className="pt-2 md:pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-[#237888] hover:bg-[#1a5c69] dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-xs md:text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 group"
            >
              Register Profile
              <FaUserPlus className="text-xs md:text-sm group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}