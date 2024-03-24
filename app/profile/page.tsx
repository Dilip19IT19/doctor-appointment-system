"use client"
import { Button } from '@/components/ui/button'
import { KindeUser, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server'
import React, { useEffect, useState } from 'react'

function ProfilePage() {

  const [user,setUser]=useState<KindeUser>();

  useEffect(() => {
    const getKindeSession = async () => {
      const res = await fetch("/api/kindeSession");
      const data = await res.json();
      setUser(data.user);
			
      
    };

    getKindeSession();
  }, []);

  return (
    <div className=' w-full my-16 flex justify-center items-center'>
      <div className=' flex flex-col gap-4 justify-center items-center'>

      <p className='font-bold'>Hi <span className='md:text-xl text-lg text-primary'>{user?.given_name} {user?.family_name}</span></p>
     <Button variant={"destructive"}><LogoutLink>Log out</LogoutLink></Button> 

      </div>
      
    </div>
  )
}

export default ProfilePage