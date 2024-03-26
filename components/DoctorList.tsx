import GlobalAPI from '@/utils/GlobalAPI';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from './ui/button';
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link';


export interface IDoctor
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
      <div className=' flex flex-wrap gap-8 items-center justify-around '>{ isLoading? [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((item,idx)=>{
        return(
          <Skeleton key={idx}>
            <div className='w-[250px] h-[200px] rounded-md'></div>         
            
          </Skeleton>
        )
      }) : doctorsList?.map( (doctor)=>{
        return(
         <div key={doctor.id} className='border-[1px] hover:border-primary border-secondary shadow-xl rounded-xl px-3 py-2'>
        
              <Image className=' hover:scale-105 transition-all cursor-pointer h-[280px] w-[220px] aspect-auto  object-cover rounded-md shadow-lg my-2 ' height={290} width={250} src={doctor.attributes.image.data.attributes.url} alt={doctor.attributes.name} />
             <label className=''>{doctor.attributes.name}</label>
             
             <div className=' flex md:flex-row flex-col md:gap-0 gap-4  md:justify-between my-2 items-center'>
             <Link href={`/details/${doctor.id}`}>
                <Button  size="sm">
                  Book Now
                </Button>
              </Link>
              <Badge variant={"secondary"}>{doctor.attributes.category.data.attributes.name}</Badge>
             </div>
         </div>
          
        )
      })}</div>
    </div>
  )
}

export default DoctorList