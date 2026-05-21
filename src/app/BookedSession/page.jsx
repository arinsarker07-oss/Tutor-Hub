'use client';

import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function BookedSessionsPage() {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const email = "arinsarker07@gmail.com";

  useEffect(() => {
    fetch(`http://localhost:8000/booking/${email}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, [email]);

  // শুধুমাত্র ফ্রন্টএন্ডে স্ট্যাটাস আপডেট করার ফাংশন
  const handleConfirmCancel = () => {
    const updatedBookings = bookings.map(b => 
      b._id === selectedId ? { ...b, status: 'cancelled' } : b
    );
    setBookings(updatedBookings);
    setShowModal(false); // মোডাল বন্ধ করে দিন
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Booked Sessions</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">No booked sessions found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full bg-white text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Tutor Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{item.student_name}</td>
                  <td className="py-4 px-6">{item.phone}</td>
                  <td className="py-4 px-6">{item.tutor_name}</td>
                  <td className="py-4 px-6">{item.student_email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${item.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {item.status || "Confirmed"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {item.status !== 'cancelled' && (
                      <button 
                        onClick={() => { setSelectedId(item._id); setShowModal(true); }}
                        className="text-red-500 hover:text-red-700 text-xl"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* কনফার্মেশন মোডাল */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to cancel this session?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold">
                No
              </button>
              <button onClick={handleConfirmCancel} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold">
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}