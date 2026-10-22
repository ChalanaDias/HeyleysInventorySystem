
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header.jsx';
import NavBar from './components/NavBar.jsx';

import Login from './pages/login.jsx';
import Inventory from './pages/Inventory.jsx';
import POSOrderEntry from './pages/POSOrderEntry.jsx';
import UserRoles from './pages/UserROles.jsx';
import SignUp from './pages/SignUp.jsx';

// Shared layout for dashboard pages
function DashboardLayout({ children }) {
  return (
    <div className="flex w-full min-h-screen bg-[#f4f8f5]">
      <Header />
      <NavBar />

      <main className="flex-1 ml-[228px] max-[700px]:ml-[64px] min-w-0">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Default page */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Login page */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Inventory page */}
      <Route
        path="/inventory"
        element={
          <DashboardLayout>
            <Inventory />
          </DashboardLayout>
        }
      />

      {/* POS Order Entry page */}
      <Route
        path="/pos-order-entry"
        element={
          <DashboardLayout>
            <POSOrderEntry />
          </DashboardLayout>
        }
      />

      {/* User Roles page */}
      <Route
        path="/user-roles"
        element={
          <DashboardLayout>
            <UserRoles />
          </DashboardLayout>
        }
      />

      {/* Unknown pages */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
