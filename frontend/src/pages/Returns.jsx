import { useRef, useState } from 'react'
import RMATicket from '../components/forms/RMA_Ticket.jsx'
import './Returns.css'

export default function Returns() {
  // Keep dialog visibility local to the Returns page that launches the form.
  const [isTicketOpen, setIsTicketOpen] = useState(false)
  const createTicketButtonRef = useRef(null)

  const closeTicket = () => {
    setIsTicketOpen(false)
    // Return keyboard focus to the button that opened the dialog.
    window.requestAnimationFrame(() => createTicketButtonRef.current?.focus())
  }

  return (
    <div className="returns-page">
      {/* Page heading and primary action for opening a new inbound ticket. */}
      <header className="returns-top">
        <div>
          <p className="returns-eyebrow">Reverse Logistics</p>
          <h1>Returns &amp; RMA Management</h1>
          <p className="returns-description">
            Track distributor returns, inbound inspections, and quality dispositions.
          </p>
        </div>
        <button
          ref={createTicketButtonRef}
          className="returns-create-button"
          type="button"
          onClick={() => setIsTicketOpen(true)}
        >
          <span aria-hidden="true">+</span>
          Create RMA Ticket
        </button>
      </header>

      {/* The empty state clarifies that ticket records need a connected backend. */}
      <section className="returns-card" aria-label="RMA inbound tickets">
        <div className="returns-card-heading">
          <div>
            <h2>Inbound RMA Tickets</h2>
            <p>New return requests and inspection status</p>
          </div>
          <span className="returns-status-badge">Inbound</span>
        </div>
        <div className="returns-empty-state">
          <span className="returns-empty-icon" aria-hidden="true">↶</span>
          <h3>No RMA tickets to display</h3>
          <p>Ticket records will appear here when the returns backend is connected.</p>
          <button type="button" onClick={() => setIsTicketOpen(true)}>Create an inbound ticket</button>
        </div>
      </section>

      {/* Mount the modal only while it is open. */}
      {isTicketOpen && <RMATicket onClose={closeTicket} />}
    </div>
  )
}