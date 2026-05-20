import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

export default function ContactSection() {
  async function handleServerSubmit(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    console.log({ name, email, subject, message });
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-24 relative">
      <div className="absolute left-0 bottom-0 w-72 h-72 rounded-full bg-[#237888]/5 blur-[100px] pointer-events-none" />
      
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#237888] dark:text-teal-400 bg-[#237888]/10 dark:bg-teal-500/10 px-3 py-1 rounded-full">
          Get In Touch
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-800 dark:text-white tracking-tight mt-3">
          Have Questions? <span className="text-[#237888] dark:text-teal-400">Contact Us</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm md:text-base max-w-lg mx-auto">
          We are here to help! Reach out to us for any inquiries, support, or partnership opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl shadow-sm flex items-center gap-5 hover:translate-x-1 transition-transform duration-200">
            <div className="p-4 bg-[#237888]/10 text-[#237888] dark:text-teal-400 rounded-xl">
              <FaEnvelope className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Email Us</h4>
              <p className="text-base font-bold text-zinc-800 dark:text-white mt-0.5">support.tutorhub.bd@gmail.com</p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl shadow-sm flex items-center gap-5 hover:translate-x-1 transition-transform duration-200">
            <div className="p-4 bg-[#237888]/10 text-[#237888] dark:text-teal-400 rounded-xl">
              <FaPhoneAlt className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Call Us</h4>
              <p className="text-base font-bold text-zinc-800 dark:text-white mt-0.5">+1 800 555-TUTR</p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl shadow-sm flex items-center gap-5 hover:translate-x-1 transition-transform duration-200">
            <div className="p-4 bg-[#237888]/10 text-[#237888] dark:text-teal-400 rounded-xl">
              <FaMapMarkerAlt className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Location</h4>
              <p className="text-base font-bold text-zinc-800 dark:text-white mt-0.5">Level 4, Genetic Plaza, Dhanmondi 27, Dhaka - 1209, Bangladesh.</p>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-[#237888]/10 to-[#1a5c69]/5 dark:from-zinc-900 dark:to-zinc-900 rounded-2xl border border-[#237888]/10 dark:border-zinc-800 text-center lg:text-left">
            <h5 className="font-bold text-[#237888] dark:text-teal-400">Quick Response Guarantee</h5>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
              Our support team generally responds to all clean email queries and web form messages within 24 operational hours.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
          <form action={handleServerSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="johndoe@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Subject</label>
              <input 
                type="text" 
                name="subject"
                required
                placeholder="How can we help you?"
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Message</label>
              <textarea 
                rows="4" 
                name="message"
                required
                placeholder="Type your detailed message here..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-[#237888] hover:bg-[#1a5c69] dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 group"
            >
              Send Message
              <FaPaperPlane className="text-xs group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}