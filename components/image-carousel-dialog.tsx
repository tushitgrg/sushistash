"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Download, Link } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover'


export function ImageCarouselDialogComponent({currentIndex, setCurrentIndex,images, btnref }) {
  console.log(images)


 

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }
const currentDomain = 'http://localhost:3000'
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={btnref}  variant="outline" className='hidden'>Open Image Carousel</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0">


        <div className="relative w-full h-[400px] sm:h-[600px]">
        <div className="flex">
              <a href={`${currentDomain}/api/images/${images[currentIndex].fileId}`} download={images[currentIndex].imageName}>
      <Button size="icon" variant="ghost" className="dark:text-gray-300 dark:hover:text-white">
        <Download className="h-4 w-4" />
      </Button>
      </a>

      <Popover placement="right">
<PopoverTrigger>
<Button size="icon" variant="ghost" className="dark:text-gray-300 dark:hover:text-white" onClick={()=>navigator.clipboard.writeText(`${currentDomain}/api/images/${images[currentIndex].fileId}`)}>
        <Link className="h-4 w-4" />
      </Button>
      </PopoverTrigger>
<PopoverContent>
<div className="px-1 py-2">
<div className="text-small font-bold">Copied</div>

</div>
</PopoverContent>
</Popover>
</div>
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.img
              key={currentIndex}
              src={`${currentDomain}/api/images/${images[currentIndex].fileId}`} 
              alt={images[currentIndex].id}
              className="absolute w-full h-full object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next image</span>
          </Button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-gray-400'
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <span className="sr-only">Go to image {index + 1}</span>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}