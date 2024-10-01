"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, Link, MoreVertical, Folder, Image, Upload, Trash, Moon, Sun, Plus, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SignedOut, SignInButton, SignedIn, UserButton, RedirectToSignIn } from '@clerk/nextjs'
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";
import axios from 'axios'
import { ImageCarouselDialogComponent } from '../image-carousel-dialog'
import JSZip from 'jszip'
export function FolderView({imagess}:any) {
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  // const [imagees, setImageess] = useState(imagess.images||[])
const [images, setImages] =useState(imagess.images||[])
const [selfolder, setselfolder] = useState(imagess.folder)
const [selectAll, setselectAll] = useState(false)
useEffect(()=>{
  if(selectAll){
   
   
    setSelectedImages(images.map((img)=> {
     if (!selfolder.id || selfolder.id==img.folderid) return img.id.toString()
    } ))
   
  
   
  }else{
    setSelectedImages([])
  }
  
  },[selectAll])


const currentDomain = 'http://localhost:3000'

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])



const [carouselIndex, setcarouselIndex] = useState(0)


const downloadAll = async ()=>{
  const zip = new JSZip();

  for(let i=0; i<selectedImages.length; i++){

   const fid =  images.filter((img)=>img.id ==selectedImages[i])

    const res = await fetch(`/api/images/${fid[0].fileId}`)
    const blob = await res.blob()
zip.file(fid[0].imageName,blob)

  }
  const zipfile = await zip.generateAsync({type:'blob'})

const a = document.createElement('a')
  a.style.display = 'none'
a.download = 'images.zip'
const url = URL.createObjectURL(zipfile)
a.href = url
document.body.appendChild(a)
a.click()
a.remove()
 
  setselectAll(false)
}

 

  const toggleImageSelection = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    )
  }

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('darkMode', (!isDarkMode).toString())
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }
const carouselref = useRef(null)


  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-900 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <MoreVertical className="h-6 w-6" />
            </Button>
            <Checkbox id='checkedAll'  checked={selectAll} onCheckedChange={()=>setselectAll((prev)=>!prev)}/>
            <h1 className="text-3xl font-bold dark:text-white">{selfolder?selfolder.name:"All Images"}</h1>
          </div>
          
        </div>
        <AnimatePresence>
          {selectedImages.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 flex space-x-2"
            >
              
           
              <Button variant="secondary" onClick={downloadAll}>
                <Download className="mr-2 h-4 w-4" /> Download Selected
              </Button>


            

            </motion.div>
          )}
        </AnimatePresence>
      

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images && images.length>0? images.map((image,indexx) =>{
 if(!selfolder.id || selfolder.id==image.folderid) return (
  <motion.div 
    key={image.id} 
    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="relative">
      <img src={`${currentDomain}/api/images/${image.fileId}`} alt={image.id} onDoubleClick={()=>{
carouselref.current.click()
setcarouselIndex(indexx)
      }} onClick={()=>toggleImageSelection(image.id.toString())} className="w-full h-40 object-cover rounded-md hover:cursor-pointer" />
      <Checkbox
        id={`select-${image.id}`}
        className="absolute top-2 left-2"
        checked={selectedImages.includes(image.id.toString())}
        onCheckedChange={() => toggleImageSelection(image.id.toString())}
      />
    </div>
    <div className="mt-2 flex justify-between items-center">
      <span className="text-sm font-medium dark:text-white">{image.imageName}</span>
      <div className="flex space-x-2">
        <a href={`${currentDomain}/api/images/${image.fileId}`} download={image.imageName}>
        <Button size="icon" variant="ghost" className="dark:text-gray-300 dark:hover:text-white">
          <Download className="h-4 w-4" />
        </Button>
        </a>
        <Popover placement="right">
<PopoverTrigger>
<Button size="icon" variant="ghost" className="dark:text-gray-300 dark:hover:text-white" onClick={()=>navigator.clipboard.writeText(`${currentDomain}/api/images/${image.fileId}`)}>
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
    </div>
  </motion.div>
)
          } ):<h2>No Images!</h2>}
        </div>
      </div>
      <ImageCarouselDialogComponent currentIndex={carouselIndex} setCurrentIndex={setcarouselIndex} btnref={carouselref} images={images}/>
    </div>
  )
}