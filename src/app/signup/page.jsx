import React from 'react';
import { FaUser, FaEnvelope, FaCamera, FaGoogle, FaUserPlus } from 'react-icons/fa';
import PasswordShow from '@/components/Passwordshow';

export default function UserSignUpSection() {
  async function handleUserSignUp(formData) {
    'use server';

    const name = formData.get('name');
    const email = formData.get('email');
    const photo = formData.get('photo');
    const password = formData.get('password');

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !isLongEnough) {
      console.error("Registration Denied: Password criteria not met.");
      return;
    }

    console.log("Success! Registering User:", { name, email, photo, password });
  }

  return (
    <section className="w-full max-w-md mx-auto px-4 my-16 relative">
      <div className="absolute left-0 top-0 w-72 h-72 rounded-full bg-[#237888]/5 blur-[100px] pointer-events-none" />
      
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#237888] dark:text-teal-400 bg-[#237888]/10 dark:bg-teal-500/10 px-3 py-1 rounded-full">
          Get Started
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold  bg-gradient-to-l from-[#0B253A] to-[#1D9299] bg-clip-text text-transparent dark:text-white tracking-tight mt-3">
          Create Your Account
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-xs">
          Join TutorHub today to explore certified educators or manage your teaching schedule.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
        
        <form action={handleUserSignUp} className="space-y-4">
          
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Full Name</label>
            <div className="relative flex items-center group">
              <FaUser className="absolute left-4 text-[#237888] dark:text-teal-400 text-sm" />
              <input 
                type="text" 
                name="name"
                required
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Email Address</label>
            <div className="relative flex items-center group">
              <FaEnvelope className="absolute left-4 text-[#237888] dark:text-teal-400 text-sm" />
              <input 
                type="email" 
                name="email"
                required
                placeholder="johndoe@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Avatar Photo URL</label>
            <div className="relative flex items-center group">
              <FaCamera className="absolute left-4 text-[#237888] dark:text-teal-400 text-sm" />
              <input 
                type="url" 
                name="photo"
                required
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-all"
              />
            </div>
          </div>

          {/* Secure Password Field calling the dynamic client child */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Secure Password</label>
            
            <PasswordShow />
            
            <div className="bg-zinc-50 dark:bg-zinc-800/30 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/80 mt-1">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Security Requirements:</p>
              <ul className="text-[11px] text-zinc-500 dark:text-zinc-400 space-y-0.5 list-disc pl-4">
                <li>At least **6 total characters**</li>
                <li>Minimum **1 Uppercase letter** (A-Z)</li>
                <li>Minimum **1 Lowercase letter** (a-z)</li>
              </ul>
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              className="w-full py-3 bg-[#237888] hover:bg-[#1a5c69] dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 group"
            >
              Sign Up Now
              <FaUserPlus className="text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-zinc-100 dark:border-zinc-800"></div>
          <span className="flex-shrink mx-3 text-zinc-400 font-bold text-[9px] uppercase tracking-wider">Or Connect With</span>
          <div className="flex-grow border-t border-zinc-100 dark:border-zinc-800"></div>
        </div>

        <div>
          <form action={async () => { 'use server'; }}>
            <button 
              type="submit"
              className="w-full py-3 px-4 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2.5 group"
            >
              <FaGoogle className="text-red-500 group-hover:scale-110 transition-transform duration-200" />
              Continue with Google
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}