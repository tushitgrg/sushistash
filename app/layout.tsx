import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { motion } from 'framer-motion'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
        <Toaster />

          {children}
          <footer 
      
        className="bg-gray-800 py-2"
      >
        <div className="container mx-auto px-2 text-center text-gray-400">
       
        <a href="https://portfolio.tushitgarg.com/" target='_blank'> <p className="mt-2">Developed by Tushit Garg</p></a> 
        </div>
      </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}