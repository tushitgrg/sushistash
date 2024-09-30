import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover"
import { Download, Link } from "lucide-react"

const currentDomain = 'http://localhost:3000'
export function CarouselDemo({images}) {
    console.log(images)
  return (
   
    <Carousel className="w-full flex justify-center align-middle max-h-screen">

      <CarouselContent>

        {images.map((_, index) => {
            if(_) return    <CarouselItem key={index}>
            
           
      
              <div className="flex-col  items-center justify-center align-middle">

                  <div className="flex">
              <a href={`${currentDomain}/api/images/${_.fileId}`} download={_.imageName}>
      <Button size="icon" variant="ghost" className="dark:text-gray-300 dark:hover:text-white">
        <Download className="h-4 w-4" />
      </Button>
      </a>

      <Popover placement="right">
<PopoverTrigger>
<Button size="icon" variant="ghost" className="dark:text-gray-300 dark:hover:text-white" onClick={()=>navigator.clipboard.writeText(`${currentDomain}/api/images/${_.fileId}`)}>
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



              <img src={`${currentDomain}/api/images/${_.fileId}`} alt={_.id} className="w-screen  object-contain rounded-md "  />
          
         </div>
        </CarouselItem>

        })}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />

    </Carousel>

      
  )
}
