"use client"
import { IAppointments } from '@/app/my-booking/page'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { Calendar, CalendarDaysIcon, Clock, LocateFixedIcon, LocateIcon, MapPin, Trash2 } from 'lucide-react'
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
    <div className=' flex flex-col gap-4 my-5  '>

      {appointmentList?.length==0 ? <div className=' text-red-400 w-full tracking-wide text-center'>No appointments...</div> : appointmentList?.map((appointment)=>{
        return(
          <div key={appointment.id} className=' w-full md:p-4 p-2 flex md:flex-row flex-col gap-2 md:gap-4   md:justify-between  md:items-center border-[1px] border-secondary rounded-md'>

            <div className='flex flex-row justify-start  items-center gap-4'>

              <Image className=' md:h-[130px] md:w-[120px] h-[100px] w-[100px] rounded-full ' 
                src={appointment?.attributes.doctor.data.attributes.image.data.attributes.url} 
                height={250} width={250} alt=''/>
              
                <div className=' flex flex-col gap-4'>

                  <h1 className=' font-bold text-lg mb-2'>{appointment.attributes.doctor.data.attributes.name}</h1>
                    <div className=' break-words flex items-center gap-2'>
                      <MapPin className='h-6 w-6 text-xs text-primary'/>{appointment.attributes.doctor.data.attributes.address}
                    </div>
                    <div className=' flex items-center gap-2'>
                      <CalendarDaysIcon className=' h-6 w-6 text-xs text-primary'/>Appointment on {moment(appointment.attributes.date).format("DD-MMM-YYYY")}
                    </div>

                    <div className=' flex items-center gap-2'>
                    <Clock className='h-6 w-6 text-xs text-primary'/>At {appointment.attributes.time}
                    </div>

                </div>

            </div>
           
           
            {!isExpired && <div className='flex md:flex-col flex-row items-center justify-start md:justify-center  gap-4 md:gap-6'>
             
               <UpdateAppointment onContinueClick={()=>updateRecord()} Appointment={appointment}/>
               <CancelAppointment  onContinueClick={()=>onDeleteBooking(appointment)} /> 
               </div> }
            {isExpired && <Button className='flex gap-1 items-center' variant={"destructive"} onClick={()=>DeleteAppointment(appointment.id)}>Delete<Trash2 className='h-4 w-4'/></Button>}
                    

          </div>
        )
      })}

     

    </div>
  )
}

export default BookingLists