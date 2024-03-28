"use client"
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IDoctor } from './DoctorList';
import GlobalAPI from '@/utils/GlobalAPI';
import Link from 'next/link';
import { ScrollArea } from './ui/scroll-area';
import Image from 'next/image';
import { ThreeDots } from 'react-loader-spinner';

function SearchBar() {

  let [search,setSearch]=useState('');
  const[doctorsList,setDoctorsList]=useState<IDoctor[]>();
  let[isLoading,setIsLoading]=useState(false);

  useEffect(()=>{

    async function getDoctorsList() 
    {
      try 
      {
        setIsLoading(true);
        const res=await GlobalAPI.getDoctors();  
        //console.log(res.data?.data);
        setDoctorsList(res.data?.data);     
      } 
      catch (error) 
      {
          console.log("Error : "+error);
      }
      finally
      {
        setIsLoading(false);
      }
            
    }

    getDoctorsList();

  },[])

  return (
    <div>

      
      <Dialog>
        <DialogTrigger className='md:w-[300px] w-[150px] bg-transparent border-slate-700 border-[1px] hover:border-none rounded-md hover:bg-slate-700 px-2 md:px-4 py-1 '>
          Search Doctor...
        </DialogTrigger>
        <DialogContent >
          <DialogHeader className=' flex flex-col items-center gap-2'>
            <DialogTitle>
             <input type="text" placeholder='search you faviourate doctor...' className=' text-sm w-[250px]  md:w-[400px] p-2 rounded-md md:rounded-xl bg-secondary' value={search} onChange={(e)=>setSearch(e.target.value)} />
            </DialogTitle>
            <DialogDescription>

              {isLoading ? <ThreeDots width={50} height={50} color={'#4361ee'}/> : 
                <ScrollArea>
                  <div className='md:w-[400px] w-[250px] h-[250px] md:h-[400px] px-3 flex flex-col gap-2 items-center '>
                    {doctorsList?.filter((doctor)=>search.toLowerCase()==='' ? doctor : doctor.attributes.name.toLowerCase().includes(search)).map((doctor)=>{
                    return (
                      <Link className='border-secondary shadow-md transition-all border-[1px] hover:border-none  cursor-pointer active:scale-95 hover:bg-secondary flex  items-center justify-start gap-2 w-full p-2 rounded-md md:rounded-xl' href={`/details/${doctor.id}`}>
                        <Image className=' h-10 w-10 rounded-full' src={doctor.attributes.image.data.attributes.url} height={60} width={60} alt={doctor.attributes.name}/>
                        <label className=' cursor-pointer'> {doctor.attributes.name}</label>
                      
                      </Link>
                    )
                  })}
                  </div>
              </ScrollArea>}

             

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default SearchBar