import ChildrenHomeView from '@/views/children/home'
import { getServerSession } from 'next-auth'
import React from 'react'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/authOptions'


export default async function ChildrenHomePage() {
  const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== 'children') {
    redirect('/children/sign-in'); 
  }
  return (
    <ChildrenHomeView/>
  )
}
