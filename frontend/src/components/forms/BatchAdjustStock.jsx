import { useEffect, useRef, useState } from 'react';

const REASONS = [
  'Cycle Count Variance Correction',
  'Damaged / Broken in Warehouse',
  'Internal Quality Quarantine (QA)',
  'Dock Receipt Discrepancy Adjustment',
  'Inter-Hub Transfer Intake'
];

export default function BatchAdjustStock({ items = [], onClose, onAdjusted }) {
  const [selectedSkuId, setSelectedSkuId] = useState(items[0]?.id || '');
  const [adjustmentType, setAdjustmentType] = useState('increase'); // 'increase' or 'decrease'
  const [quantity, setQuantity] = useState(10);
  const [reason, setReason] = useState(REASONS[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    firstInputRef.current?.focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const selectedItem = items.find((i) => i.id === selectedSkuId) || items[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const delta = adjustmentType === 'increase' ? Number(quantity) : -Number(quantity);

    const payload = {
      skuId: selectedSkuId,
      delta,
      reason,
      notes,
      timestamp: new Date().toISOString()
    };

    try {
      const apiUrl = import.meta.env?.VITE_API_BASE_URL 
        ? `${import.meta.env.VITE_API_BASE_URL}/inventory/adjust` 
        : 'http://localhost:5000/api/inventory/adjust';

      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Backend offline. Adjusting stock locally:', err.message);
    } finally {
      if (onAdjusted && selectedSkuId) {
        onAdjusted(selectedSkuId, delta);
      }
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-lg overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#f7fcf9]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#eef7f2] border border-[#bce3d0] text-[#0d5236] flex items-center justify-center font-bold">
              ⇄
            </div>
            <div>
              <h2 className="text-base font-bold text-[#10251d]">Batch Adjust Stock Quantity</h2>
              <p className="text-xs text-gray-500">Record manual inventory balance corrections</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center text-lg"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Select Target SKU / Item
            </label>
            <select
              ref={firstInputRef}
              value={selectedSkuId}
              onChange={(e) => setSelectedSkuId(e.target.value)}
              className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2.5 text-xs font-semibold text-[#10251d] focus:outline-none focus:ring-2 focus:ring-[#00c993]"
            >
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id} - {item.name} ({item.avail ?? 0} Avail)
                </option>
              ))}
              {items.length === 0 && (
                <option value="">No items available</option>
              )}
            </select>
          </div>

          {selectedItem && (
            <div className="p-3 bg-[#eef7f2] border border-[#bce3d0] rounded-xl flex justify-between items-center text-xs">
              <span className="text-[#0d5236] font-medium">Current Stock in Bin:</span>
              <strong className="text-[#006241] text-sm">{selectedItem.avail ?? 0} Units</strong>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Adjustment Direction
              </label>
              <select
                value={adjustmentType}
                onChange={(e) => setAdjustmentType(e.target.value)}
                className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
              >
                <option value="increase">+ Add Stock (Inflow)</option>
                <option value="decrease">- Reduce Stock (Deduction)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Quantity Units
              </label>
              <input
                required
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Reason for Adjustment
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
            >
              {REASONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Internal Notes / Reference Log
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Verified by Auditor shift Alpha"
              className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end items-center gap-2.5 pt-3 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#006241] hover:bg-[#004e34] disabled:opacity-60 text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
            >
              {isSubmitting ? 'Applying Adjustment...' : 'Commit Stock Adjustment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
