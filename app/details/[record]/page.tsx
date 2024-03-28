  "use client"
import BookAppointment from '@/components/BookAppointment';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import GlobalAPI from '@/utils/GlobalAPI';
  import { GraduationCap, LocateIcon, MapPin, PersonStanding, Phone } from 'lucide-react';
  import Image from 'next/image';
  import Link from 'next/link';
  import React, { useEffect, useState } from 'react'
import { RevolvingDot, Rings } from 'react-loader-spinner';

  interface Iprop{
    params:{
      record:number
    }
  }

  interface IDoctorInfo{
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

  


  function DetailsPage({params}:Iprop) {

    let[doctorInfo,setDoctorInfo]=useState<IDoctorInfo>();
    let[isLoading,setIsLoading]=useState(false);
   
    useEffect(()=>{

      async function fetchDoctorInformation(id:number)
      {
        try {
          setIsLoading(true);
          const res=await GlobalAPI.getDoctorById(id);
          //console.log(res.data.data[0]);
          setDoctorInfo(res.data.data[0])
          
        } catch (error) {
          console.log(error);
        }
        finally
        {
          setIsLoading(false);
        }
       
      }

      fetchDoctorInformation(params.record);   
      

  },[])

  

    function findTime(time:string | undefined):string
    {
      let tArray=time?.split(":");
      let hr= tArray ? Number.parseInt(tArray[0]) : 0;
      let min=tArray? Number.parseInt(tArray[1]) : 0;
      if(hr>=0 && hr<=11 && min>=0 && min<=59)
      {
        
        return (`${hr}:${min} A.M`);
      }
      else if(hr==12 && min>=0 && min<=59)
      {
        return(`${hr}:${min} P.M`);
      }
      else
      {
        return (`${hr-12}:${min} P.M`);
      }
      
    }

    return (
      <div className=' p-5 md:px-20'>

        {isLoading ? <div className=' flex w-full h-screen justify-center items-center'><Rings color='#2853d9' width={100} height={100}/> </div> : <div className=' grid md:grid-cols-4 grid-cols-1'>

{/* doctor details */}

<div className=' md:col-span-3 col-span-1'>

  <div className=' flex flex-wrap gap-12 items-center shadow-lg rounded-lg border-secondary p-2 md:p-6 border-[1px]'>

    {doctorInfo &&  <Image 
      className=' md:h-[360px] h-[400px]  rounded-lg object-cover '
      src={ doctorInfo?.attributes.image.data.attributes.url} 
      alt={doctorInfo?.attributes.name} width={350} height={260} />}
  
    <div className=' flex  items-start  flex-col gap-8'>
      <h1 className=' md:text-3xl text-xl font-bold  text-primary'>{doctorInfo?.attributes.name}</h1>
      <div className=' flex flex-wrap items-center gap-12'>

        <div className=' flex flex-col gap-4 items-start'>
          <div className=' flex justify-center items-center gap-1'>
            <GraduationCap className='text-primary'/>{doctorInfo?.attributes.experience} years of Experience
          </div>
          <div  className=' flex justify-center items-center gap-1'>
            <MapPin className='text-primary'/>{doctorInfo?.attributes.address}
          </div>
          <div  className=' flex justify-center items-center gap-1'>
            <PersonStanding className=' text-primary'/>{doctorInfo?.attributes.patients}+ patients checked
          </div>
          <div className='flex justify-center items-center gap-1'>
            <Phone className='text-primary'/> {doctorInfo?.attributes.phone}
          </div>

          <Badge variant={"secondary"}>{doctorInfo?.attributes.category.data.attributes.name}</Badge>
        </div>
        

      </div>
    
      <BookAppointment id={doctorInfo?.id} />
      
    </div>

  </div>

  <div className= ' mt-4 shadow-lg rounded-lg border-secondary p-2 md:p-6 border-[1px]'>
    <h1 className=' font-bold md:text-xl text-lg text-primary mb-2 mt-1'>About Me</h1>
    <p>{doctorInfo?.attributes.about}</p>
  </div>

  

</div>

</div> }
    
             

      </div>
    )
  }

  export default DetailsPage