"use client"
import DoctorList from '@/components/DoctorList'
import React from 'react'

function ExplorePage() {
  return (
    <div>
      <p className=' font-bold text-primary text-3xl mt-4 mb-8 ml-8'>Explore All Doctors</p>
      <div className=' my-8'>
        <DoctorList/>
      </div>
     
    </div>
  )
}

export default ExplorePage