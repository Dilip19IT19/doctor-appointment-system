import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

function Hero() {
  return (
  <section>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
          <img
            alt=""
            src="/doctors.png"
            className="absolute inset-0 h-full w-full object-cover "
          />
        </div>

        <div className="lg:py-24">
          <h2 className="text-3xl font-bold tracking-wider sm:text-4xl "> Find & Book <span className=' text-primary'>Appointment</span>  with your faviourate <span className='text-primary'>Docter</span> </h2>

          <p className="mt-8">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, eum dolorum, facilis eius iste suscipit tempora quas nostrum voluptate voluptatum quam beatae reprehenderit odit atque dignissimos enim laudantium in architecto.
          </p>

          <Link href={`/api/auth/login`}><Button className=' mt-8'>Get Started Today</Button></Link>

         
        </div>
      </div>
    </div>
  </section>
  )
}

export default Hero