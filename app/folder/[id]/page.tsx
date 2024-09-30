"use client"
import { ImageUploadApp } from '@/components/image-upload-app'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { FolderView } from '@/components/ui/folderview'
import { LoadingScreenComponent } from '@/components/loading-screen'
const Page =  () => {
    const [images, setImages] = useState<any>(null)
    const {id} = useParams()
    const fn = async ()=>{
      const call = await axios.post('/api/get-folder',{id})
      setImages(call.data)
   
    }
useEffect( ()=>{
 fn()
 
},[])

if(images)   return (
    
    <FolderView imagess={images}/>
 )
 else return(<LoadingScreenComponent/>)

}

export default Page