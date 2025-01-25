import { UserCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const InfoCard = ({title, count, icon:Icon}) => {
  return (
    <div
    // key={item.name}
    className="bg-white p-6 rounded-xl shadow-md"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-[#00539c]">
          {count}
        </p>
      </div>
      <Icon className="w-12 h-12 text-[#eea47f]" />
    </div>
  </div>
  )
}
