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
    <aside className=' h-3/4 flex flex-col border-secondary border-r-[1px] px-4 '>
      <p className=' text-xl text-center my-8 font-bold'>All Categories</p>   
      <div onMouseOut={()=>setMouse(false)} onMouseOver={()=>setMouse(true)} className={ `  overflow-hidden flex flex-col gap-4 ${mouse && "  s overflow-y-scroll scrollbar-thin " } `}>
        {categories?.map((category)=>{
          return(

            <Link key={category.id} className={`${catg===category.attributes.name && "bg-blue-700"} hover:bg-secondary rounded-md border-[1px] border-secondary shadow-md flex justify-between px-4 py-2  items-center`}  href={`/search/${category.attributes.name}`}>
              <Image className='  bg-primary p-[1px] rounded-full' src={category.attributes.image.data.attributes.url} height={30} width={35} alt={category.attributes.name}/> 
              <label className=' text-lg'>{category.attributes.name}</label>
            </Link>

          )
        })}
      </div>  
      
    </aside>
  )
}

export default CategoryList