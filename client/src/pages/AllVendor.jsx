import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { NavbarOrg } from '../components/Navbar/NavbarOrg'


export const AllVendor = () => {
  return (
    <div className='bg-gray-50 flex min-h-screen font-roboto'>
      <Sidebar />
      <div className='flex-1 flex flex-col lg:ml-[270px]'>
        <NavbarOrg />
        <main className='flex-1 p-6 bg-gray-50'>
          <h1 className='text-3xl font-bold font-poppins text-[#00539c] mb-6'>Dashboard</h1>
          
          
        </main>
      </div>
    </div>
  )
}


