"use client"

import { motion } from "framer-motion"

interface BlurredOverlayLoadingProps {
  isLoading: boolean
}

export function BlurredOverlayLoadingComponent({ isLoading }: BlurredOverlayLoadingProps) {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
     

      <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-primary"
            />
          </svg>
        </motion.div>
       

       
      </div>
   
  )
}