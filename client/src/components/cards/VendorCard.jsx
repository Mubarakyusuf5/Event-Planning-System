import { MapPinIcon } from '@heroicons/react/24/outline';
import React from 'react'

export const VendorCard = ({onNavigate, title, email, phone, location, Key, service}) => {
    return (
      <div 
      key={Key}
        className="w-full min-w-[200px] bg-white border border-gray-200 rounded-2xl shadow-md p-4"
        // Container for the card with responsive width, padding, border, and shadow
      >
        <div className="mb-4">
          {/* Header Section: Company name and contact details */}
          <h2 className="text-xl font-semibold text-[#00539c]">
            {/* Company name styled as a prominent heading */}
            {title}
          </h2>
          <p className="text-sm text-gray-600">
            {/* Email address styled with a smaller text size */}
            Email: {email}
          </p>
          <p className="text-sm text-gray-600">
            {/* Phone number styled similarly to the email address */}
            Phone: {phone}
          </p>
          <p className="text-sm text-gray-600">
            {/* Phone number styled similarly to the email address */}
            Service: <span className='font-bold'>{service || ""}</span>
          </p>
          <p className="flex items-center text-sm text-gray-600">
            {/* Location information with an inline SVG icon */}
            <MapPinIcon className='w-6 h-6' />
            {location}
          </p>
        </div>
        <button
        onClick={onNavigate}
          className="w-full bg-[#eea47f] text-white text-sm font-semibold py-2 rounded-lg hover:bg-[#e79c76] focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          // Button styled with full width, background color, hover, and focus effects
        >
          View Profile
        </button>
      </div>
    );
}
