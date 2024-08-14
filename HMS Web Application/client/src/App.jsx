import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Homediv5 from './components/Homediv5'
import Dashboard from './pages/admin/Dashboard'
import Doctorspage from './pages/home/Doctorspage'
import Home from './pages/home/Home'
import AddDoctor from './pages/patient/AddDoctor'
import DoctorsPg from './pages/patient/DoctorsPg'
import UpdateDoctor from './pages/patient/UpdateDoctor'
import AddService from './pages/Service/AddService'
import ServicesPg from './pages/Service/ServicesPg'
import UpdateService from './pages/Service/UpdateService'
import Servicespage from './pages/home/Servicespage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/admindash' element={<Dashboard />}></Route>
          <Route path='/doctors' element={<DoctorsPg />}></Route>
          <Route path='/add' element={<AddDoctor />}></Route>
          <Route path='/updatedoctor/:id' element={<UpdateDoctor />}></Route>
          <Route path="/contact" element={<Homediv5 />} />
          <Route path='/doctorspage' element={<Doctorspage />}></Route>

          <Route path='/addservice' element={<AddService />}></Route>
          <Route path='/services' element={<ServicesPg />}></Route>
          <Route path='/updateservice/:id' element={<UpdateService />}></Route>
          <Route path='/servicespage' element={<Servicespage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App