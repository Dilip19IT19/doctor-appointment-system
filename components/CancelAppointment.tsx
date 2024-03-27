import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { CircleX } from 'lucide-react'

interface Iprop{
  onContinueClick:()=>{}
}

function CancelAppointment({onContinueClick}:Iprop) {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger><Button className=' gap-1 items-center hover:bg-red-400 border-[1px] border-red-700 hover:border-none  text-red-700 hover:text-red-900' variant={"outline"} size={"sm"}>Cancel <CircleX className='h-4 w-4' /></Button></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Your booked appointment will be canceled.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>onContinueClick()}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}

export default CancelAppointment