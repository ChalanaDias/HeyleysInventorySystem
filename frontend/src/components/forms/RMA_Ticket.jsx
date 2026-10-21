import { useEffect, useRef, useState } from 'react'
import './RMA_Ticket.css'

// Demo SKU rates let the prototype calculate the estimated credit before API integration.
const skuOptions = [
  { id: 'SKU-GLT-01', name: 'Gillette Blue 2 Disposable Razors', unitCredit: 101.428571 },
  { id: 'SKU-PAR-02', name: 'Paracetamol 500mg (Pack of 100)', unitCredit: 245 },
  { id: 'SKU-DET-03', name: 'Dettol Antiseptic Liquid 500ml', unitCredit: 385 },
]

const reasons = [
  'Damaged in Transit (Logistics / Packaging Fault)',
  'Expired Product',
  'Product Quality Issue',
  'Incorrect Product Delivered',
  'Other',
]

// Prefill the fields with the sample values from the RMA form prototype.
const initialTicket = {
  customer: 'Metro Care Pharmacies',
  invoiceRef: 'PO-84920',
  skuId: skuOptions[0].id,
  unitsReturned: '-14',
  lotCode: 'Lot #GLT-2401',
  reason: reasons[0],
  details: 'External box crushed during freight transfer; integrity seal compromised.',
  inspectionBay: 'dock-bay-4b',
  disposition: 'quarantined',
}

// Inline SVG icons keep the dialog self-contained without an added icon dependency.
function RmaIcon({ name, size = 20 }) {
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

  if (name === 'close') {
    return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>
  }
  if (name === 'verified') {
    return <svg {...common}><path d="m12 3 2.1 1.5 2.6-.1.8 2.5 2.1 1.5-.8 2.5.8 2.5-2.1 1.5-.8 2.5-2.6-.1L12 21l-2.1-1.5-2.6.1-.8-2.5-2.1-1.5.8-2.5-.8-2.5 2.1-1.5.8-2.5 2.6.1L12 3Z" /><path d="m9 12 2 2 4-4" /></svg>
  }
  if (name === 'ticket') {
    return <svg {...common}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M12 8v8m-4-4h8" /></svg>
  }
  return null
}

