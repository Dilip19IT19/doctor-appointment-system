"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { DarkModeToggle } from './DarkModeToggle'
import {   KindeUser, LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server'
import { Button } from './ui/button'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


function Nabvar() {
 
  const[user,setUser]=useState<KindeUser>();
  const [authStatus, setAuthStatus] = useState(null);
 

 

  useEffect(() => {
    const getKindeSession = async () => {
      const res = await fetch("/api/kindeSession");
      const data = await res.json();
      setUser(data.user);
			setAuthStatus(data.authenticated);
      console.log("picture : "+user?.picture)
    };

    getKindeSession();
  }, []);

  const menus=[
    {
      id:1,
      title:"Home",
      href:"/"
    },
    {
      id:2,
      title:"Explore",
      href:"/explore"
    },
    {
      id:3,
      title:"About Us",
      href:"/about"
    }
  ]

  return (
    < >
      <nav className=' flex items-center py-2 px-4 justify-between  shadow-sm  shadow-secondary'>
        <Image src="/logo.svg" alt="logo" height={35} width={30} />
        <ul className=' hidden md:flex items-center gap-8 '>
          {menus.map((menu)=>{
            return(
              <Link className='hover:text-primary md:text-lg hover:scale-105 transition-all ease-in-out' key={menu.id} href={menu.href}>
                <li>{menu.title}</li>
              </Link>              
            )
          })}
        </ul>
        {authStatus ?  (<div className=' flex gap-8 items-center'>
          
         
          <Popover>
            <PopoverTrigger className=' cursor-pointer p-2 rounded-full bg-secondary'>
              
                <label className='text-primary'>{user?.given_name?.toUpperCase().charAt(0)}{user?.family_name?.toUpperCase().charAt(0)}</label>
              
            </PopoverTrigger>
            <PopoverContent className=' shadow-md  w-40 flex gap-4 flex-col items-center'>
              <Link className=' w-full text-center px-2 py-1 rounded-md hover:bg-secondary ' href={'/profile'}>Profile</Link>
              <Link className='  w-full text-center px-2 py-1 rounded-md hover:bg-secondary ' href={'/my-booking'}>My Booking</Link>
              <LogoutLink><Button variant={"destructive"} size={"sm"}>Log Out</Button></LogoutLink>
            </PopoverContent>
          </Popover>

          <DarkModeToggle classname='mx-4'/>
        </div>):  (<div className=' flex gap-8 items-center'>
          <LoginLink><Button  variant={"outline"}>Login</Button></LoginLink>
          <RegisterLink><Button size={"sm"}>Sign Up</Button></RegisterLink>
          <DarkModeToggle classname='mx-4'/>
        </div>) }
       
        
       
      </nav>
    </>
  )
}

export default Nabvar

function useKindeBrowserClient(): { isAuthenticated: any; isLoading: any } {
  throw new Error('Function not implemented.')
}
