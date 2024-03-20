import { Button } from '@/components/ui/button'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server'
import React from 'react'

function ProfilePage() {
  return (
    <div>
      <p>Profile page</p>
     <Button variant={"destructive"}><LogoutLink>Log out</LogoutLink></Button> 
    </div>
  )
}

export default ProfilePage