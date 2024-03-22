"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingLists from '@/components/BookingLists'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/server';
import GlobalAPI from '@/utils/GlobalAPI';


export interface IAppointments{
  id:number,
  attributes:{
    date:Date,
    time:string,
    doctor:{
      data:{
        id:number,
        attributes:{
          name:string,
          address:string,
          image:{
            data:{
              attributes:{
                url:string
              }
            }
          }
  
        }
      }
    }

  }
 
}


function MyBookingPage() {

  const[user,setUser]=useState<KindeUser>();
  let[bookingList,setBookingList]=useState<IAppointments[]>(); 

  useEffect(() => {
    const getKindeSession = async () => {
      const res = await fetch("/api/kindeSession");
      const data = await res.json();
      setUser(data.user);
    };

    getKindeSession();

   
   
  }, []);

  async function getBookingList(email:any) 
  {
    const res=await GlobalAPI.getAppointmentsList(email);
    console.log(res.data.data);;
    setBookingList(res.data?.data);  
  }

  useEffect(()=>{   

    getBookingList(user?.email);

  },[user])

  function filterBookingList(type:string)
  {
    const result=bookingList?.filter((item)=>(
      type=='upcoming' ? new Date(item.attributes.date)>=new Date() : new Date(item.attributes.date)< new Date()
    ))
    console.log("result")
    console.log(result);
    return result;
   
  }
  
  return (
    <div>
      <p className=' ml-4 text-2xl font-bold my-4'>My Bookings</p>
      <Tabs defaultValue="upcoming" className="w-full mt-5 p-4">
        <TabsList className='w-full gap-5 justify-start'>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming"><BookingLists updateRecord={()=>getBookingList(user?.email)} appointmentList={filterBookingList('upcoming')} isExpired={false}  /></TabsContent>
        <TabsContent value="expired"><BookingLists updateRecord={()=>getBookingList(user?.email)} appointmentList={filterBookingList('expired')} isExpired={true}  /></TabsContent>
      </Tabs>

    </div>
  )
}

export default MyBookingPage