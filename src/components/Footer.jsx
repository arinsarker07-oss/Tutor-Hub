import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="w-full mt-10 bg-[#f8fafc] dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 text-[#072133] dark:text-slate-100 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 pb-8 text-left">
          
          <div className="col-span-2 md:col-span-1 flex flex-col space-y-2 mb-2 md:mb-0">
            <p className="text-2xl bg-gradient-to-r from-[#0B253A] to-[#1D9299] dark:from-slate-100 dark:to-[#1D9299] bg-clip-text text-transparent font-black tracking-tight">
              TutorHub
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Connecting knowledge, together. Find the perfect tutor or grow your teaching career.
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col min-w-0">
            <h4 className="text-sm font-bold text-[#1D9299] mb-3">
              Contact Info
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 min-w-0">
              <li className="flex items-center gap-1.5 hover:text-[#2c93a6] min-w-0">
                <IoMailOutline size={14} className="text-slate-400 dark:text-slate-500 shrink-0" />
                <a href="mailto:support.tutorhub.bd@gmail.com" className="transition-colors truncate block">
                  support.tutorhub.bd@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-1.5 min-w-0">
                <IoCallOutline size={14} className="text-slate-400 dark:text-slate-500 shrink-0" />
                <a href="tel:+18005558887" className="hover:text-[#2c93a6] transition-colors">+1 800 555-TUTR</a>
              </li>
              <li className="flex items-start gap-1.5 min-w-0">
                <IoLocationOutline size={14} className="text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                <span className="leading-snug">Dhanmondi 27, Dhaka.</span>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-sm font-bold text-[#1D9299] mb-3">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#for-students" className="hover:text-[#2c93a6] transition-colors">For Students</a></li>
              <li><a href="#for-tutors" className="hover:text-[#2c93a6] transition-colors">For Tutors</a></li>
              <li><a href="#become-mentor" className="hover:text-[#2c93a6] transition-colors">Mentorship</a></li>
              <li><a href="#pricing" className="hover:text-[#2c93a6] transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          <div className="col-span-1 flex flex-col">
            <h4 className="text-sm font-bold text-[#1D9299] mb-3">
              Social Links
            </h4>
            <div className="flex space-x-2 mb-4">
              <a href="#" className="p-1.5 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-white dark:hover:text-white hover:bg-[#2c93a6] dark:hover:bg-[#2c93a6] hover:border-[#2c93a6] dark:hover:border-[#2c93a6] transition-all">
                <FaLinkedinIn size={12} />
              </a>
              <a href="#" className="p-1.5 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-white dark:hover:text-white hover:bg-[#2c93a6] dark:hover:bg-[#2c93a6] hover:border-[#2c93a6] dark:hover:border-[#2c93a6] transition-all">
                <FaFacebookF size={12} />
              </a>
              <a href="#" className="p-1.5 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-white dark:hover:text-white hover:bg-[#2c93a6] dark:hover:bg-[#2c93a6] hover:border-[#2c93a6] dark:hover:border-[#2c93a6] transition-all">
                <FaTwitter size={12} />
              </a>
              <a href="#" className="p-1.5 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-white dark:hover:text-white hover:bg-[#2c93a6] dark:hover:bg-[#2c93a6] hover:border-[#2c93a6] dark:hover:border-[#2c93a6] transition-all">
                <FaInstagram size={12} />
              </a>
            </div>
            
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-[10px] text-slate-400 dark:text-slate-500">
              <a href="#privacy" className="hover:text-slate-600 dark:hover:text-slate-300">Privacy</a>
              <a href="#terms" className="hover:text-slate-600 dark:hover:text-slate-300">Terms</a>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-900 text-center text-[10px] text-slate-400 dark:text-slate-500 px-2">
          <p>© {new Date().getFullYear()} Tutor Hub Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;