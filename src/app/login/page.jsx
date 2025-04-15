import LoginForm from '@/components/LoginForm'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <Navbar/>
    <div><LoginForm/></div>
    </>
  )
}

export default page