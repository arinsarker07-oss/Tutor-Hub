import React from 'react';
// react-icons থেকে আইকনগুলো ইমপোর্ট করা হয়েছে
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="w-full bg-[#f8fafc] border-t border-slate-200 text-[#0f172a] font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-8 pb-12">
          
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col space-y-4">
            <span className="text-2xl bg-gradient-to-r from-[#0B253A] to-[#1D9299] bg-clip-text text-transparent font-black tracking-tight ">
              TutorHub
            </span>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Connecting knowledge, together. Find the perfect tutor or grow your teaching career.
            </p>
          </div>

          {/* Column 2: Contact Information */}
          <div>
            <h4 className="text-xs tracking-wider uppercase text-[#115e59] font-bold mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2 hover:text-[#000000] hover:underline">
                <IoMailOutline size={18} className="text-slate-400" />
                <a href="mailto:info@tutorhub.com" className=" transition-colors">info@tutorhub.com</a>
              </li>
              <li className="flex items-center gap-2">
                <IoCallOutline size={18} className="text-slate-400" />
                <a href="tel:+18005558887" className="hover:text-[#115e59] transition-colors">+1 800 555-TUTR</a>
              </li>
              <li className="flex items-start gap-2 ">
                <IoLocationOutline size={18} className="text-slate-400  mt-0.5" />
                <span>123 Learning Lane,<br />Education City, EC 4562</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Tutor Services (Learning Services) */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#115e59] mb-4">
              Tutor Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li><a href="#for-students" className="hover:text-[#000000] hover:underline transition-colors">For Students</a></li>
              <li><a href="#for-tutors" className="hover:text-[#000000] hover:underline transition-colors">For Tutors</a></li>
              <li><a href="#become-mentor" className="hover:text-[#000000] hover:underline transition-colors">Become a Mentor</a></li>
              <li><a href="#course-catalog" className="hover:text-[#000000] hover:underline transition-colors">Course Catalog</a></li>
              <li><a href="#pricing" className="hover:text-[#000000] hover:underline transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Column 4: Social Links & Company */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#115e59] mb-4">
              Social Links
            </h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="p-2 bg-white rounded-full border border-slate-200 text-slate-600 hover:text-[#115e59] hover:border-[#115e59] transition-all">
                <FaLinkedinIn size={16} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-slate-200 text-slate-600 hover:text-[#115e59] hover:border-[#115e59] transition-all">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-slate-200 text-slate-600 hover:text-[#115e59] hover:border-[#115e59] transition-all">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-slate-200 text-slate-600 hover:text-[#115e59] hover:border-[#115e59] transition-all">
                <FaInstagram size={16} />
              </a>
            </div>
            
            {/* Quick Legal Links nested under column */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
              <a href="#privacy" className="hover:text-slate-600">Privacy Policy</a>
              <a href="#terms" className="hover:text-slate-600">Terms of Service</a>
            </div>
          </div>

        </div>

        {/* Bottom Footer: Copyright Information */}
        <div className="pt-8 border-t border-slate-200 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Tutor Hub Inc. All rights reserved. Connecting knowledge, together.</p>
        </div>
       <button className='inline-flex items-center gap-2 px-7 py-3 bg-[#228B96] hover:bg-[#1a6f78] text-white font-medium text-base rounded-[10px] shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0'> login</button>
      </div>
    </footer>
  );
};

export default Footer;