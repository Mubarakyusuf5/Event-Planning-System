import React from 'react'
import { CalendarDaysIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export const EventCard = () => {
  return (
    <Link to="/">
    <div className='min-h-[300px] w-[280px] bg-[#00539cff] rounded-xl overflow-hidden shadow-lg'>
      <div className='h-[190px] rounded-b-xl bg-blue-50 overflow-hidden'>
        <img src="/placeholder.svg?height=190&width=280" alt="Event" className='object-cover h-full w-full rounded-b-xl' />
      </div>
      <div className='p-4 text-white'>
        <h3 className='font-poppins text-lg font-medium mb-2'>Kano Business Expo 2024</h3>
        <div className='text-sm space-y-2'>
          <div className='flex items-center'>
            <CalendarDaysIcon className='h-5 w-5 mr-2 text-[#eea47fff]' />
            <p>Thu, Jan 16 • 1:30 PM GMT+1</p>
          </div>
          <div className='flex items-center'>
            <CurrencyDollarIcon className='h-5 w-5 mr-2 text-[#eea47fff]' />
            <p>Free</p>
          </div>
          <div className='flex items-center'>
            <MapPinIcon className='h-5 w-5 mr-2 text-[#eea47fff]' />
            <p>Gidan Makama Museum, Kano</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  )
}

