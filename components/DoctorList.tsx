import GlobalAPI from '@/utils/GlobalAPI';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from './ui/button';
import { Skeleton } from "@/components/ui/skeleton"


interface IDoctor
{
  id:number,
  attributes:{
    name:string,
    address:string,
    patients:string,
    experience:number,
    startTime:string,
    endTime:string,
    about:string,
    phone:string,
    premium:boolean,
    image:{
      data:{
        attributes:{
          url:string
        }
      }
    },
    category:{
      data:{
        attributes:{
          name:string
        }
      }
    }
  }
}

function DoctorList() {

  const[doctorsList,setDoctorsList]=useState<IDoctor[]>();
  let[isLoading,setIsLoading]=useState(true);
  useEffect(()=>{

    async function getDoctorsList() 
    {
      const res=await GlobalAPI.getDoctors();  
      console.log(res.data?.data);
      setDoctorsList(res.data?.data);
      setIsLoading(false);
      
    }

    getDoctorsList();

  },[])

  return (
    <div >
      <div className=' grid grid-cols-3 gap-4 '>{ isLoading? [1,2,3,4,5,6].map((item,idx)=>{
        return(
          <Skeleton>
            <div className='w-[250px] h-[140px] rounded-md'></div>           
            
          </Skeleton>
        )
      }) : doctorsList?.map((doctor)=>{
        return(
         <div className='border-[1px] border-slate-700 rounded-md px-3 py-2'>
        
              <Image className=' hover:scale-105 transition-all cursor-pointer h-[200px] w-full aspect-auto  object-cover rounded-md shadow-lg my-2 ' height={200} width={400} src={doctor.attributes.image.data.attributes.url} alt={doctor.attributes.name} />
             <label className=''>{doctor.attributes.name}</label>
             <div className=' flex md:flex-row flex-col md:gap-0 gap-4  md:justify-between my-2 items-center'>
              <Button size={"sm"}>Book Now</Button>
              <Badge variant={"secondary"}>{doctor.attributes.category.data.attributes.name}</Badge>
             </div>
         </div>
          
        )
      })}</div>
    </div>
  )
}

export default DoctorList