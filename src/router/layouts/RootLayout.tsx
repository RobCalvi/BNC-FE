import React from 'react'
import { Outlet } from 'react-router'
import NavigationBar from '../components/NavigationBar'

const RootLayout:React.FC = () => {
  return (
    <>
        <NavigationBar />
        <main id="main">
            <Outlet />
        </main>
    </>
  )
}

export default RootLayout