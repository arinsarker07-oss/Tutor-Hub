"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaAward, 
  FaBookOpen, 
  FaShieldAlt, 
  FaRegClock, 
  FaThumbsUp, 
  FaLightbulb 
} from 'react-icons/fa';

export default function ExtraSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div className="w-full bg-transparent overflow-x-hidden">
      
      <section className="w-full max-w-7xl mx-auto px-4 my-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-r from-[#237888] to-[#1a5c69] dark:from-zinc-900 dark:to-zinc-900/80 p-8 md:p-10 rounded-3xl shadow-xl text-white border border-transparent dark:border-zinc-800"
        >
          
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-2">
            <div className="p-3 bg-white/10 rounded-2xl mb-3">
              <FaUserGraduate className="text-2xl md:text-3xl text-teal-300" />
            </div>
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">10,000+</h3>
            <p className="text-xs md:text-sm text-teal-100/80 font-medium mt-1">Successful Students</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-2">
            <div className="p-3 bg-white/10 rounded-2xl mb-3">
              <FaChalkboardTeacher className="text-2xl md:text-3xl text-teal-300" />
            </div>
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">1,500+</h3>
            <p className="text-xs md:text-sm text-teal-100/80 font-medium mt-1">Certified Tutors</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-2">
            <div className="p-3 bg-white/10 rounded-2xl mb-3">
              <FaAward className="text-2xl md:text-3xl text-teal-300" />
            </div>
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">98%</h3>
            <p className="text-xs md:text-sm text-teal-100/80 font-medium mt-1">Satisfaction Rate</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-2">
            <div className="p-3 bg-white/10 rounded-2xl mb-3">
              <FaBookOpen className="text-2xl md:text-3xl text-teal-300" />
            </div>
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">50+</h3>
            <p className="text-xs md:text-sm text-teal-100/80 font-medium mt-1">Academic Subjects</p>
          </motion.div>

        </motion.div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-4 my-20 relative overflow-visible">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute right-0 top-10 w-80 h-80 rounded-full bg-teal-500/5 blur-[100px] pointer-events-none" 
        />

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#237888] dark:text-teal-400 bg-[#237888]/10 dark:bg-teal-500/10 px-3 py-1 rounded-full">
            Our Features
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-l from-[#0B253A] to-[#1D9299] bg-clip-text text-transparent dark:text-white tracking-tight mt-3">
            Why Choose Our TutorHub
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm md:text-base max-w-lg mx-auto">
            We provide the best features to ensure student security and quality education.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02, borderColor: "rgb(16, 185, 129)" }}
            className="p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-sm rounded-2xl transition-colors duration-300 flex flex-col items-start text-left group cursor-pointer"
          >
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-xl mb-4 group-hover:rotate-6 transition-transform duration-300">
              <FaShieldAlt className="text-xl" />
            </div>
            <h4 className="text-base font-bold text-zinc-800 dark:text-white">100% Verified Tutors</h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 leading-relaxed">
              Every tutor's national identity card and university credentials are strictly verified.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02, borderColor: "rgb(59, 130, 246)" }}
            className="p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-sm rounded-2xl transition-colors duration-300 flex flex-col items-start text-left group cursor-pointer"
          >
            <div className="p-3.5 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-xl mb-4 group-hover:rotate-6 transition-transform duration-300">
              <FaRegClock className="text-xl" />
            </div>
            <h4 className="text-base font-bold text-zinc-800 dark:text-white">Flexible Time Slots</h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 leading-relaxed">
              Easily book learning slots according to your convenient days and daily routine.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02, borderColor: "rgb(168, 85, 247)" }}
            className="p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-sm rounded-2xl transition-colors duration-300 flex flex-col items-start text-left group cursor-pointer"
          >
            <div className="p-3.5 bg-purple-50 dark:bg-purple-500/10 text-purple-500 rounded-xl mb-4 group-hover:rotate-6 transition-transform duration-300">
              <FaThumbsUp className="text-xl" />
            </div>
            <h4 className="text-base font-bold text-zinc-800 dark:text-white">Affordable & Fixed Fees</h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 leading-relaxed">
              Direct booking based on hourly budgets or fixed monthly fees with zero hidden charges.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02, borderColor: "rgb(245, 158, 11)" }}
            className="p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-sm rounded-2xl transition-colors duration-300 flex flex-col items-start text-left group cursor-pointer"
          >
            <div className="p-3.5 bg-amber-50 dark:bg-amber-500/10 text-amber-500 rounded-xl mb-4 group-hover:rotate-6 transition-transform duration-300">
              <FaLightbulb className="text-xl" />
            </div>
            <h4 className="text-base font-bold text-zinc-800 dark:text-white">Multiple Teaching Modes</h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 leading-relaxed">
              Enjoy the total freedom to choose between live online classes or face-to-face home tutoring.
            </p>
          </motion.div>

        </motion.div>
      </section>

    </div>
  );
}