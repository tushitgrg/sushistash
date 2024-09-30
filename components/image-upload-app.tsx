"use client"
import JSZip from 'jszip';

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, Link, MoreVertical, Folder, Image, Upload, Trash, Moon, Sun, Plus, User, UserPlus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SignedOut, SignInButton, SignedIn, UserButton, RedirectToSignIn } from '@clerk/nextjs'
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";
import axios from 'axios'
import { toast, useSonner } from 'sonner'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { BlurredOverlayLoadingComponent } from './blurred-overlay-loading';
import { Badge } from './ui/badge';
import { FileUpload } from './ui/file-upload';

import { CarouselDemo } from './image-carousel';
import { ImageCarouselDialogComponent } from './image-carousel-dialog';
export function ImageUploadApp({imagess}:any) {
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  // const [imagees, setImageess] = useState(imagess.images||[])
const [images, setImages] =useState(imagess.images||[])
const [selfolder, setselfolder] = useState(null)
const [selectAll, setselectAll] = useState(false)
const [isLoading, setisloading] = useState(false)
const carouselref = useRef(null)

useEffect(()=>{
if(selectAll){
 
 
  setSelectedImages(images.map((img)=> {
   if (!selfolder || selfolder.id==img.folderid) return img.id.toString()
  } ))
 

 
}else{
  setSelectedImages([])
}

},[selectAll])

useEffect(()=>{
  if(selectAll) setselectAll(false)
    const dim = imagess.images.map((img)=> {
      if (!selfolder || selfolder.id==img.folderid) return img
     } )

    setImages(dim.filter((img)=>img!=undefined))


},[selfolder])


  const [folders, setfolders] =  useState(imagess.folders||[])
 const currentDomain = 'https://sushistash.vercel.app'

const fileref = useRef(null)
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

const [carouselIndex,setcarouselIndex]  = useState(0)
  const uploadImage = async (e:any) => {
    setisloading(true)
    const file = e.target.files
if(!file || file.length<=0) alert("Upload")
   try{
    for(let i=0; i<file.length; i++ ){
      const formData = new FormData();
      formData.append('file', file[i]);
formData.append('folder',selfolder?.id||'')
    
      const response = await fetch('/api/telegram/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (data.fileId) {
        setImages((prev)=>[...prev,data])
       
       
      }
    }

    toast("Uploaded Successfully!")
  }catch(e){
    toast("There seems to be some error!")
  }

  setisloading(false)
e.target.value = null

    
  };

  const deleteAll = ()=>{
    setisloading(true)
    for(let i=0; i<selectedImages.length; i++){
      deleteImage(selectedImages[i])
    }
    setisloading(false)
    setSelectedImages([])
  }

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


const moveImage = async (img, folder)=>{
  
  setImages((prev)=>prev.filter(item => item.id!==img));
  const response = await axios.post('/api/move-image',{img,folder})
  if(response.data.id){
    setImages((prev)=>[...prev,response.data])
  }
  
}
const deleteImage = async (img)=>{
  const response = await axios.post('/api/delete-image',{img})
  if(response.data.id){
  setImages((prev)=>prev.filter(item => item.id!==img));}
}
  const [newfolder, setnewfolder] = useState('')
  
 const addFolder = async (e)=>{
  e.preventDefault()
  const response = await axios.post('/api/add-folder',{name:newfolder})
 if(response.data.id){
  setfolders((prev)=>[...prev, response.data])
 }
 toast("Folder added successfully!")

  setnewfolder('')
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

const moveAll =  (folder)=>{
  setisloading(true)
  for(let i=0; i<selectedImages.length; i++){
    moveImage(selectedImages[i],folder)
  }
  setSelectedImages([])
  setisloading(false)
}

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <motion.div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 p-4 shadow-md transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : '-100%' }}
      >
       
      
          <div className="flex items-center justify-between mb-6">
          <SignedOut>
           <RedirectToSignIn/>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
   <a href="/"> <h2 className="text-xl font-bold dark:text-white">Sushi Stash</h2></a> 
      <Button size="icon" variant="ghost" onClick={toggleSidebar} className="md:hidden">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
     
        
       
        <ScrollArea className="h-[calc(100vh-12rem)]">
        <Button key={'219u2nsaasjasj'} variant="ghost" className="w-full justify-start mb-2 dark:text-gray-300 dark:hover:text-white" onClick={()=>setselfolder(null)}>
              <Folder className="mr-2 h-4 w-4" />
              All Images
            </Button>
          {folders.map((folder:any) => (
            <div className='flex' key={folder.id}>
               <Button key={folder.id} variant="ghost" className="w-full justify-start mb-2 dark:text-gray-300 dark:hover:text-white" onClick={()=>setselfolder(folder)}>
              <Folder className="mr-2 h-4 w-4" />
              {folder.name}
             
            </Button>

               <Popover placement="right">
<PopoverTrigger>
<Button size="icon" variant="ghost" className="dark:text-gray-300 dark:hover:text-white" onClick={()=>navigator.clipboard.writeText(`${currentDomain}/folder/${folder.id}`)}>
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
           
            
          ))}
        </ScrollArea>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full mt-4">
              <Plus className="mr-2 h-4 w-4" /> New Folder
            </Button>
          </DialogTrigger>
          <DialogContent className="dark:bg-gray-800 dark:text-white">
            <form onSubmit={addFolder}>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input value={newfolder} required onChange={(e)=>setnewfolder(e.currentTarget.value)} id="name"  className="col-span-3 dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
            <Button type='submit' >Create Folder</Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-900 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <MoreVertical className="h-6 w-6" />
            </Button>
            <Checkbox id='checkedAll'  checked={selectAll} onCheckedChange={()=>setselectAll((prev)=>!prev)}/>
            <h1 className="text-3xl font-bold dark:text-white"> {selfolder?selfolder.name:"All Images"}</h1>
          </div>
          <div className="flex space-x-2">
            <Input id="picture" type="file" className="hidden" />
            <Label htmlFor="picture" className="cursor-pointer">
            <input
        type="file"
        hidden
