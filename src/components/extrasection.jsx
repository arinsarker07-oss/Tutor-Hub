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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div id="about-section" className="w-full bg-transparent overflow-x-hidden">
      
      <section className="w-full max-w-7xl mx-auto px-4 my-8 md:my-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 bg-gradient-to-r from-[#237888] to-[#1a5c69] dark:from-zinc-900 dark:to-zinc-900/80 p-5 md:p-10 rounded-2xl md:rounded-3xl shadow-xl text-white border border-transparent dark:border-zinc-800"
        >
          
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-1">
            <div className="p-2 md:p-3 bg-white/10 rounded-xl mb-1.5">
              <FaUserGraduate className="text-xl md:text-3xl text-teal-300" />
            </div>
            <h3 className="text-xl md:text-4xl font-extrabold tracking-tight">10,000+</h3>
            <p className="text-[10px] md:text-sm text-teal-100/80 font-medium mt-0.5">Successful Students</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-1">
            <div className="p-2 md:p-3 bg-white/10 rounded-xl mb-1.5">
              <FaChalkboardTeacher className="text-xl md:text-3xl text-teal-300" />
            </div>
            <h3 className="text-xl md:text-4xl font-extrabold tracking-tight">1,500+</h3>
            <p className="text-[10px] md:text-sm text-teal-100/80 font-medium mt-0.5">Certified Tutors</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-1">
            <div className="p-2 md:p-3 bg-white/10 rounded-xl mb-1.5">
              <FaAward className="text-xl md:text-3xl text-teal-300" />
            </div>
            <h3 className="text-xl md:text-4xl font-extrabold tracking-tight">98%</h3>
            <p className="text-[10px] md:text-sm text-teal-100/80 font-medium mt-0.5">Satisfaction Rate</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-1">
            <div className="p-2 md:p-3 bg-white/10 rounded-xl mb-1.5">
              <FaBookOpen className="text-xl md:text-3xl text-teal-300" />
            </div>
            <h3 className="text-xl md:text-4xl font-extrabold tracking-tight">50+</h3>
            <p className="text-[10px] md:text-sm text-teal-100/80 font-medium mt-0.5">Academic Subjects</p>
          </motion.div>

        </motion.div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-4 my-10 md:my-20 relative overflow-visible">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute right-0 top-10 w-40 h-40 md:w-80 md:h-80 rounded-full bg-teal-500/5 blur-[60px] md:blur-[100px] pointer-events-none" 
        />

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#237888] dark:text-teal-400 bg-[#237888]/10 dark:bg-teal-500/10 px-2.5 py-0.5 md:py-1 rounded-full">
            Our Features
          </span>
          <h2 className="text-xl md:text-4xl font-extrabold bg-gradient-to-l from-[#0B253A] to-[#1D9299] bg-clip-text text-transparent dark:text-white tracking-tight mt-2">
            Why Choose Our TutorHub
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-xs md:text-base max-w-lg mx-auto">
            We provide the best features to ensure student security and quality education.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8"
        >
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.01, borderColor: "rgb(16, 185, 129)" }}
            className="p-4 md:p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-sm rounded-xl md:rounded-2xl transition-colors duration-300 flex flex-col items-start text-left group cursor-pointer"
          >
            <div className="p-2 md:p-3.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-lg md:rounded-xl mb-2.5 md:mb-4 group-hover:rotate-6 transition-transform duration-300">
              <FaShieldAlt className="text-base md:text-xl" />
            </div>
            <h4 className="text-xs md:text-base font-bold text-zinc-800 dark:text-white">100% Verified</h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-[10px] md:text-xs mt-1 leading-relaxed">
              Every tutor's identity and credentials are strictly verified.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.01, borderColor: "rgb(59, 130, 246)" }}
            className="p-4 md:p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-sm rounded-xl md:rounded-2xl transition-colors duration-300 flex flex-col items-start text-left group cursor-pointer"
          >
            <div className="p-2 md:p-3.5 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-lg md:rounded-xl mb-2.5 md:mb-4 group-hover:rotate-6 transition-transform duration-300">
              <FaRegClock className="text-base md:text-xl" />
            </div>
            <h4 className="text-xs md:text-base font-bold text-zinc-800 dark:text-white">Flexible Slots</h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-[10px] md:text-xs mt-1 leading-relaxed">
              Book learning slots according to your convenient routine.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.01, borderColor: "rgb(168, 85, 247)" }}
            className="p-4 md:p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-sm rounded-xl md:rounded-2xl transition-colors duration-300 flex flex-col items-start text-left group cursor-pointer"
          >
            <div className="p-2 md:p-3.5 bg-purple-50 dark:bg-purple-500/10 text-purple-500 rounded-lg md:rounded-xl mb-2.5 md:mb-4 group-hover:rotate-6 transition-transform duration-300">
              <FaThumbsUp className="text-base md:text-xl" />
            </div>
            <h4 className="text-xs md:text-base font-bold text-zinc-800 dark:text-white">Fixed Fees</h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-[10px] md:text-xs mt-1 leading-relaxed">
              Direct booking based on budgets with zero hidden charges.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.01, borderColor: "rgb(245, 158, 11)" }}
            className="p-4 md:p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-sm rounded-xl md:rounded-2xl transition-colors duration-300 flex flex-col items-start text-left group cursor-pointer"
          >
            <div className="p-2 md:p-3.5 bg-amber-50 dark:bg-amber-500/10 text-amber-500 rounded-lg md:rounded-xl mb-2.5 md:mb-4 group-hover:rotate-6 transition-transform duration-300">
              <FaLightbulb className="text-base md:text-xl" />
            </div>
            <h4 className="text-xs md:text-base font-bold text-zinc-800 dark:text-white">Teaching Modes</h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-[10px] md:text-xs mt-1 leading-relaxed">
              Choose between live online or face-to-face tutoring.
            </p>
          </motion.div>

        </motion.div>
      </section>

    </div>
  );
}