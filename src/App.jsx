import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import CreateCrewmate from './pages/CreateCrewmate'
import ReadCrewmate from './pages/ReadCrewmate'
import UpdateCrewmate from './pages/UpdateCrewmate'
import CrewmateDetail from './pages/CrewmateDetail'
import Card from './components/Card'
import './App.css'

function App() {

  return (
    
    <div className="app-container">
      {/* Persistent left column */}
      <Sidebar />

      {/* Dynamic content on the right */}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<ReadCrewmate />} />
          <Route path="/create" element={<CreateCrewmate />} />
          <Route path="/read" element={<ReadCrewmate />} />
          <Route path="/edit/:id" element={<UpdateCrewmate />} />
          <Route path="/crewmate/:id" element={<CrewmateDetail />} />
          <Route path="/crewmate/:id/:slug" element={<CrewmateDetail />} />
        </Routes>
      </div>
    </div>
  
  )
}

export default App
