import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import UserManagement from './pages/usermanagement'
import EmployeeManagement from './pages/employeemanagement'
import IdManagement from './pages/idmanagement'
import MaritalStatus from './pages/maritalstatusmanagement'
import Salary from './pages/salarymanagement'
import Zone from './pages/zonemanagement'
import Region from './pages/regionmanagement'
import Woreda from './pages/woredamanagement'
import IdDetails from './pages/iddetails'
import Login from './pages/login'
import DynamicDetails from './pages/dynamicdetails'
import EmployeeDashboard from './pages/employeedashboard'



function App() {
  useEffect(() => {
  const script = document.createElement("script");
  script.src = "/assets/js/scripts.bundle.js";
  script.async = true;
  script.onload = () => {
    setTimeout(() => {
      if (window.KTApp && typeof window.KTApp.init === "function") {
        window.KTApp.init();
      }
    }, 100);
    
  };
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);


  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/usermanagement" element={<UserManagement/>}/>
        <Route path="/employeemanagement" element={<EmployeeManagement/>}/>
        <Route path="/idmanagement" element={<IdManagement/>}/>
        <Route path="/iddetails" element={<IdDetails/>}/>
        <Route path="/dynamicdetails" element={<DynamicDetails/>}/>
        <Route path="/dashboard" element={<EmployeeDashboard/>}/>
        <Route path="/zonemanagement" element={<Zone/>}/>
        <Route path="/regionmanagement" element={<Region/>}/>
        <Route path="/woredamanagement" element={<Woreda/>}/>
        <Route path="/salarymanagement" element={<Salary/>}/>
        <Route path="/maritalstatusmanagement" element={<MaritalStatus/>}/>
      </Routes>
    </>
  )
}

export default App
