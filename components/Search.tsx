"use client"
import React, { useEffect, useState } from 'react'
import GlobalAPI from '@/utils/GlobalAPI'
import Image from 'next/image'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import PopularDoctorsList from './PopularDoctorsList'


interface MedicalSpecialist{
  id:number,
  attributes:{
    name:string,
    info:string,
    image:{
      data:{
        attributes:{
          url:string
        }
      }
    }
  }
}


function Search() {

  const [categories,setCategories]=useState<MedicalSpecialist[]>();

  let[isLoading,setIsLoading]=useState(true);

  useEffect(()=>{

    async function getCategories() 
    {
      
      const res=await GlobalAPI.getCategory();  
      console.log(res.data?.data);
      setCategories(res.data?.data);
      setIsLoading(false);
    }

    getCategories();

  },[])

  return (
    <div className=' flex flex-col items-center'>
      <h1 className=' md:text-3xl text-xl text-center'>All <span className='text-primary'>Categories</span></h1>
      
        <div className=' transition-all grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4  gap-y-12 my-12 md:px-8 px-4'>
          { isLoading ? [1,2,3,4,5,6].map((item,idx)=>{
            return(
              <Skeleton key={idx}>
                <div className=' h-[120px] w-[150px] p-4 rounded-md'></div>
              </Skeleton>
            )
          }) : categories?.map((category,idx)=>{
            return(
              <div key={idx}>
                <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                      <Link href={`/search/${category.attributes.name}`} className='bg-[#617fd8] text-black hover:bg-primary cursor-pointer rounded-md text-sm md:text-lg flex flex-col justify-center items-center p-2'>
                        <Image className=' hover:scale-110' key={category.id} src={category.attributes.image.data.attributes.url} alt={category.attributes.name} height={40} width={60}/>
                        <label>{category.attributes.name}</label>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className=' border-none bg-secondary p-2  '>
                    <p>{category.attributes.info}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              </div>            
             
            )
          })} 
        </div>
        <h1 className=' md:text-3xl text-xl mb-4 mt-2'>Popular <span className='text-primary'>Doctors</span></h1>
       <PopularDoctorsList/>
       <p className=' my-4'></p>
     
        
       
       
      
    </div>
  )
}

export default Search