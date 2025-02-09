import React, { useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { 
  UserGroupIcon, 
  CalendarIcon, 
  CurrencyDollarIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline'
import { NavbarOrg } from '../../components/Navbar/NavbarOrg'
import { useAuth } from '../../Context/AuthContext'


export const VendorDash = () => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
const  handleToggle = ()=>{
  setIsOpen(prevIsOpen => !prevIsOpen)
}

const handleLogout = ()=>{
  logout()
}

  return (
    <div className="bg-gray-50 flex min-h-screen">
      <Sidebar isOpen={isOpen} />
      <div className="flex-1 flex flex-col lg:ml-[270px]">
        <NavbarOrg onclick={handleToggle} />
        <main className="flex-1 p-6 bg-gray-50 flex items-center justify-center">
          {" "}
          {/* Added flex, items-center, and justify-center */}
          <div className="flex gap-2 flex-col items-center justify-center max-w-2xl text-center">
            {" "}
            {/* Added max-w-2xl and text-center for better readability */}
            <div className="font-semibold text-2xl">
              Thank you for registering on our platform! We look forward to supporting your business as it continues to
              grow with us.
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 font-medium text-[18px] duration-300 transition-all hover:bg-red-600 text-white py-3 px-6 rounded-lg flex gap-2 items-center"
            >
              <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
              Logout
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}


