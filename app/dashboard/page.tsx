"use client"
import { ImageUploadApp } from '@/components/image-upload-app'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LoadingScreenComponent } from '@/components/loading-screen'
import { redirect, useRouter } from 'next/navigation'
const Page =  () => {

  const router = useRouter()

    const [images, setImages] = useState<any>(null)
    const fn = async ()=>{

      try{
        const call = await axios.post('/api/get-images')

        setImages(call.data)
      }catch(e){
        router.push('/sign-in')
      }
     
   
    }
useEffect( ()=>{
 fn()
 
},[])

if(images)   return (
  <ImageUploadApp imagess={images}/>
 )
 else return(<LoadingScreenComponent/>)

}

export default Page