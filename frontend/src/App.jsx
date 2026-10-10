import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Inventory from './pages/Inventory.jsx'

function App() {
  return (
    <div className="flex w-full min-h-screen bg-[#f4f8f5]">
      <NavBar />
      <main className="flex-1 ml-[228px] max-[700px]:ml-[64px] min-w-0">
        <Routes>
          <Route path="/" element={<Navigate to="/inventory" replace />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
