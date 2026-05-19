// src/components/PageWrapper.jsx
"use client"

import React from "react"
import { motion } from "framer-motion"

export function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}     // পেজ শুরু হওয়ার সময় ডানপাশে একটু সরে থাকবে এবং অদৃশ্য থাকবে
      animate={{ opacity: 1, x: 0 }}      // স্মুথভাবে বামে এসে নিজের জায়গায় সেট হবে
      exit={{ opacity: 0, x: -20 }}       // পেজ থেকে চলে যাওয়ার সময় বামে স্লাইড হয়ে যাবে
      transition={{ duration: 0.4, ease: "easeInOut" }} // অ্যানিমেশনের গতি এবং স্মুথনেস
      className="w-full"
    >
      {children}
    </motion.div>
  )
}