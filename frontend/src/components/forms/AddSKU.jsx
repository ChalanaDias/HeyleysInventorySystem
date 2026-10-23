import { useEffect, useRef, useState } from 'react';

const initialSKU = {
  id: '',
  name: '',
  brand: 'Gillette',
  desc: '',
  bin: 'Bay F-01 (Hub A)',
  avail: 100,
  minSafe: 50,
  wholesale: '100.00',
  retail: '120.00',
  lot: '#LOT-2024',
  expiry: '2028-12-31',
  status: 'Safe',
  health: 'Healthy'
};

const BRANDS = [
  'Gillette',
  'Mister Potato',
  'Sun Up',
  'Olay',
  'Head & Shoulders',
  'Pampers',
  'Vicks',
  'Whisper',
  'Tide',
  'Mabroc'
];

export default function AddSKU({ onClose, onSkuAdded }) {
  const [formData, setFormData] = useState(initialSKU);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState('');
  const firstInputRef = useRef(null);

  useEffect(() => {
    firstInputRef.current?.focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotice('');

    const newSku = {
      ...formData,
      id: formData.id || `SKU-${Date.now().toString().slice(-4)}`,
      avail: Number(formData.avail),
      total: Number(formData.avail),
      reserved: 0,
      minSafe: Number(formData.minSafe),
      margin: `+${Math.round(((parseFloat(formData.retail) - parseFloat(formData.wholesale)) / parseFloat(formData.wholesale || 1)) * 100)}%`,
      valuation: (Number(formData.avail) * parseFloat(formData.wholesale || 0)).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    };

    try {
      const apiUrl = import.meta.env?.VITE_API_BASE_URL 
        ? `${import.meta.env.VITE_API_BASE_URL}/inventory` 
        : 'http://localhost:5000/api/inventory';

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSku)
      });

      if (!res.ok) throw new Error('Failed to post to backend API');
    } catch (err) {
      console.warn('Backend offline. Adding SKU locally to state:', err.message);
    } finally {
      if (onSkuAdded) onSkuAdded(newSku);
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
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#f7fcf9]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#eef7f2] border border-[#bce3d0] text-[#006241] flex items-center justify-center font-bold">
              +
            </div>
            <div>
              <h2 className="text-base font-bold text-[#10251d]">Add New Master SKU</h2>
              <p className="text-xs text-gray-500">Catalog item registration for Hayleys Hub A</p>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
          {notice && (
            <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded-lg font-semibold border border-blue-200">
              {notice}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                SKU Identification Code
              </label>
              <input
                ref={firstInputRef}
                required
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="e.g. SKU-GLT-05"
                className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Brand / Manufacturer
              </label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
              >
                {BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Item Title / Product Name
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Gillette Mach 3 Turbo Razor"
              className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Item Description &amp; Unit Packaging
            </label>
            <input
              type="text"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="e.g. 1 Razor + 2 Cartridges @ Rs. 1,450"
              className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Assigned Bin / Hub Location
              </label>
              <input
                type="text"
                name="bin"
                value={formData.bin}
                onChange={handleChange}
                placeholder="e.g. Bay F-03 (Hub A)"
                className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Batch Lot #
              </label>
              <input
                type="text"
                name="lot"
                value={formData.lot}
                onChange={handleChange}
                placeholder="e.g. #GLT-2409"
                className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Initial Stock
              </label>
              <input
                required
                type="number"
                min="0"
                name="avail"
                value={formData.avail}
                onChange={handleChange}
                className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Min Safe Stock
              </label>
              <input
                type="number"
                min="0"
                name="minSafe"
                value={formData.minSafe}
                onChange={handleChange}
                className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Wholesale (Rs.)
              </label>
              <input
                type="text"
                name="wholesale"
                value={formData.wholesale}
                onChange={handleChange}
                className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Retail (Rs.)
              </label>
              <input
                type="text"
                name="retail"
                value={formData.retail}
                onChange={handleChange}
                className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Batch Expiry Date
            </label>
            <input
              type="date"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              className="bg-[#f8faf9] border border-gray-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00c993]"
            />
          </div>

          {/* Footer Actions */}
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
              {isSubmitting ? 'Registering SKU...' : '+ Save & Register SKU'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
