import { useRef, useState } from 'react'
import CreatePO from '../components/forms/CreatePO.jsx'
import './Dashboard.css'

// Small inline icons keep the dashboard independent from an icon package.
function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (name === 'download') {
    return <svg {...common}><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3" /></svg>
  }
  if (name === 'calendar') {
    return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>
  }
  if (name === 'plus') {
    return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>
  }
  if (name === 'arrow') {
    return <svg {...common}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
  }
  if (name === 'search') {
    return <svg {...common}><circle cx="10.8" cy="10.8" r="6.5" /><path d="m16 16 4 4" /></svg>
  }
  if (name === 'filter') {
    return <svg {...common}><path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" /></svg>
  }
  if (name === 'box') {
    return <svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 5v9l9 5 9-5V8M12 13v9" /></svg>
  }
  if (name === 'network') {
    return <svg {...common}><circle cx="12" cy="5" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><path d="m11 7-5 9m7-9 5 9M7 18h10" /></svg>
  }
  if (name === 'clock') {
    return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  }
  if (name === 'returns') {
    return <svg {...common}><path d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-2" /></svg>
  }
  return null
}

// The card shows a neutral placeholder instead of inventing frontend-only metrics.
function MetricCard({ title, valueLabel, icon, tone, badge, children }) {
  return (
    <section className={`dashboard-card metric-card metric-${tone}`}>
      <div className="metric-card-heading">
        <p className="dashboard-label">{title}</p>
        {badge ? (
          <span className={`metric-badge badge-${tone}`}>{badge}</span>
        ) : (
          <span className="metric-icon" aria-hidden="true"><Icon name={icon} /></span>
        )}
      </div>
      <div className="metric-main">
        <strong className="metric-value" aria-label={`${title}: waiting for backend data`}>
          —
        </strong>
        <span className="metric-unit">{valueLabel}</span>
      </div>
      {children}
    </section>
  )
}

