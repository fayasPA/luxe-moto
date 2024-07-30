import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {

  return (
    <div className='flex'>
      <div className='flex-1'>
        {/* <Navbar /> */}
        <div className=''>
          <Outlet />
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  )
}

export default Layout