ref={fileref}


onChange={uploadImage}
        multiple
        accept="image/*"
      />
              <Button onClick={()=>fileref.current.click()}>
                <Upload className="mr-2 h-4 w-4" /> Upload Image
              </Button>
        
             
            </Label>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleTheme}
              className="bg-white dark:bg-gray-800 transition-colors duration-200"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-yellow-500" /> : <Moon className="h-4 w-4 text-gray-700" />}
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        <AnimatePresence>
          {selectedImages.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 flex space-x-2"
            >
              
              <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" /> Delete Selected
              </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all these
            images and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteAll}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
              <Button variant="secondary" onClick={downloadAll}>
                <Download className="mr-2 h-4 w-4" /> Download Selected
              </Button>


              <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="default" className='px-10'>
           Move
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:bg-gray-800 dark:text-white">
   
                
                {folders.map((folder:any)=> <DropdownMenuItem className="dark:focus:bg-gray-700" key={folder.id} onClick={()=>moveAll(folder.id)}>        <span key={folder.id}>{folder.name}</span> </DropdownMenuItem>)}

          
           
          </DropdownMenuContent>
        </DropdownMenu>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images && images.length>0? images.map((image,indexx) =>{
 if(!selfolder|| selfolder.id==image.folderid) return (
  <motion.div 
    key={image.id} 
    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md " 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    
  >
    <div className="relative">
      <img src={`${currentDomain}/api/images/${image.fileId}`} alt={image.id} className="w-full h-40 object-cover rounded-md hover:cursor-pointer" onDoubleClick={()=> {carouselref.current.click(); 
         setcarouselIndex(indexx)
         
         }}   onClick={()=>toggleImageSelection(image.id.toString())}/>
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

       
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="dark:text-gray-300 dark:hover:text-white">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:bg-gray-800 dark:text-white">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
             
              <span className="dark:focus:bg-gray-700">Move</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {folders.map((folder:any)=> <DropdownMenuItem key={folder.id} onClick={()=>moveImage(image.id, folder.id)}>
                  
                  <span key={folder.id}>{folder.name}</span>
                </DropdownMenuItem>)}
               
                </DropdownMenuSubContent>
                </DropdownMenuPortal>
                </DropdownMenuSub>
                
            

          
            <DropdownMenuItem className="dark:focus:bg-gray-700" onClick={()=>deleteImage(image.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
     
    </div>
    
   <Badge className='mt-5'> { new Date(image.createdAt).toDateString()}</Badge>
  </motion.div>
)
          } ):<h2>No Images!</h2>}
        </div>
      </div>
      <BlurredOverlayLoadingComponent isLoading={isLoading}/>

     <ImageCarouselDialogComponent currentIndex={carouselIndex} setCurrentIndex={setcarouselIndex} btnref={carouselref} images={images}/>




    </div>
  )
}