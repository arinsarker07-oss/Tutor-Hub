// src/components/PageWrapper.jsx
"use client"

import React from "react"
import { motion } from "framer-motion"

export function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}    
      animate={{ opacity: 1, x: 0 }}      
      exit={{ opacity: 0, x: -20 }}       
      transition={{ duration: 0.4, ease: "easeInOut" }} 
      className="w-full"
    >
      {children}
    </motion.div>
  )
}