
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import NavBar from './components/NavBar.jsx';
import Inventory from './pages/Inventory.jsx';
import Login from './pages/login.jsx';
import POSOrderEntry from './pages/POSOrderEntry.jsx';

function App() {
  return (
    <Routes>
      {/* Default page */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login page - No Header or NavBar */}
      <Route path="/login" element={<Login />} />

      {/* Inventory page */}
      <Route
        path="/inventory"
        element={
          <div className="flex w-full min-h-screen bg-[#f4f8f5]">
            <Header />
            <NavBar />

            <main className="flex-1 ml-[228px] max-[700px]:ml-[64px] min-w-0">
              <Inventory />
            </main>
          </div>
        }
      />

      {/* POS Order Entry page */}
      <Route
        path="/pos-order-entry"
        element={
          <div className="flex w-full min-h-screen bg-[#f4f8f5]">
            <Header />
            <NavBar />

            <main className="flex-1 ml-[228px] max-[700px]:ml-[64px] min-w-0">
              <POSOrderEntry />
            </main>
          </div>
        }
      />

      {/* Unknown pages */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
