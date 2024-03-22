  "use client"
import BookAppointment from '@/components/BookAppointment';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import GlobalAPI from '@/utils/GlobalAPI';
  import { GraduationCap, LocateIcon, MapPin, PersonStanding, Phone } from 'lucide-react';
  import Image from 'next/image';
  import Link from 'next/link';
  import React, { useEffect, useState } from 'react'

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
   
    useEffect(()=>{

      async function fetchDoctorInformation(id:number)
      {
        const res=await GlobalAPI.getDoctorById(id);
        //console.log(res.data.data[0]);
        setDoctorInfo(res.data.data[0])
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
    
        <div className=' grid md:grid-cols-4 grid-cols-1'>

          {/* doctor details */}

          <div className=' col-span-3    '>

            <div className=' flex gap-12 items-center shadow-lg rounded-lg border-slate-700 p-2 md:p-6 border-[1px]'>

              {doctorInfo &&  <Image 
                className=' h-[260px]  rounded-lg object-cover '
                src={ doctorInfo?.attributes.image.data.attributes.url} 
                alt={doctorInfo?.attributes.name} width={200} height={260} />}
            
              <div className=' flex  items-start  flex-col gap-6'>
                <h1 className=' text-2xl font-bold  text-primary'>{doctorInfo?.attributes.name}</h1>
                <div className=' flex flex-wrap items-center gap-12'>

                  <div className=' flex flex-col gap-4 items-start'>
                    <div className=' flex justify-center items-center gap-1'>
                      <GraduationCap/>{doctorInfo?.attributes.experience} of Experience
                    </div>
                    <div  className=' flex justify-center items-center gap-1'>
                      <MapPin/>{doctorInfo?.attributes.address}
                    </div>
                    <div  className=' flex justify-center items-center gap-1'>
                      <PersonStanding/>{doctorInfo?.attributes.patients} checked
                    </div>
                    <Badge variant={"secondary"}>{doctorInfo?.attributes.category.data.attributes.name}</Badge>
                  </div>

                  <div className='flex flex-col gap-6 items-start'>
                    <div className='flex justify-center items-center gap-1'>
                      <Phone/> {doctorInfo?.attributes.phone}
                    </div>
                    <p>From : {findTime(doctorInfo?.attributes.startTime)}</p>
                    <p>To : {findTime(doctorInfo?.attributes.endTime)}</p>

                  </div>


                  

                </div>
              
                <BookAppointment id={doctorInfo?.id} />
                
              </div>

            </div>

            <div className= ' mt-4 shadow-lg rounded-lg border-slate-700 p-2 md:p-6 border-[1px]'>
              <h1 className=' font-bold text-xl mb-2 mt-1'>About Me</h1>
              <p>{doctorInfo?.attributes.about}</p>
            </div>

            
          
          </div>

          {/* doctors suggestions */}
          
          {/* <div className=' col-span-1 mx-4 px-2 border-l-[1px] border-secondary  h-screen'>
          <p className=' mb-4 text-xl'>Suggestion</p>
          <div className=' flex flex-col items-start  gap-4'>
            {doctors?.map((doctor)=>{
              return(
                <Link className='border-[2px] hover:bg-secondary text-primary p-2  border-secondary rounded-md' href={`/details/${doctor.id}`} key={doctor.id} >
                  <div className=' flex items-center gap-2'>
                    <Image className=' rounded-sm'  src={doctor.attributes.image.data.attributes.url} alt={doctor.attributes.name} height={40} width={60} />
                    <p>{doctor.attributes.name}</p>
                  </div>
                </Link>
                
              )
            })}
          </div>
        
        </div>
         */}

        </div>

      

      </div>
    )
  }

  export default DetailsPage