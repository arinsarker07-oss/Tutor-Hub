"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import ExtraSection from '@/components/extrasection';
import ContactSection from '@/components/Contact';
import TutorCards from '@/components/TutorCardHome';
import Link from 'next/link';

export default function NormalBannerSlider() {

  const banners = [
    {
      id: 0,
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      title: "Interactive Live Classes",
      desc: "Learn directly from top tutors with 1-on-1 mentorship.",
      button: "Get Started",
      link: "/login"
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      title: "Chapter-wise Notes & Suggestions",
      desc: "Get access to well-organized lecture sheets, handnotes, and exclusive suggestions to score an A+ in your HSC board exams.",
      button: "All Tutors",
      link: "/tutors"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
      title: "24/7 Expert Support",
      desc: "Get stuck? Our dedicated teaching assistants are here to help.",
      button: "Contact",
      link: "/#contact"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === banners.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (isPaused) return;

    const slideInterval = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(slideInterval);
  }, [currentIndex, isPaused]);

  const fadeVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="w-full max-w-5xl mx-auto my-4 md:my-8 px-4 relative group overflow-hidden md:overflow-visible bg-transparent py-2 md:py-6 rounded-3xl">

        <div className="absolute inset-0 pointer-events-none overflow-visible z-[-1]">
          <div
            className="absolute -right-24 -top-24 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] blur-[60px] sm:blur-[100px] bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-transparent rounded-full"
            style={{ transform: 'rotate(-20deg)' }}
          />
          <div
            className="absolute -left-20 sm:-left-35 top-15 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] blur-[60px] sm:blur-[120px] bg-gradient-to-tr from-teal-600/20 via-blue-500/10 to-transparent rounded-full"
            style={{ transform: 'rotate(15deg)' }}
          />
        </div>

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="w-full h-[220px] sm:h-[350px] md:h-[450px] rounded-2xl relative overflow-hidden shadow-2xl bg-zinc-900 border border-[#0A2533]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={banners[currentIndex].src}
                alt={banners[currentIndex].title}
                fill
                priority
                className="object-cover opacity-85"
                unoptimized
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-4 md:p-12 z-10">
                <h2 className="text-white text-base md:text-3xl font-bold mb-1 md:mb-2">
                  {banners[currentIndex].title}
                </h2>
                <p className="text-zinc-300 text-[11px] md:text-base max-w-xs md:max-w-md mb-2.5 md:mb-4 leading-relaxed line-clamp-2 md:line-clamp-none">
                  {banners[currentIndex].desc}
                </p>

                <div>
                  <Link href={banners[currentIndex].link}>
                    <Button
                      size='sm'
                      className="md:hidden rounded-lg px-4 py-1.5 text-[11px] font-bold transition-all hover:bg-[#23887e] bg-[#237888] text-white shadow-sm h-7"
                    >
                      {banners[currentIndex].button}
                    </Button>
                    <Button
                      size='lg'
                      className="hidden md:flex rounded-xl px-6 py-2.5 text-sm font-medium transition-all hover:bg-[#23887e] bg-[#237888] text-white hover:text-white shadow-sm"
                    >
                      {banners[currentIndex].button}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-6 text-xl rounded-full p-1.5 bg-black/40 text-white hover:bg-black/70 transition md:hidden group-hover:block z-20"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-6 text-xl rounded-full p-1.5 bg-black/40 text-white hover:bg-black/70 transition md:hidden group-hover:block z-20"
        >
          <FaAngleRight />
        </button>

        <div className="flex justify-center py-2 md:py-3 gap-1.5">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-teal-500 w-4 md:w-6" : "bg-zinc-600 w-1.5 md:w-2"
                }`}
            />
          ))}
        </div>

      </div>
      <TutorCards></TutorCards>
      <ExtraSection></ExtraSection>
      <ContactSection></ContactSection>
    </div>
  );
}