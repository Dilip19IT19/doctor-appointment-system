import CategoryList from '@/components/CategoryList'
import React from 'react'

interface ILayout{
  children:React.ReactNode
}

function layout({children}:ILayout) {
  return (
    <div className=' grid grid-cols-4'>
      <div>
        {/* categories list */}
        <CategoryList/>
      </div>
      <div className=' col-span-3'>
        {children}
      </div>
    </div>
  )
}

export default layout