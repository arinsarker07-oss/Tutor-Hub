"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCamera, FaUserPlus, } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import PasswordShow from '@/components/Passwordshow';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';

export default function UserSignUpSection() {
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

  const handleSignUpClick = async(e) => {

    const { name, email, photo, password } = formData;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !isLongEnough) {
      alert("Password criteria not met!");
      return;
    }
    e.preventDefault();
        const { data, error } = await authClient.signUp.email({
        email: email,
        password: password,
        name: name,
        image: photo
    })
    if (data) {
      redirect("/")
    }
    if (error) {
      // "toast"
    }
    console.log({data,error});
    
    console.log("Success! Registering User Data:", { name, email, photo, password });
    alert("Check Console! Data printed successfully.");
  };
      const GoogleSignUp = async () => {
          const data = await authClient.signIn.social({
              provider: "google",
          });
      };

  const formContainerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08,
        when: "beforeChildren"
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 120 }
    }
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-0 top-0 w-72 h-72 rounded-full bg-[#237888]/5 blur-[100px] pointer-events-none"
      />



      <motion.div
        variants={formContainerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/95 mb-16 dark:bg-zinc-900/95 backdrop-blur-md border border-slate-100 dark:border-zinc-800 rounded-2xl p-5 md:p-6 shadow-xl shadow-slate-100/40 dark:shadow-none space-y-4"
      >

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#237888] dark:text-teal-400 bg-[#237888]/10 dark:bg-teal-500/10 px-3 py-1 rounded-full">
            Get Started
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-l from-[#0B253A] to-[#1D9299] bg-clip-text text-transparent dark:text-white tracking-tight mt-3">
            Create Your Account
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-xs">
            Join TutorHub today to explore certified educators or manage your teaching schedule.
          </p>
        </motion.div>
        <form onSubmit={handleSignUpClick} className="space-y-4">

          <motion.div variants={inputVariants} className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Full Name</label>
            <div className="relative flex items-center group">
              <FaUser className="absolute left-4 text-[#237888] dark:text-teal-400 text-sm" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your Name"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-all"
              />
            </div>
          </motion.div>

          <motion.div variants={inputVariants} className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Email Address</label>
            <div className="relative flex items-center group">
              <FaEnvelope className="absolute left-4 text-[#237888] dark:text-teal-400 text-sm" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-all"
              />
            </div>
          </motion.div>

          <motion.div variants={inputVariants} className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Avatar Photo URL</label>
            <div className="relative flex items-center group">
              <FaCamera className="absolute left-4 text-[#237888] dark:text-teal-400 text-sm" />
              <input
                type="url"
                name="photo"
                required
                value={formData.photo}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-all"
              />
            </div>
          </motion.div>

          <motion.div variants={inputVariants} className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Secure Password</label>
            <PasswordShow
              value={formData.password}
              onChange={handleChange}
            />
            <div className="bg-zinc-50  p-2 rounded-xl  mt-1 flex">
              <p className=" font-bold text-zinc-400 text-sm mb-1">Must be :Min 6 chars,1 Uppercase & 1 Lowercase</p>
            </div>
          </motion.div>

          <motion.div variants={inputVariants} >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-[#237888] hover:bg-[#1a5c69] dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 group"
            >
              Sign Up Now
              <FaUserPlus className="text-sm group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.button>
          </motion.div>
        </form>

        <motion.div variants={inputVariants} >
          <p className='text-center font-bold'>OR</p>
        </motion.div>

        <motion.div variants={inputVariants}>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => console.log("Google Auth Triggered")}
            className="w-full py-3 px-4 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2.5 group"
          >
            <p onClick={GoogleSignUp} className='flex gap-3 justify-center items-center  '>
              <FcGoogle />
              Sign up with Google
            </p>
          </motion.button>
        </motion.div>

      </motion.div>
    </section>
  );
}