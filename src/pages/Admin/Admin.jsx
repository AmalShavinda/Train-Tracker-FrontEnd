import React, { useState } from 'react'
import Trains from '../../components/Admin/Trains'
import SideBar from '../../components/Admin/SideBar'
import Users from '../../components/Admin/Users'

const Admin = () => {

  const [ selectedPage, setSelectedPage] = useState("users")

  const renderContent = () => {
    switch(selectedPage) {
      case 'users':
        return <Users />
      case 'trains':
        return <Trains />
      default:
        return <Users />
    }
  }

  return (
    <div className='flex h-screen'>
      <SideBar setSelectedPage={setSelectedPage}/>
      <div className='flex-1 p-6 bg-gray-100'>
        {renderContent()}
      </div>
    </div>
  )
}

export default Admin
