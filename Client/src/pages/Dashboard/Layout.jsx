import React from 'react'
import Sidebar from '../../Components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import NavBarOwner from '../../Components/owner/NavBarOwner'

const Layout = () => {
  return (
    <div>
      <div className='flex min-h-screen'>
        <Sidebar />
        <div className=' flex-1'>
          <NavBarOwner />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
