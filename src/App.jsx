import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import UserManagement from './pages/usermanagement'
import EmployeeManagement from './pages/employeemanagement'
import IdManagement from './pages/idmanagement'
import IdDetails from './pages/iddetails'
import Login from './pages/login'
import DynamicDetails from './pages/dynamicdetails'
import EmployeeDashboard from './pages/employeedashboard'
import HrDashboard from './pages/hrdashboard'
import ItStaffDashboard from './pages/itstaffdashboard'

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="usermanagement" element={<UserManagement/>}/>
        <Route path="/employeemanagement" element={<EmployeeManagement/>}/>
        <Route path="/idmanagement" element={<IdManagement/>}/>
        <Route path="/iddetails" element={<IdDetails/>}/>
        <Route path="/dynamicdetails" element={<DynamicDetails/>}/>
        <Route path="/home/employeedashboard" element={<EmployeeDashboard/>}/>
        <Route path="/home/hrdashboard" element={<HrDashboard/>}/>
        <Route path="/home/itstaffdashboard" element={<ItStaffDashboard/>}/>
      </Routes>
    </>
  )
}

export default App
