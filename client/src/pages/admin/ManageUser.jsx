import React, { useState } from 'react'

export const ManageUser = () => {
    const [isOpen, setIsOpen] = useState(false)
const  handleToggle = ()=>{
  setIsOpen(prevIsOpen => !prevIsOpen)
}
  return (
    <div>ManageUser</div>
  )
}
