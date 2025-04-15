import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Slidebar'
import UserList from '@/components/UserList'
import React from 'react'

const page = () => {
  return (
    <div className="flex">
    
    <Sidebar />
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Restaurant Dashboard</h1>
      <div className="">
        <UserList/>
      </div>
    </div>
  </div>
  )
}

export default page