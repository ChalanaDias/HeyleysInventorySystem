import { NavLink } from 'react-router-dom'
import hayleysLogo from './icon/Hayleys_Logo.jpg'

const operationsLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: '▦' }, // Opens the dashboard.
  { to: '/pos-order-entry', label: 'POS Order Entry', icon: '▤' }, // Opens POS order entry.
  { to: '/ai-forecast', label: 'AI Forecast', icon: '✣', badge: 'PREDICT' }, // Opens AI forecasting.
  { to: '/inventory', label: 'Inventory (SKU List)', icon: '▱' }, // Opens the inventory SKU list.
  { to: '/purchase-orders', label: 'Purchase Orders', icon: '▧' }, // Opens purchase orders.
  { to: '/returns', label: 'Returns', icon: '↶', badge: 'RMA' }, // Opens returns and RMA.
  { to: '/user-roles', label: 'User Roles', icon: '♙' }, // Opens user role management.
]

function NavBar() {
  return (
    <aside className="sidebar">
      {/* Brand link takes the user back to the dashboard. */}
      <NavLink className="brand" to="/dashboard" aria-label="Hayleys Consumer home">
        <img className="brand-logo" src={hayleysLogo} alt="Hayleys Consumer" />
      </NavLink>

      <p className="nav-section-title">Operations &amp; Supply Chain</p>
      <nav className="nav-links" aria-label="Main navigation">
        {operationsLinks.map(({ to, label, icon, badge }) => (
          <NavLink
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            key={to}
            to={to}
          >
            <span className="nav-icon" aria-hidden="true">{icon}</span>
            <span className="nav-label">{label}</span>
            {badge && <span className={`nav-badge${badge === 'RMA' ? ' badge-rma' : ''}`}>{badge}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="facility-card">
          <span className="facility-icon" aria-hidden="true">⌂</span>
          <div>
            <span className="facility-label">Hayleys Advantis Hub</span>
            <strong>Central Distribution Hub</strong>
          </div>
        </div>
        {/* Opens workspace settings. */}
        <NavLink
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          to="/settings"
        >
          <span className="nav-icon" aria-hidden="true">⚙</span>
          <span className="nav-label">Settings</span>
        </NavLink>
        <div className="sign-out">
          <span className="nav-icon" aria-hidden="true">↪</span>
          <span>Sign Out / Switch</span>
        </div>
      </div>
    </aside>
  )
}

export default NavBar
