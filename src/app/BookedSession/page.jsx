'use client';

import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { FaTimes, FaUser, FaPhone, FaEnvelope, FaChalkboardTeacher } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BookedSessionsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user.email;

  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user}`)
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((err) => console.error("Error fetching data:", err));
    }
  }, [user]);

  const handleConfirmCancel = async () => {
    if (!selectedId) return;
    const { data: tokenData } = await authClient.token()
    console.log(tokenData);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${selectedId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
        }
      });

      const responseData = await res.json();

      if (res.ok && responseData.success) {
        const updatedBookings = bookings.filter(b => b._id !== selectedId);
        setBookings(updatedBookings);
        setShowModal(false);

        toast.success("Session deleted permanently from database!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
      } else {
        toast.error(responseData.message || "Failed to delete session.", {
          position: "top-right",
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("Failed to connect to the server.", {
        position: "top-right",
        theme: "dark",
      });
    }
  };

  return (
    <div className="container mx-auto py-6 md:py-10 px-4">
      <ToastContainer />
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">Booked Sessions</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-zinc-400">
          <p className="text-xl">No booked sessions found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {bookings.map((item) => (
              <div key={item._id} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3 relative">
                <button
                  onClick={() => { setSelectedId(item._id); setShowModal(true); }}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-1 transition"
                >
                  <FaTimes size={18} />
                </button>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-100 font-bold text-base">
                    <FaUser className="text-gray-400 dark:text-zinc-500 text-sm" />
                    <span>{item.student_name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <FaChalkboardTeacher className="text-[#237888] dark:text-[#2c93a6]" />
                    <span>Tutor: <span className="font-semibold">{item.tutor_name}</span></span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <FaPhone className="text-gray-400 dark:text-zinc-500" />
                    <span>{item.phone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 truncate">
                    <FaEnvelope className="text-gray-400 dark:text-zinc-500" />
                    <span className="truncate">{item.student_email}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-50 dark:border-zinc-800 flex justify-between items-center">
                  <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">Status</span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400">
                    {item.status || "Confirmed"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto shadow-sm rounded-2xl border border-gray-100 dark:border-zinc-800">
            <table className="min-w-full bg-white dark:bg-zinc-900 text-left">
              <thead className="bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Phone</th>
                  <th className="py-4 px-6">Tutor Name</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Cancel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 text-sm text-zinc-700 dark:text-zinc-300">
                {bookings.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/50 transition">
                    <td className="py-4 px-6 font-medium text-zinc-900 dark:text-zinc-100">{item.student_name}</td>
                    <td className="py-4 px-6">{item.phone}</td>
                    <td className="py-4 px-6">{item.tutor_name}</td>
                    <td className="py-4 px-6">{item.student_email}</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400">
                        {item.status || "Confirmed"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => { setSelectedId(item._id); setShowModal(true); }}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition inline-flex items-center justify-center p-1"
                      >
                        <FaTimes size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center space-y-4">
            <div className="mx-auto bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 w-12 h-12 rounded-full flex items-center justify-center">
              <FaTimes size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Confirm Delete</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Are you sure you want to delete this session permanently?</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 py-2.5 rounded-xl font-semibold text-sm transition"
              >
                No
              </button>
              <button
                onClick={handleConfirmCancel}
                className="w-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white py-2.5 rounded-xl font-semibold text-sm transition shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}