export default function RMATicket({ onClose }) {
  // Keep every editable field controlled so the estimated credit updates immediately.
  const [ticket, setTicket] = useState(initialTicket)
  const [submissionNotice, setSubmissionNotice] = useState('')
  const customerRef = useRef(null)
  const selectedSku = skuOptions.find(({ id }) => id === ticket.skuId)
  const quantity = Number(ticket.unitsReturned)
  // Returned units are negative, so multiplying by the per-unit credit produces a negative impact.
  const creditImpact = Number.isFinite(quantity) && selectedSku
    ? Math.round(quantity * selectedSku.unitCredit)
    : 0

  useEffect(() => {
    customerRef.current?.focus()
    // Let users dismiss the dialog with Escape and remove the listener when it closes.
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Update only the edited field and clear any stale submit feedback.
  const updateField = (event) => {
    const { name, value } = event.target
    setTicket((current) => ({ ...current, [name]: value }))
    setSubmissionNotice('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Keep the intake explicit until an RMA backend endpoint is available.
    setSubmissionNotice(
      'RMA intake cannot be confirmed yet because backend integration is not available.',
    )
  }

  return (
    <div
      className="rma-modal-backdrop"
      onMouseDown={(event) => {
        // A click inside the dialog must not dismiss it.
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {/* Expose modal semantics and an accessible title/description to assistive technology. */}
      <section
        className="rma-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rma-modal-title"
        aria-describedby="rma-modal-description"
      >
        <header className="rma-modal-header">
          <span className="rma-modal-icon" aria-hidden="true">
            <RmaIcon name="ticket" size={23} />
          </span>
          <div className="rma-modal-heading">
            <h2 id="rma-modal-title">Create New RMA Inbound Ticket</h2>
            <p id="rma-modal-description">Hayleys Reverse Logistics Core • Automated Inspection Router</p>
          </div>
          <button className="rma-modal-close" type="button" onClick={onClose} aria-label="Close form">
            <RmaIcon name="close" />
          </button>
        </header>

        <form className="rma-form" onSubmit={handleSubmit}>
          {/* Arrange the intake fields in a two-column grid that stacks on small screens. */}
          <div className="rma-form-fields">
            <label className="rma-field">
              <span>Customer / Distributor <b aria-hidden="true">*</b></span>
              <input
                ref={customerRef}
                name="customer"
                type="text"
                value={ticket.customer}
                onChange={updateField}
                required
              />
            </label>

            <label className="rma-field">
              <span>Original PO / Invoice Ref</span>
              <input
                name="invoiceRef"
                type="text"
                value={ticket.invoiceRef}
                onChange={updateField}
              />
            </label>

            <label className="rma-field">
              <span>SKU ID <b aria-hidden="true">*</b></span>
              <select name="skuId" value={ticket.skuId} onChange={updateField} required>
                {skuOptions.map(({ id, name }) => (
                  <option key={id} value={id}>{id} ({name})</option>
                ))}
              </select>
            </label>

            <label className="rma-field rma-quantity-field">
              <span>
                <span>Units Returned (strictly negative) <b aria-hidden="true">*</b></span>
                <strong>Negative quantity</strong>
              </span>
              <input
                className="rma-negative-input"
                name="unitsReturned"
                type="number"
                step="1"
                max="-1"
                value={ticket.unitsReturned}
                onChange={updateField}
                required
              />
            </label>

            <label className="rma-field">
              <span>Lot / Batch Code</span>
              <input
                name="lotCode"
                type="text"
                value={ticket.lotCode}
                onChange={updateField}
              />
            </label>

            <label className="rma-field">
              <span>Est Credit Impact (Rs.)</span>
              <input className="rma-credit-input" type="text" value={creditImpact} readOnly aria-label="Estimated credit impact in rupees" />
            </label>

            <label className="rma-field rma-field-full">
              <span>Reason Category</span>
              <select name="reason" value={ticket.reason} onChange={updateField}>
                {reasons.map((reason) => <option key={reason}>{reason}</option>)}
              </select>
            </label>

            <label className="rma-field rma-field-full">
              <span>Return Report / Incident Details</span>
              <textarea
                name="details"
                rows="2"
                value={ticket.details}
                onChange={updateField}
              />
            </label>

            <label className="rma-field">
              <span>Inspection Bay Assignment</span>
              <select name="inspectionBay" value={ticket.inspectionBay} onChange={updateField}>
                <option value="dock-bay-4b">Dock Bay 4B - Bio &amp; Sterile Inspection</option>
                <option value="dock-bay-2a">Dock Bay 2A - General Inspection</option>
                <option value="dock-bay-1c">Dock Bay 1C - Cold Chain Inspection</option>
              </select>
            </label>

            <label className="rma-field">
              <span>Initial QA Disposition</span>
              <select name="disposition" value={ticket.disposition} onChange={updateField}>
                <option value="quarantined">Quarantined (Biohazard/Damage)</option>
                <option value="inspection">Pending Quality Inspection</option>
                <option value="restock">Restock Review</option>
                <option value="rejected">Rejected Return</option>
              </select>
            </label>
          </div>

          {/* Explain why confirmation is unavailable instead of pretending an intake was saved. */}
          {submissionNotice && <p className="rma-form-notice" role="status">{submissionNotice}</p>}

          {/* Keep cancellation and intake confirmation actions together at the bottom of the dialog. */}
          <footer className="rma-form-footer">
            <button className="rma-cancel-button" type="button" onClick={onClose}>Cancel</button>
            <button className="rma-submit-button" type="submit">
              <RmaIcon name="verified" size={19} />
              Confirm RMA Intake
            </button>
          </footer>
        </form>
      </section>
    </div>
  )
}