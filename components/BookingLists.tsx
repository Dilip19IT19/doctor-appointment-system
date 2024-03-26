"use client"
import { IAppointments } from '@/app/my-booking/page'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { Calendar, CalendarDaysIcon, Clock, LocateFixedIcon, LocateIcon, MapPin } from 'lucide-react'
import moment from "moment"
import CancelAppointment from './CancelAppointment'
import GlobalAPI from '@/utils/GlobalAPI'
import { useToast } from './ui/use-toast'
import UpdateAppointment from './UpdateAppointment'


interface prop{
  appointmentList:IAppointments[] | undefined,
  isExpired:boolean,
  updateRecord:()=>{}
}

function BookingLists({appointmentList,isExpired,updateRecord }:prop) {

  const { toast } = useToast()
  console.log("Appointments");
  console.log(appointmentList);

  async function onDeleteBooking(item:IAppointments)
  {
    const res=await GlobalAPI.deleteAppointment(item.id);
    if(res)
    {
      toast({
        title: `Your appointment has been successfully canceled`,
      })
      updateRecord();
    }
  }

  async function DeleteAppointment(id:number)
  {
    const res=await GlobalAPI.deleteAppointment(id);
    if(res)
    {
      toast({
        title: `Your expired appointment has been successfully deleted`,
      })
      updateRecord();
    }
  }
  
  return (
    <div className=' flex flex-col gap-4 my-5 items-start '>

      {appointmentList?.length==0 ? <div className=' text-red-400 w-full tracking-wide text-center'>No appointments...</div> : appointmentList?.map((appointment)=>{
        return(
          <div key={appointment.id} className=' w-full p-2 flex flex-wrap gap-4 justify-around items-center border-[2px] border-secondary rounded-md'>
           
            <Image className=' h-[250px] w-[250px] rounded-md' 
              src={appointment?.attributes.doctor.data.attributes.image.data.attributes.url} 
              height={250} width={250} alt=''/>
            
            <div className=' flex flex-col gap-4'>
            <h1 className=' font-bold text-lg mb-2'>{appointment.attributes.doctor.data.attributes.name}</h1>
              <div className=' break-words flex items-center gap-2'>
                <MapPin className='text-xs text-primary'/>{appointment.attributes.doctor.data.attributes.address}
              </div>
              <div className=' flex items-center gap-2'>
                <CalendarDaysIcon className='text-xs text-primary'/>Appointment on {moment(appointment.attributes.date).format("DD-MMM-YYYY")}
              </div>

              <div className=' flex items-center gap-2'>
               <Clock className=' text-xs text-primary'/>At {appointment.attributes.time}
              </div>

            </div>
            {!isExpired && <div className='flex flex-col justify-center gap-6'>
               <CancelAppointment  onContinueClick={()=>onDeleteBooking(appointment)} /> 
               <UpdateAppointment onContinueClick={()=>updateRecord()} Appointment={appointment}/>
               </div> }
            {isExpired && <Button variant={"destructive"} onClick={()=>DeleteAppointment(appointment.id)}>Delete Appointment</Button>}
                    

          </div>
        )
      })}

     

    </div>
  )
}

export default BookingLists