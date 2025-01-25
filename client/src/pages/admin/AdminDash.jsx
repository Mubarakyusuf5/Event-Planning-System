import React, { useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { 
  UserGroupIcon, 
  CalendarIcon, 
  CurrencyDollarIcon,
  BellIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { NavbarOrg } from '../../components/Navbar/NavbarOrg'

const stats = [
  { name: 'Users', value: '50', icon: UserGroupIcon },
  { name: 'Vendors', value: '5', icon: CalendarIcon },
  { name: 'Requests', value: '5', icon: CalendarIcon },
  { name: "Today's Request", value: '5', icon: CalendarIcon },
  // { name: 'Revenue', value: '$12,345', icon: CurrencyDollarIcon },
]

const recentActivity = [
  { id: 1, name: 'Summer Music Festival', action: 'New registration', date: '3 mins ago' },
  { id: 2, name: 'Tech Conference 2023', action: 'Updated details', date: '2 hours ago' },
  { id: 3, name: 'Charity Run', action: 'New event created', date: '1 day ago' },
]
export const AdminDash = () => {
  const [isOpen, setIsOpen] = useState(false)
const  handleToggle = ()=>{
  setIsOpen(prevIsOpen => !prevIsOpen)
}
  return (
    <div className='bg-gray-50 flex min-h-screen'>
      <Sidebar isOpen={isOpen} />
      <div className='flex-1 flex flex-col lg:ml-[270px]'>
        <NavbarOrg onclick={handleToggle} />
        <main className='flex-1 p-6 bg-gray-50'>
          <h1 className='text-3xl font-bold text-[#00539c] mb-6'>Dashboard</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            {stats.map((item) => (
              <div key={item.name} className='bg-white p-6 rounded-xl shadow-md'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-gray-500 text-sm'>{item.name}</p>
                    <p className='text-2xl font-bold text-[#00539c]'>{item.value}</p>
                  </div>
                  <item.icon className='w-12 h-12 text-[#eea47f]' />
                </div>
              </div>
            ))}
          </div>
          {/* <div className='bg-white rounded-xl shadow-md p-6'>
            <h2 className='text-xl font-semibold text-[#00539c] mb-4'>Recent Activity</h2>
            <ul className='divide-y divide-gray-200'>
              {recentActivity.map((item) => (
                <li key={item.id} className='py-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium text-[#00539c]'>{item.name}</p>
                      <p className='text-sm text-gray-500'>{item.action}</p>
                    </div>
                    <p className='text-sm text-[#eea47f]'>{item.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div> */}
        </main>
      </div>
    </div>
  )
}
