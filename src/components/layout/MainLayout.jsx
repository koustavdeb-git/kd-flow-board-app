import React from 'react'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="h-screen flex flex-row">
        <Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">

          <Header />
          <main className="flex-1 p-6 overflow-y-auto bg-slate-50">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default MainLayout
