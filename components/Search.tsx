"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'
import GlobalAPI from '@/utils/GlobalAPI'
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


function Search() {

  const [categories,setCategories]=useState<MedicalSpecialist[]>();

  useEffect(()=>{

    async function getCategories() 
    {
      const res=await GlobalAPI.getCategory();  
      console.log(res.data?.data);
      setCategories(res.data?.data);
    }

    getCategories();

  },[])

  return (
    <div className=' flex flex-col items-center'>
      <h1 className=' md:text-3xl text-center'>Search <span className='text-primary'>Doctors</span></h1>
      <p className='text-center my-2 '>Search Your Doctor And Book Appointment On One Click</p>
      <div className="flex w-full max-w-sm items-center my-2  gap-2  space-x-2">
        <Input type="text" placeholder="search ..." />
        <Button size={"sm"} type="submit"><SearchIcon className=' h-4'/>Search</Button>
      </div>
        <div className=' transition-all grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 my-4 px-8'>
          {categories?.map((category)=>{
            return(
              <div className='bg-[#617fd8] text-black hover:bg-primary cursor-pointer rounded-md flex flex-col justify-center items-center p-2'>
                <Image className=' hover:scale-110' key={category.id} src={category.attributes.image.data.attributes.url} alt={category.attributes.name} height={40} width={60}/>
                <label>{category.attributes.name}</label>
              </div>
             
            )
          })} 
        </div>
        
       
       
      
    </div>
  )
}

export default Search