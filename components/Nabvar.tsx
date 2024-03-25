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
import { Menu } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"



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
      <nav className=' flex items-center py-2 px-4 justify-between border-b-[1px] light:border-slate-700 dark:border-slate-700  '>

        <div className='md:hidden block'>

          <Sheet>
            <SheetTrigger>
              <Menu className='md:hidden block h-9 w-9 text-primary'/>
            </SheetTrigger>
            <SheetContent className='w-44' side={"left"}>
              <SheetHeader>
                <SheetTitle>
                
                </SheetTitle>
                <SheetDescription>
                <ul className='flex flex-col items-start justify-center gap-5 '>
                <Image className='my-2' src="/logo.svg" alt="logo" height={30} width={30} />
                  {menus.map((menu)=>{
                    return(
                      <Link className='text-primary text-sm ' key={menu.id} href={menu.href}>
                        <li>{menu.title}</li>
                      </Link>              
                    )
                  })}
                  {!authStatus? <div className=' text-primary flex flex-col gap-4 items-start justify-center'> <RegisterLink>Sign Up</RegisterLink> <LoginLink>Login</LoginLink>  </div>: ""}
                </ul>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

        </div>
     
        
        <Image className='md:block hidden' src="/logo.svg" alt="logo" height={35} width={30} />
        <ul className=' hidden md:flex items-center gap-8 '>
          {menus.map((menu)=>{
            return(
              <Link className='hover:text-primary text-sm md:text-lg hover:scale-105 transition-all ease-in-out' key={menu.id} href={menu.href}>
                <li>{menu.title}</li>
              </Link>              
            )
          })}
        </ul>
        {authStatus ?  (<div className=' flex gap-2 items-center'>
          
         
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

          <DarkModeToggle classname='md:mx-4 mx-1'/>
        </div>):  (<div className=' hidden md:flex gap-8 items-center'>
          <LoginLink><Button  variant={"outline"}>Login</Button></LoginLink>
          <RegisterLink><Button size={"sm"}>Sign Up</Button></RegisterLink>
          
        </div>) }
       
       {!authStatus &&  <DarkModeToggle classname='mx-4'/> }
       
      </nav>
    </>
  )
}

export default Nabvar

function useKindeBrowserClient(): { isAuthenticated: any; isLoading: any } {
  throw new Error('Function not implemented.')
}
