"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCamera, FaUserPlus } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import PasswordShow from '@/components/Passwordshow';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function UserSignUpSection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photo: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpClick = async (e) => {
    e.preventDefault();

    const { name, email, photo, password } = formData;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !isLongEnough) {
      toast.error("Password criteria not met! Check requirements below.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    const { data, error } = await authClient.signUp.email({
      email: email,
      password: password,
      name: name,
      image: photo
    });

    if (data) {
      toast.success("Account Created Successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      router.push("/");
    }

    if (error) {
      toast.error(error.message || "Registration Failed. Try again!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  const GoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/"
      });
    } catch (error) {
      toast.error("Google Sign-Up Failed!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  const formContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 130 }
    }
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 min-h-fit md:min-h-[calc(100vh-140px)] flex items-center justify-center relative py-6 md:py-10">
      <motion.div
        variants={formContainerVariants}
        initial="hidden"
        animate="visible"
        className="w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 md:p-6 shadow-xl dark:shadow-none space-y-3.5 md:space-y-4 relative z-10"
      >

        <form onSubmit={handleSignUpClick} className="space-y-3 md:space-y-4">
          <motion.div variants={inputVariants} className="flex flex-col space-y-1">
            <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">Full Name</label>
            <div className="relative flex items-center group">
              <FaUser className="absolute left-4 text-[#237888] dark:text-teal-400 text-xs md:text-sm" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your Name"
                className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-all"
              />
            </div>
          </motion.div>

          <motion.div variants={inputVariants} className="flex flex-col space-y-1">
            <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">Email Address</label>
            <div className="relative flex items-center group">
              <FaEnvelope className="absolute left-4 text-[#237888] dark:text-teal-400 text-xs md:text-sm" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-all"
              />
            </div>
          </motion.div>

          <motion.div variants={inputVariants} className="flex flex-col space-y-1">
            <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">Avatar Photo URL</label>
            <div className="relative flex items-center group">
              <FaCamera className="absolute left-4 text-[#237888] dark:text-teal-400 text-xs md:text-sm" />
              <input
                type="url"
                name="photo"
                required
                value={formData.photo}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full pl-10 pr-4 py-2.5 md:py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-all"
              />
            </div>
          </motion.div>

          <motion.div variants={inputVariants} className="flex flex-col space-y-1">
            <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">Secure Password</label>
            <PasswordShow
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            />
            <div className="bg-zinc-50 dark:bg-zinc-800/30 p-2 rounded-xl mt-1 flex">
              <p className="font-bold text-zinc-400 text-[10px] md:text-[11px]">Must be: Min 6 chars, 1 Uppercase & 1 Lowercase</p>
            </div>
          </motion.div>

          <motion.div variants={inputVariants} className="pt-1">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 md:py-3 bg-[#237888] hover:bg-[#1a5c69] dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-xs md:text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Sign Up Now</span>
              <FaUserPlus className="text-xs md:text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.button>
          </motion.div>
        </form>

        <motion.div variants={inputVariants}>
          <p className='text-center font-bold text-xs md:text-sm'>OR</p>
        </motion.div>

        <motion.div variants={inputVariants}>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={GoogleSignUp}
            className="w-full py-2.5 md:py-3 px-4 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 font-bold text-xs md:text-sm rounded-xl transition-colors flex items-center justify-center gap-2.5"
          >
            <div className='flex gap-2.5 justify-center items-center'>
              <FcGoogle className="text-sm md:text-base" />
              <span>Sign up with Google</span>
            </div>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}