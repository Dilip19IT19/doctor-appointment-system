"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DarkModeToggle } from './DarkModeToggle'

function Nabvar() {
  

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
      <nav className=' flex items-center p-2 justify-between  shadow-sm  shadow-secondary'>
        <Image src="/logo.svg" alt="logo" height={80} width={150} />
        <ul className=' hidden md:flex items-center gap-8 '>
          {menus.map((menu)=>{
            return(
              <Link className='hover:text-primary md:text-lg hover:scale-105 transition-all ease-in-out' key={menu.id} href={menu.href}>
                <li>{menu.title}</li>
              </Link>              
            )
          })}
        </ul>
        <DarkModeToggle classname='mx-4'/>
      </nav>
    </>
  )
}

export default Nabvar