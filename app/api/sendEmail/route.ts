import { Resend } from 'resend';

import { NextRequest, NextResponse } from 'next/server';
import EmailTemplate from '@/emails';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req:NextRequest){

  const response=await req.json();
  try
  {
    const data=await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [response.data.email],
      subject: 'Appointment Booking Confirmation',
      react:EmailTemplate({username:response.data.username})
    });
    return NextResponse.json({data});
  }
  catch(error)
  {
    return NextResponse.json({ErrorMessage:error});
  }

}