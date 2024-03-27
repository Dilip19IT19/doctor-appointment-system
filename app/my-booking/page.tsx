"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingLists from '@/components/BookingLists'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/server';
import GlobalAPI from '@/utils/GlobalAPI';
import { Oval} from "react-loader-spinner"
import moment from 'moment';


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
  let[isLoading,setIsLoading]=useState(false);

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
    try
    {
      setIsLoading(true);
      const res=await GlobalAPI.getAppointmentsList(email);
      //console.log(res.data.data);
      setBookingList(res.data?.data); 

    }
    catch(error)
    {
      console.log(error);
    }
    finally
    {
      setIsLoading(false);
    }
    
  }

  useEffect(()=>{   

    getBookingList(user?.email);

  },[user])

  function filterBookingList(type:string)
  {
    const result=bookingList?.filter((item)=>(
      type=='upcoming' ? moment(new Date(item.attributes.date)).format("DD-MM-YYYY") >= moment(new Date()).format("DD-MM-YYYY")  :  moment(new Date(item.attributes.date)).format("DD-MM-YYYY") < moment(new Date()).format("DD-MM-YYYY")
    ))
    console.log("result")
    console.log(result);
    return result;
   
  }
  
  return (
    <div>
      <p className=' ml-4 text-2xl text-primary font-bold my-4'>My Bookings</p>
      {isLoading ? <div className=' w-full h-screen flex items-center justify-center'><Oval height={50} width={50} color='#16b2f2'/></div>  :  <Tabs defaultValue="upcoming" className="w-full mt-5 p-4">
        <TabsList className='w-full gap-5 justify-start'>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming"><BookingLists updateRecord={()=>getBookingList(user?.email)} appointmentList={filterBookingList('upcoming')} isExpired={false}  /></TabsContent>
        <TabsContent value="expired"><BookingLists updateRecord={()=>getBookingList(user?.email)} appointmentList={filterBookingList('expired')} isExpired={true}  /></TabsContent>
      </Tabs>}
      
     

    </div>
  )
}

export default MyBookingPage