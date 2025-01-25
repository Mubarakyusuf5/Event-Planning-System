import React from 'react'
import { EventCard } from '../cards/EventCard'
import { VendorCard } from '../cards/VendorCard'

export const BrowseSection = () => {
  return (
    <div className='min-h-[300px] py-4 px-6 font-roboto'>
        <h1 className='font-poppins font-medium text-3xl lg:text-4xl mt-4'>Browse Events</h1>
        <div className='px-6  mt-5'>
            <EventCard />
            <VendorCard />
        </div>
    </div>
  )
}
