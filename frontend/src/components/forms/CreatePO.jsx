import { useEffect, useRef, useState } from 'react'
import './CreatePO.css'

// Prototype values shown when the form first opens.
const initialPurchaseOrder = {
  supplier: 'apex',
  skuLineCount: '6',
  totalUnits: '2400',
  committedValue: '45200',
  expectedDelivery: '2024-11-15',
  facility: 'central-hub-a',
  paymentTerms: 'Net 30 Direct Wire',
}

// Keep the form's small icons inline without adding an icon-library dependency.
function PurchaseOrderIcon({ name, size = 18 }) {
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

  if (name === 'document') {
    return <svg {...common}><path d="M8 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3M8 2v4m6-4v4M7 11h7m-7 4h5m3-8h6m-3-3v6" /></svg>
  }
  if (name === 'close') {
    return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>
  }
  // The remaining icon used here is the submit/send symbol.
  return <svg {...common}><path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" /></svg>
}

// PO modal launched from the Dashboard; onClose is supplied by its parent.
export default function CreatePO({ onClose }) {
  const [purchaseOrder, setPurchaseOrder] = useState(initialPurchaseOrder)
  const [submissionNotice, setSubmissionNotice] = useState('')
  const supplierRef = useRef(null)

  useEffect(() => {
    // Focus the first field, support Escape, and remove the listener on close.
    supplierRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Keep inputs controlled and clear stale submission feedback after edits.
  const updateField = (event) => {
    const { name, value } = event.target
    setPurchaseOrder((current) => ({ ...current, [name]: value }))
    setSubmissionNotice('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Keep submission explicit until a purchase-order API is available.
    setSubmissionNotice(
      'Purchase orders cannot be issued yet because backend integration is not available.',
    )
  }

  return (
    <div
      className="po-modal-backdrop"
      onMouseDown={(event) => {
        // Close only when the backdrop itself is clicked, not the dialog.
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {/* The dialog remains clear while the backdrop blurs the page behind it. */}
      <section
        className="po-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="po-modal-title"
        aria-describedby="po-modal-description"
      >
        <header className="po-modal-header">
          <span className="po-modal-icon" aria-hidden="true">
            <PurchaseOrderIcon name="document" size={22} />
          </span>
          <div className="po-modal-heading">
            <h2 id="po-modal-title">Create Purchase Order (PO)</h2>
            <p id="po-modal-description">Automated Hayleys EDI 850 Procurement Pipeline</p>
          </div>
          <button className="po-modal-close" type="button" onClick={onClose} aria-label="Close form">
            <PurchaseOrderIcon name="close" size={20} />
          </button>
        </header>

        <form className="po-form" onSubmit={handleSubmit}>
          {/* Keep PO fields in a single responsive grid. */}
          <div className="po-form-fields">
            <label className="po-field po-field-full">
              <span>Supplier / Vendor <b aria-hidden="true">*</b></span>
              <select
                ref={supplierRef}
                name="supplier"
                value={purchaseOrder.supplier}
                onChange={updateField}
                required
              >
                <option value="apex">Apex Global Pharma Ltd (Tier A+)</option>
              </select>
            </label>

            <label className="po-field">
              <span>SKU Line Count</span>
              <input
                name="skuLineCount"
                type="number"
                min="1"
                value={purchaseOrder.skuLineCount}
                onChange={updateField}
                required
              />
            </label>
            <label className="po-field">
              <span>Total Order Units</span>
              <input
                name="totalUnits"
                type="number"
                min="1"
                value={purchaseOrder.totalUnits}
                onChange={updateField}
                required
              />
            </label>
            <label className="po-field">
              <span>Committed Value (Rs.)</span>
              <input
                name="committedValue"
                type="number"
                min="0"
                step="0.01"
                value={purchaseOrder.committedValue}
                onChange={updateField}
                required
              />
            </label>
            <label className="po-field">
              <span>Expected Gate Delivery</span>
              <input
                name="expectedDelivery"
                type="date"
                value={purchaseOrder.expectedDelivery}
                onChange={updateField}
                required
              />
            </label>
            <label className="po-field po-field-full">
              <span>Target Facility &amp; Dock Bay</span>
              <select
                name="facility"
                value={purchaseOrder.facility}
                onChange={updateField}
                required
              >
                <option value="central-hub-a">Central Hub A (Bay 02)</option>
              </select>
            </label>
            <label className="po-field po-field-full">
              <span>Payment &amp; Billing Terms</span>
              <input
                name="paymentTerms"
                type="text"
                value={purchaseOrder.paymentTerms}
                onChange={updateField}
                required
              />
            </label>
          </div>

          {submissionNotice && (
            <p className="po-form-notice" role="status">{submissionNotice}</p>
          )}

          <footer className="po-form-footer">
            <button className="po-cancel-button" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="po-submit-button" type="submit">
              <PurchaseOrderIcon name="send" size={18} />
              Issue Purchase Order
            </button>
          </footer>
        </form>
      </section>
    </div>
  )
}
