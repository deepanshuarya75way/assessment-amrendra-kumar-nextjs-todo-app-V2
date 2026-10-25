import React from 'react'

export const Navbar = () => {
  return (
   <div className='flex py-3 flex-wrap justify-around'>
    <h1 className='text-2xl font-bold'>Todo App</h1>
    <ul className='flex gap-8'>
        <li>Home</li>
        <li>About</li> 
        <li>Product</li>
        <li>Contact</li>
    </ul>
   </div>
  )
}
