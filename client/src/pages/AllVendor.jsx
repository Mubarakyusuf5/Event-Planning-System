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
        <div className="flex justify-between items-center mb-6">
            <h1 className='text-3xl font-bold font-poppins text-[#00539c] mb-6'>Vendor Search</h1>
            {/* <button onClick={() => setShowModal(true)} className="py-2 px-4 bg-[#eea47f] text-white rounded-lg hover:bg-[#e8956f] transition-colors flex items-center">
              <PlusIcon className="w-5 h-5 mr-2" />
              Create User
            </button> */}
          </div>
          
          
        </main>
      </div>
    </div>
  )
}


