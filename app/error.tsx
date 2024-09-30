"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCcw, MessageSquare } from 'lucide-react'
import Link from 'next/link'

interface ErrorPageProps {
  error?: Error
  reset?: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const [errorMessage, setErrorMessage] = useState<string>('An unexpected error occurred')
  const [errorCode, setErrorCode] = useState<string>('500')

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred')
      // You can add logic here to set different error codes based on the error type
      setErrorCode(error.name === 'NotFoundError' ? '404' : '500')
    }
  }, [error])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <AlertTriangle className="h-24 w-24 text-yellow-400 mx-auto mb-6" />
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-400">
          Oops! Error {errorCode}
        </h1>
        <p className="text-xl text-gray-300 mb-8">{errorMessage}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <Button
          asChild
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Go to Homepage
          </Link>
        </Button>
        {reset && (
          <Button
            onClick={reset}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        )}
      
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 text-gray-400 text-sm"
      >
        <p>If the problem persists, please contact our support team.</p>
      </motion.div>
    </div>
  )
}