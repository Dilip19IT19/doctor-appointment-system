"use client"
import GlobalAPI from '@/utils/GlobalAPI'
import React, { useEffect, useState } from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import Image from 'next/image'
import { ScrollArea } from "@/components/ui/scroll-area"


interface IImageData{
  attributes:{
    url:string
  }
}

interface IImage{
  data:IImageData
}

interface IAttributes{
  name:string,
  image:IImage
}

interface MedicalSpecialist{
  id:number,
  attributes:IAttributes
}

function CategoryList() {
  const [categories,setCategories]=useState<MedicalSpecialist[]>();

  let[isLoading,setIsLoading]=useState(true);
  const path=usePathname();
  let catg=path.split("/")[2];
  let[mouse,setMouse]=useState(false);


  useEffect(()=>{

    async function getCategories() 
    {
      
      const res=await GlobalAPI.getCategory();  
      // console.log(res.data?.data);
      setCategories(res.data?.data);
      setIsLoading(false);
    }

    getCategories();

  },[])
  return (
    <aside className=' h-3/4 flex flex-col border-secondary  border-r-[1px] '>
      <p className=' md:text-xl  text-center my-8 font-bold'> Categories</p>  

      <ScrollArea>

        <div className=' flex flex-col gap-4  px-4'>
        
          {categories?.map((category)=>{
              return(

                <Link key={category.id} className={`${catg===category.attributes.name && "bg-blue-700"} hover:bg-secondary rounded-md border-[1px] border-secondary shadow-md flex justify-center md:justify-between md:px-4  md:py-2  items-center`}  href={`/search/${category.attributes.name}`}>
                  <Image className='  bg-[#4D79CD]  p-[4px] rounded-full' src={category.attributes.image.data.attributes.url} height={30} width={35} alt={category.attributes.name}/> 
                  <label className='md:block hidden text-sm md:text-lg'>{category.attributes.name}</label>
                </Link>

              )
            })}

      </div>

      </ScrollArea>
      
    </aside>
  )
}

export default CategoryList