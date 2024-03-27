"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock } from 'lucide-react'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/server'
import GlobalAPI from '@/utils/GlobalAPI'
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from './ui/toast'
import {TailSpin} from "react-loader-spinner"
import moment from 'moment'





type Tprop={
  id:number | undefined
}

function BookAppointment({id}:Tprop) {
  const [date, setDate] =useState<Date | undefined>(new Date());
  let[timeSlots,setTimeSlots]=useState<string[]>([]);
  let[selectedSlot,setSelectedSlot]=useState("");
  let[user,setUser]=useState<KindeUser>();
  const { toast } = useToast();
  let[isLoading,setIsLoading]=useState(false);

  useEffect(()=>{
    function getTime()
    {
      const timeList:string[]=[];
      for(let i=9;i<12;i++)
      {
        timeList.push(i+":00 A.M");
        timeList.push(i+":30 A.M");
      }
      timeList.push("12:00 P.M");
      timeList.push("12:30 P.M");
      for(let i=1;i<=8;i++)
      {
        timeList.push(i+":00 P.M");
        timeList.push(i+":30 P.M");
      }
      setTimeSlots(timeList);
    }

    const getKindeSession = async () => {
      const res = await fetch("/api/kindeSession");
      const data = await res.json();
      setUser(data.user);
      
    };

    getKindeSession();

    getTime();

   

  },[])

  function isPastDay(day:any)
  {
    return day<new Date()
  }

  async function saveBooking() 
  {
    
      const data={
        data:{
          email:user?.email,
          username:user?.given_name+" "+user?.family_name,
          date:date,
          time:selectedSlot,
          doctor:id
  
        }
      }

      try
      {
        setIsLoading(true);
        const checkRes=await GlobalAPI.isAppointmentAvailable(moment(date).format("DD-MM-YYYY"),selectedSlot,user?.email);
        if(checkRes.data.data[0])
        {
          
            toast({
              variant: "destructive",
              title: "You have already booked appointment on "+(moment(date).format("DD-MM-YYYY"))+" at "+selectedSlot,
              
            })
          
        }
        else
        {
          const res= await GlobalAPI.createAppointment(data);
          console.log(res);
          const response=await GlobalAPI.sendEmail(data);
          toast({
            title: `Your appointment has been booked on  ${date?.getDate()}/${date?.getMonth()}/${date?.getFullYear()} at ${selectedSlot}`,          
           
          })
        }
       
       
      }
      catch(err)
      {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          
        })
      }
      finally
      {
        setIsLoading(false);
      }
     
   
  }
  


  return (
    <div>
      <Dialog>
        <DialogTrigger className=' bg-primary md:p-[6px] p-1 active:scale-95 transition-all rounded-lg '>Book Appoitment</DialogTrigger>
        <DialogContent>
          <DialogHeader>
           
            <DialogDescription className=' grid grid-cols-1 md:grid-cols-2'>
              <div className=' flex flex-col gap-1 md:gap-4 items-start justify-center '>
                  <div className=' mb-1 flex items-center gap-2'>
                  <CalendarDays className='text-primary' /> Select date
                  </div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    
                    className="rounded-md  py-2 px-2 md:py-8 md:px-4 border-[2px] border-secondary"
                  />
                </div>

              <div className='   flex flex-col gap-1 md:gap-2 items-start'>

                <div className=' md:mt-0 mt-3 md:mb-3 flex gap-2 items-center'>
                  <Clock className='text-primary '/> Select time
                </div>

                <div className=' border-[2px] rounded-md border-secondary p-2 md:py-[22px] md:px-4  grid  md:grid-cols-3 grid-cols-8 gap-2 md:gap-4'>
                  {timeSlots.map((slot,idx)=>{
                    return(
                      <p 
                      key={idx}
                      onClick={()=>setSelectedSlot(slot)}
                      onDoubleClick={()=>setSelectedSlot("")}
                      className={ `${selectedSlot==slot ? "bg-primary  text-white scale-105" : ""} text-center cursor-pointer p-1 border-[1px] text-sm border-secondary md:rounded-2xl rounded-md hover:bg-primary hover:text-white`}>{slot}</p>
                    )
                  })}
                </div>

              </div>
             
           
            </DialogDescription>
            
          </DialogHeader>
          <DialogFooter className=" my-2 md:flex-row flex-col gap-4 sm:justify-end">
          <Button 
          onClick={saveBooking}
            className='active:scale-90 transition-all gap-2' 
           disabled={!(date && selectedSlot)}
            variant="default">
              Submit
              {isLoading ? <TailSpin height={20} width={20} color="#EBE9FC" /> :""}
          </Button>
          <DialogClose asChild>
            <Button className='active:scale-90 transition-all' type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
          
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default BookAppointment


