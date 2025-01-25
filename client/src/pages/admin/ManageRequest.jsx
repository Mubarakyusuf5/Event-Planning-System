import React, { useState } from 'react'

export const ManageRequest = () => {
  const [isOpen, setIsOpen] = useState(false)
const  handleToggle = ()=>{
  setIsOpen(prevIsOpen => !prevIsOpen)
}
  return (
    <div>ManageRequest</div>
  )
}
