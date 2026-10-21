
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header.jsx';
import NavBar from './components/NavBar.jsx';

import Login from './pages/login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Inventory from './pages/Inventory.jsx';
import Returns from './pages/Returns.jsx';
import POSOrderEntry from './pages/POSOrderEntry.jsx';
import UserRoles from './pages/UserROles.jsx';

// Reuse the existing fixed header and navigation on the app pages.
function AppLayout({ children }) {
  return (
    <div className="flex w-full min-h-screen bg-[#f4f8f5]">
      <Header />
      <NavBar />

      {/* Match the fixed desktop sidebar; switch to its compact 64px mobile width. */}
      <main className="app-main flex-1 ml-[260px] max-[700px]:ml-[64px] min-w-0 min-[1600px]:ml-[325px]">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Keep the login page as the initial destination. */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login uses its own layout and does not show the app navigation. */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard page */}
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        }
      />

      {/* Inventory page */}
      <Route
        path="/inventory"
        element={
          <AppLayout>
            <Inventory />
          </AppLayout>
        }
      />

      {/* Returns and RMA tickets page */}
      <Route
        path="/returns"
        element={
          <AppLayout>
            <Returns />
          </AppLayout>
        }
      />

      {/* POS Order Entry page */}
      <Route
        path="/pos-order-entry"
        element={
          <AppLayout>
            <POSOrderEntry />
          </AppLayout>
        }
      />

      {/* User Roles page */}
      <Route
        path="/user-roles"
        element={
          <AppLayout>
            <UserRoles />
          </AppLayout>
        }
      />

      {/* Redirect unknown URLs to the login page. */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;