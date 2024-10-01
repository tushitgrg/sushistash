"use client"
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { Cloud, Upload, Download, Trash, List, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function ApiDocumentation() {
  const endpoints = [
    { icon: <Cloud className="w-6 h-6" />, title: 'Authentication', method: 'POST', url: '/api/auth', description: 'Authenticate and receive an API token.'  },
    { icon: <Upload className="w-6 h-6" />, title: 'Upload Image', method: 'POST', url: '/api/dev/upload', description: 'Upload an image to your storage.', input: 'Use Formdata(), Add to keys, File = image and api = your API Key' },
    { icon: <Download className="w-6 h-6" />, title: 'Retrieve Image', method: 'GET', url: '/api/images/{id}', description: 'Retrieve an image by its ID.' },
    { icon: <Trash className="w-6 h-6" />, title: 'Delete Image', method: 'DELETE', url: '/api/images/{id}', description: 'Delete an image from your storage.' },
    { icon: <List className="w-6 h-6" />, title: 'List Images', method: 'GET', url: '/api/images', description: 'List all images in your storage.' },
    { icon: <Share2 className="w-6 h-6" />, title: 'Share Image', method: 'POST', url: '/api/images/{id}/share', description: 'Generate a sharing link for an image.' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
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
          >    <Link href={'/'} className='flex items-center space-x-2'>
            <Cloud className="h-8 w-8 text-blue-400" />
        
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Sushi Stash
            </span>
            </Link>
          </motion.div>
          <div className="space-x-2 gap-4 flex items-center">
          <Link href={'/docs'}>
           Docs
            </Link>
            <SignedIn>
              <UserButton/>
            </SignedIn>
<SignedOut>

          <Link href={'/sign-in'}>
            <Button className="bg-blue-500 hover:bg-blue-600">Login</Button>
            </Link>
            </SignedOut>
          </div>
        </nav>
      </motion.header>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Sushi Stash API
        </h1>
        <p className="text-xl text-gray-400">
          Integrate unlimited image storage into your applications
        </p>
      </motion.header>

      <div className="max-w-4xl mx-auto space-y-8">
  
      <motion.div
      
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center mb-4">
        <div className="bg-gray-700 p-3 rounded-full mr-4">
        <Cloud className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-semibold text-blue-300">Authentication</h2>
      </div>
      <div className="mb-4">
       
        <code className="text-purple-300">/dashboard</code>
      </div>
      <p className="text-gray-300 mb-4">Create Your Account and Get the API key now!</p>
    
    </motion.div>
          <motion.div
      
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gray-700 p-3 rounded-full mr-4">
              <Upload className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold text-blue-300">Upload Image</h2>
            </div>
            <div className="mb-4">
              <span className="inline-block bg-blue-600 text-blue-100 px-2 py-1 rounded mr-2">
              POST
              </span>
              <code className="text-purple-300">/api/dev/upload</code>
            </div>
            <p className="text-gray-300 mb-4">Upload an image to your storage</p>
            <p className="text-gray-300 mb-4"> Use Formdata:-</p>
            <img src='/uploadimage.png'></img>
            <div className="bg-gray-700 p-4 rounded">

              <h3 className="text-lg font-semibold mb-2 text-blue-200">Example Response:</h3>
              <pre className="text-green-300 overflow-x-auto">
                <code> {JSON.stringify({
    "id": "BQACAgUAAxkDAANSZvvA6e_WL5gy2JeYUBmgItF3CWYAAhUQAAKkI-BXBeRfvHFdYSQ2BA"
},null,2)} </code>
              </pre>
            </div>
          </motion.div>

          <motion.div
      
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center mb-4">
        <div className="bg-gray-700 p-3 rounded-full mr-4">
        <Download className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-semibold text-blue-300">Retrieve Image</h2>
      </div>
      <div className="mb-4">
       
        <code className="text-purple-300">/api/images/[imageid]</code>
      </div>
      <p className="text-gray-300 mb-4">Retrieve an image by its ID.</p>
    
    </motion.div>

      </div>

      <footer className="mt-12 text-center text-gray-400">
        <p>I am not liable for any Data Loss, As this is Just a Prototype. Please Donot Use this for any Serious Products!</p>
      </footer>
    </div>
  )
}

