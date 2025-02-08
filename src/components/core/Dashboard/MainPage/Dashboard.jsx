// import { useState } from 'react'
// import './App.css'
//  import Header from  './Header'
// import Sidebar from './SideBar'
// import Home from  './HomePage'
import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar"

function Dashboard() {
  // const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  // const OpenSidebar = () => {
  //   setOpenSidebarToggle(!openSidebarToggle)
  // }

  return (
    <div className='relative flex h-full'>
      {/* <Header OpenSidebar={OpenSidebar}/> */}
      {/* <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/> */}
      {/* <Home /> */}
      {/* <Outlet/> */}
      <Sidebar/>
      <div className="flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard