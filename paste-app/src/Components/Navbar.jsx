import { isAction } from '@reduxjs/toolkit'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full min-w-screen flex flex-row gap-20 justify-center p-4 bg-gray-800 text-white font-bold' >
      <NavLink to="/" className={({isActive}) => isActive ? "text-blue-400 font-semibold hover:text-blue-300" : "text-gray-300 font-semibold"}>
        Home
      </NavLink>

      <NavLink to="/pastes" className={({isActive}) => isActive ? "text-blue-400 font-semibold hover:text-blue-300" : "text-gray-300 font-semibold"}>
        Paste
      </NavLink>
    </div>
  )
}

export default Navbar
