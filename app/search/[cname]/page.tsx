"use client";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GlobalAPI from '@/utils/GlobalAPI';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface Iprop{
  params:{
    cname:string
  }
}

interface IDoctor{
 
    id:number,
    attributes:{
      name:string,
      patients:string,
      experience:number,
      image:{
        data:{
          attributes:{
            url:string
          }
        }
      }
    }
  
}





function SearchPage({params}:Iprop) 
{

  let[doctors,setDoctors]=useState<IDoctor[]>();
  let[doctorIds,setDoctorIds]=useState<number[]>([]);
  
  useEffect(()=>{

    async function fetchDoctors(category:string)
    {
      const res=await GlobalAPI.getDoctorsByCategory(category);
      console.log(res.data?.data[0].attributes?.doctors?.data);
      setDoctors(res.data?.data[0]?.attributes?.doctors?.data);
     
    }

    fetchDoctors(params.cname);

  },[])

  


  return (
   <div className=' mx-4'>
      <p className="text-center my-8 text-xl tracking-wider">All <span className=' text-2xl text-blue-700'>{params.cname}</span> Doctors </p>
      <div className=' flex justify-around items-center flex-wrap gap-4'>
        {doctors?.map((doctor)=>{
          return(
            
            <div key={doctor.id} className= ' flex flex-col gap-2 justify-center items-center border-[1px] border-slate-700 shadow-md rounded-md py-1 px-2 '>
                <Image className=' hover:scale-105 transition-all cursor-pointer w-[200px] h-[200px]  aspect-auto  object-cover rounded-md shadow-lg my-2 ' height={200} width={400} src={doctor?.attributes?.image?.data?.attributes?.url} alt={doctor?.attributes?.name} />
                <Badge variant={"secondary"}>{doctor?.attributes?.name}</Badge>
                <p className=' text-primary'>Experience : {doctor.attributes.experience}</p>
                <p className=' text-primary'>Patients : {doctor.attributes.patients}</p>
              <Button size={"sm"} variant={"outline"} className=' my-2'>Book Now</Button>
              
             
            </div>
          )
        })}
      </div>

   </div>
  )
}

export default SearchPage