export default function Dashboard() {
  // Keep dialog visibility local to the Dashboard that launches it.
  const [isPurchaseOrderOpen, setIsPurchaseOrderOpen] = useState(false)
  const createPoButtonRef = useRef(null)

  const closePurchaseOrder = () => {
    setIsPurchaseOrderOpen(false)
    // Restore keyboard focus to the launch button after the dialog unmounts.
    window.requestAnimationFrame(() => createPoButtonRef.current?.focus())
  }

  return (
    <div className="dashboard-page">
      {/* The shared Header and NavBar are rendered once by App.jsx, not duplicated here. */}
      <div className="dashboard-top">
        <div className="dashboard-title">
          <h1>Inventory &amp; Fulfillment Overview</h1>
          <p>
            Real-time stock levels, replenishment tracking, and distributor returns
            across Hayleys Advantis distribution hubs.
          </p>
        </div>

        {/* Keep prototype actions visible; only PO creation has a frontend form. */}
        <div className="dashboard-toolbar" aria-label="Dashboard actions">
          <div className="toolbar-range-group">
            <button className="toolbar-button toolbar-button-muted" type="button" disabled title="Available after backend integration">
              <Icon name="download" />
              Export CSV / XLSX
            </button>
            <label className="date-range-control">
              <Icon name="calendar" />
              <span className="sr-only">Dashboard date range</span>
              <select defaultValue="30" aria-label="Dashboard date range">
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
              </select>
            </label>
          </div>
          <button
            ref={createPoButtonRef}
            className="toolbar-button"
            type="button"
            onClick={() => setIsPurchaseOrderOpen(true)}
          >
            <Icon name="plus" />
            Create PO
          </button>
          <button className="toolbar-button toolbar-button-primary" type="button" disabled title="Available after backend integration">
            <Icon name="plus" />
            Add GRN
          </button>
        </div>
      </div>

      {/* Alert panel mirrors the prototype; explanatory text replaces sample alert counts. */}
      <section className="dashboard-card alerts-panel" aria-label="Automated inventory alerts">
        <div className="alerts-list">
          <article className="alert-row alert-row-stock">
            <span className="alert-icon" aria-hidden="true">!</span>
            <div>
              <p className="alert-title">Low stock alert</p>
              <p className="alert-copy">
                Live reorder alerts will appear when inventory data is connected.
              </p>
            </div>
          </article>
          <article className="alert-row alert-row-expiry">
            <span className="alert-icon" aria-hidden="true"><Icon name="clock" /></span>
            <div>
              <p className="alert-title">Expiry advisory</p>
              <p className="alert-copy">
                Batches nearing expiry will be listed here when batch data is available.
              </p>
            </div>
          </article>
        </div>
        <button className="alerts-link" type="button" disabled title="Alerts will be available after backend integration">
          View Automated Alerts <span>—</span>
          <Icon name="arrow" />
        </button>
      </section>

      {/* KPI cards follow the four-column prototype layout but contain no sample values. */}
      <section className="dashboard-metrics" aria-label="Inventory and fulfillment summary">
        <MetricCard title="Total active SKUs" valueLabel="SKUs" icon="box" tone="stock">
          <p className="metric-note">— added this week · — in-stock rate</p>
          <div className="stock-health-track" aria-label="Stock health chart waiting for data">
            <span />
          </div>
          <div className="stock-health-legend">
            <span>Healthy: —</span><span>Low: —</span><span>Out: —</span>
          </div>
        </MetricCard>

        <MetricCard title="Total retailers serviced" valueLabel="doors" icon="network" tone="retailers" badge="Active Network">
          <p className="metric-note">Active network · retailer data pending</p>
          <div className="metric-card-footer">
            <span>Fulfillment accuracy</span><strong>—</strong>
          </div>
        </MetricCard>

        <MetricCard title="Expiring soon (≤ 30 days)" valueLabel="batches" icon="clock" tone="expiry" badge="Advisory">
          <p className="metric-note">Estimated at-risk value: <strong>—</strong></p>
          <div className="metric-card-footer">
            <span>Critical SKUs impacted</span><strong>—</strong>
          </div>
        </MetricCard>

        <MetricCard title="Net returned items (30d)" valueLabel="units" icon="returns" tone="returns" badge="RMA Outflow">
          <p className="metric-note">Return rate · restocked · quarantined: —</p>
          <div className="metric-card-footer">
            <span>Manage RMA ledger</span><strong>—</strong>
          </div>
        </MetricCard>
      </section>

      {/* Inventory table controls and columns reflect the prototype; rows await real records. */}
      <section className="dashboard-card inventory-card">
        <div className="inventory-controls">
          <label className="inventory-search">
            <Icon name="search" />
            <span className="sr-only">Search inventory</span>
            <input
              type="search"
              placeholder="Filter by SKU name, barcode or batch ID..."
              disabled
              title="Inventory search will work when records are connected"
            />
          </label>

          <div className="inventory-filters">
            <label>
              <span className="sr-only">Filter by category</span>
              <select defaultValue="" disabled>
                <option value="">All Categories</option>
              </select>
            </label>
            <label>
              <span className="sr-only">Filter by stock status</span>
              <select defaultValue="" disabled>
                <option value="">Status: All Levels</option>
              </select>
            </label>
            <button className="filter-button" type="button" disabled aria-label="Apply inventory filters">
              <Icon name="filter" />
            </button>
          </div>
        </div>

        <div className="table-scroll">
          <table className="inventory-table">
            <thead>
              <tr>
                <th scope="col">SKU details</th>
                <th scope="col">Category · location</th>
                <th scope="col">Available qty</th>
                <th scope="col">Expiry date</th>
                <th scope="col">Returned items (30d)</th>
                <th scope="col">Re-order point</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" className="dashboard-empty">
                  Inventory records will appear here when the backend is connected.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals and pagination are shown as placeholders, not false zero values. */}
        <footer className="inventory-footer">
          <div className="inventory-totals">
            <span><i className="total-dot total-dot-green" />Total available units: <strong>—</strong></span>
            <span><i className="total-dot total-dot-teal" />Inbound GRN pending: <strong>—</strong></span>
            <span><i className="total-dot total-dot-red" />Negative returns logged: <strong>—</strong></span>
          </div>
          <div className="inventory-pagination" aria-label="Inventory pagination">
            <label>
              Rows per page
              <select defaultValue="10" disabled aria-label="Rows per page">
                <option value="10">10</option>
              </select>
            </label>
            <span>Showing — items</span>
            <button type="button" disabled aria-label="Previous page">‹</button>
            <button type="button" disabled aria-label="Next page">›</button>
          </div>
        </footer>
      </section>
      {/* Render the shared PO form as an overlay only while it is open. */}
      {isPurchaseOrderOpen && (
        <CreatePO onClose={closePurchaseOrder} />
      )}
    </div>
  )
}
