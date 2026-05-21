"use client";

import React, { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PasswordShow({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex items-center group w-full">
      <FaLock className="absolute left-4 text-[#237888] dark:text-teal-400 text-sm z-10" />
      
      <input 
        type={showPassword ? "text" : "password"} 
        name="password"
        required
        value={value}         
        onChange={onChange}   
        placeholder="Enter your password"
        className="w-full pl-11 pr-12 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-all ring-0 focus:ring-2 focus:ring-[#237888]/20 dark:focus:ring-teal-400/20"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-8 text-zinc-400 hover:text-[#237888] dark:hover:text-teal-400 p-1 transition-colors outline-none"
      >
        {showPassword ? <FaEye className="text-sm" />:<FaEyeSlash className="text-sm" />}
      </button>
    </div>
  );
}