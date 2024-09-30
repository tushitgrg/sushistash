"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Upload, Infinity, Lock, Share2 } from 'lucide-react'
import Link from 'next/link'

export function Homepage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-6"
      >
        <nav className="flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Cloud className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Sushi Stash
            </span>
          </motion.div>
          <div className="space-x-2">
          <Link href={'/sign-in'}>
            <Button className="bg-blue-500 hover:bg-blue-600">Login</Button>
            </Link>
          </div>
        </nav>
      </motion.header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Unlimited Free Cloud Storage
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Store, organize, and share your images with ease - no limits, no cost
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={'/dashboard'}>
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-4 rounded-full">
              <Upload className="mr-2 h-5 w-5" /> Start Uploading Now
            </Button>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: <Infinity className="h-12 w-12 text-blue-400" />, title: "Unlimited Storage", description: "Upload as many images as you want, we've got space for all your memories." },
            { icon: <Lock className="h-12 w-12 text-purple-400" />, title: "Secure Storage", description: "Your images are encrypted and stored safely in our secure cloud infrastructure." },
            { icon: <Share2 className="h-12 w-12 text-pink-400" />, title: "Easy Sharing", description: "Share your images or entire albums with friends and family in just a few clicks." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                onHover={() => setHoveredFeature(index)}
                onLeave={() => setHoveredFeature(null)}
                isHovered={hoveredFeature === index}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-lg shadow-2xl"
        >
          <img
            src="/imagecollage.avif"
            alt="Cloud storage illustration"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-500/50 flex items-center justify-center">
            <p className="text-white text-3xl font-bold">Your Images, Anywhere, Anytime</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
            {[
              { number: 1, title: "Sign Up", description: "Create your free account" },
              { number: 2, title: "Upload", description: "Add your images to the cloud" },
              { number: 3, title: "Organize", description: "Sort your images into albums" },
              { number: 4, title: "Share", description: "Share with friends and family" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Step number={step.number} title={step.title} description={step.description} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

   
    </div>
  )
}

function FeatureCard({ icon, title, description, onHover, onLeave, isHovered }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            {icon}
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{description}</p>
        </CardContent>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-blue-500/10 flex items-center justify-center"
            >
             
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

function Step({ number, title, description }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center text-xl font-bold mb-4"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.3 }}
      >
        {number}
      </motion.div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  )
}