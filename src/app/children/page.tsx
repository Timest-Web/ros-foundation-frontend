import ChildrenHomeView from '@/views/children/home'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'


export default async function ChildrenHomePage() {
  const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== 'children') {
    redirect('/children/sign-in'); 
  }
  return (
    <ChildrenHomeView/>
  )
}
