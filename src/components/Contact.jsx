import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ContactSection() {
  async function handleServerSubmit(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    console.log({ name, email, subject, message });
    toast.success('Message Sent Successfully!');
  }

  return (
    <section id='contact' className="w-full max-w-7xl mx-auto px-4 my-12 md:my-24 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-40 h-40 md:w-72 md:h-72 rounded-full bg-[#237888]/5 blur-[60px] md:blur-[100px] pointer-events-none" />

      <div className="text-center mb-8 md:mb-16">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#237888] dark:text-teal-400 bg-[#237888]/10 dark:bg-teal-500/10 px-2.5 py-0.5 md:py-1 rounded-full">
          Get In Touch
        </span>
        <h2 className="text-xl md:text-4xl font-extrabold text-zinc-800 dark:text-white tracking-tight mt-2">
          Have Questions? <span className="text-[#237888] dark:text-teal-400">Contact Us</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-xs md:text-base max-w-lg mx-auto">
          We are here to help! Reach out to us for any inquiries or support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-stretch">

        <div className="lg:col-span-5 flex flex-col justify-between gap-3 md:space-y-6">
          
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 w-full">
            
            <div className="p-3 md:p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-xl md:rounded-2xl shadow-sm flex items-center gap-3 md:gap-5 hover:translate-x-1 transition-transform duration-200 col-span-1 lg:col-span-1 min-w-0">
              <div className="p-2.5 md:p-4 bg-[#237888]/10 text-[#237888] dark:text-teal-400 rounded-lg md:rounded-xl shrink-0">
                <FaEnvelope className="text-sm md:text-xl" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] md:text-sm font-semibold text-zinc-400 uppercase tracking-wider">Email</h4>
                <p className="text-[11px] md:text-base font-bold text-zinc-800 dark:text-white mt-0.5 truncate">support.tutorhub.bd@gmail.com</p>
              </div>
            </div>

            <div className="p-3 md:p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-xl md:rounded-2xl shadow-sm flex items-center gap-3 md:gap-5 hover:translate-x-1 transition-transform duration-200 col-span-1 lg:col-span-1 min-w-0">
              <div className="p-2.5 md:p-4 bg-[#237888]/10 text-[#237888] dark:text-teal-400 rounded-lg md:rounded-xl shrink-0">
                <FaPhoneAlt className="text-sm md:text-xl" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] md:text-sm font-semibold text-zinc-400 uppercase tracking-wider">Call</h4>
                <p className="text-[11px] md:text-base font-bold text-zinc-800 dark:text-white mt-0.5 truncate">+1 800 555-TUTR</p>
              </div>
            </div>

            <div className="p-3 md:p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-xl md:rounded-2xl shadow-sm flex items-center gap-3 md:gap-5 hover:translate-x-1 transition-transform duration-200 col-span-2 lg:col-span-1 min-w-0">
              <div className="p-2.5 md:p-4 bg-[#237888]/10 text-[#237888] dark:text-teal-400 rounded-lg md:rounded-xl shrink-0">
                <FaMapMarkerAlt className="text-sm md:text-xl" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] md:text-sm font-semibold text-zinc-400 uppercase tracking-wider">Location</h4>
                <p className="text-[11px] md:text-base font-bold text-zinc-800 dark:text-white mt-0.5 md:leading-normal">Dhanmondi 27, Dhaka, Bangladesh.</p>
              </div>
            </div>

          </div>

          <div className="hidden lg:block p-6 bg-gradient-to-br from-[#237888]/10 to-[#1a5c69]/5 dark:from-zinc-900 dark:to-zinc-900 rounded-2xl border border-[#237888]/10 dark:border-zinc-800 text-left">
            <h5 className="font-bold text-[#237888] dark:text-teal-400">Quick Response Guarantee</h5>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
              Our support team generally responds to all clean email queries and web form messages within 24 operational hours.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-xl mb-2 flex flex-col justify-between">
          <form action={handleServerSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your Name "
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your Email Address"
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[10px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Subject</label>
              <input
                type="text"
                name="subject"
                required
                placeholder="How can we help you?"
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[10px] md:text-xs font-bold text-zinc-500 dark:text-zinc-400">Message</label>
              <textarea
                rows="3"
                name="message"
                required
                placeholder="Type your detailed message here..."
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 text-zinc-800 dark:text-white text-xs md:text-sm outline-none focus:border-[#237888] dark:focus:border-teal-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-[#237888] hover:bg-[#1a5c69] dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-xs md:text-sm rounded-lg md:rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 group"
            >
              Send Message
              <FaPaperPlane className="text-[10px] md:text-xs group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}