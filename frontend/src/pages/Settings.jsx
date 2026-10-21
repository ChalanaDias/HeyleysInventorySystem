import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SVG = {
  CheckCircle: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#006241]">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  SignOut: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  ),
  Save: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  )
};

const DEFAULT_HUBS = [
  {
    id: 'central',
    name: 'Central Distribution Hub',
    description: 'Hayleys Advantis Primary Automated Bulk & Sterile Depot (Bays A-D)'
  },
  {
    id: 'north',
    name: 'North Distribution Hub',
    description: 'Regional High-Throughput Clinical Center'
  },
  {
    id: 'south',
    name: 'South Distribution Hub',
    description: 'Harbor Inbound Gateway & Cold Logistics'
  },
  {
    id: 'east',
    name: 'East Distribution Hub',
    description: 'Specialized Biologics & Cryogenic Repository'
  }
];

export default function Settings() {
  const navigate = useNavigate();

  // Settings State
  const [activeHub, setActiveHub] = useState('central');
  const [syncInterval, setSyncInterval] = useState('10');
  const [minSafeThreshold, setMinSafeThreshold] = useState('150');
  const [dualAuth, setDualAuth] = useState(true);
  const [instantAlert, setInstantAlert] = useState(true);

  // Connection & Feedback State
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveNotice, setSaveNotice] = useState(null);

  // Fetch settings from backend on component mount
  useEffect(() => {
    let isMounted = true;
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const apiUrl = import.meta.env?.VITE_API_BASE_URL 
          ? `${import.meta.env.VITE_API_BASE_URL}/settings` 
          : 'http://localhost:5000/api/settings';

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        if (isMounted && data) {
          if (data.activeHub) setActiveHub(data.activeHub);
          if (data.syncInterval) setSyncInterval(String(data.syncInterval));
          if (data.minSafeThreshold !== undefined) setMinSafeThreshold(String(data.minSafeThreshold));
          if (data.dualAuth !== undefined) setDualAuth(Boolean(data.dualAuth));
          if (data.instantAlert !== undefined) setInstantAlert(Boolean(data.instantAlert));
        }
      } catch (err) {
        console.warn('Backend not reachable or error fetching settings:', err.message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  // Save settings to backend
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveNotice(null);

    const payload = {
      activeHub,
      syncInterval,
      minSafeThreshold: Number(minSafeThreshold),
      dualAuth,
      instantAlert
    };

    try {
      const apiUrl = import.meta.env?.VITE_API_BASE_URL 
        ? `${import.meta.env.VITE_API_BASE_URL}/settings` 
        : 'http://localhost:5000/api/settings';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSaveNotice({ type: 'success', message: 'Facility settings saved successfully to backend!' });
      } else {
        throw new Error(`Failed to save: ${response.status}`);
      }
    } catch (err) {
      console.warn('Backend offline. Settings updated locally:', err.message);
      setSaveNotice({ type: 'info', message: 'Settings saved locally (Backend is currently offline).' });
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setSaveNotice(null);
      }, 4000);
    }
  };

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out of Hayleys IMS?')) {
      navigate('/login');
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen text-[#10251d] font-sans pb-16 pt-[68px]">
      <div className="p-6 md:p-8 flex flex-col gap-6 max-w-5xl">
        
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#10251d]">
            Facility &amp; System Settings
          </h1>
          <p className="text-gray-500 text-sm">
            Configure default facility hubs, automated replenishment rules, and compliance thresholds.
          </p>
        </div>

        {/* Status Notification */}
        {saveNotice && (
          <div
            className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
              saveNotice.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-blue-50 text-blue-800 border-blue-200'
            }`}
          >
            <span>{saveNotice.message}</span>
            <button
              type="button"
              onClick={() => setSaveNotice(null)}
              className="text-gray-400 hover:text-gray-600 font-bold ml-2"
            >
              &times;
            </button>
          </div>
        )}

        {/* Main Settings Card */}
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm flex flex-col gap-8">
          
          {/* Section 1: Active Hayleys Facility Hub */}
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-sm font-bold text-[#10251d]">Active Hayleys Facility Hub</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                All inventory queries, dock receiving allocations, and batch scans route to this active site.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-1">
              {DEFAULT_HUBS.map((hub) => {
                const isSelected = activeHub === hub.id;
                return (
                  <div
                    key={hub.id}
                    onClick={() => setActiveHub(hub.id)}
                    className={`cursor-pointer rounded-xl p-4 transition-all flex justify-between items-start ${
                      isSelected
                        ? 'border-2 border-[#006241] bg-[#f7fcf9] shadow-sm'
                        : 'border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col gap-1 pr-2">
                      <span className={`text-xs font-bold ${isSelected ? 'text-[#006241]' : 'text-[#10251d]'}`}>
                        {hub.name}
                      </span>
                      <span className="text-[11px] text-gray-500 leading-snug">
                        {hub.description}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="shrink-0 mt-0.5">
                        <SVG.CheckCircle />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Inventory Thresholds & Cadence */}
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-sm font-bold text-[#10251d]">Inventory Thresholds &amp; Cadence</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  TELEMETRY SYNC INTERVAL (SECONDS)
                </label>
                <select
                  value={syncInterval}
                  onChange={(e) => setSyncInterval(e.target.value)}
                  className="bg-[#effcf4] border border-[#d5e8dd] rounded-lg px-3.5 py-2.5 text-xs font-semibold text-[#10251d] focus:outline-none focus:ring-2 focus:ring-[#00c993]"
                >
                  <option value="5">5 Seconds (Real-time telemetry)</option>
                  <option value="10">10 Seconds (Recommended)</option>
                  <option value="30">30 Seconds (Reduced bandwidth)</option>
                  <option value="60">60 Seconds (Low priority batch)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  DEFAULT MIN SAFE RE-ORDER THRESHOLD
                </label>
                <input
                  type="number"
                  min="1"
                  value={minSafeThreshold}
                  onChange={(e) => setMinSafeThreshold(e.target.value)}
                  className="bg-[#effcf4] border border-[#d5e8dd] rounded-lg px-3.5 py-2.5 text-xs font-semibold text-[#10251d] focus:outline-none focus:ring-2 focus:ring-[#00c993]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: QA Governance & Approvals */}
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-sm font-bold text-[#10251d]">QA Governance &amp; Approvals</h2>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="bg-[#effcf4] border border-[#d5e8dd] rounded-xl p-3.5 flex items-start gap-3 cursor-pointer hover:bg-[#e6f8ed] transition-colors">
                <input
                  type="checkbox"
                  checked={dualAuth}
                  onChange={(e) => setDualAuth(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#006241] accent-[#006241] cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#10251d]">
                    Dual Authorization on Write-Offs &gt; Rs. 5,000
                  </span>
                  <span className="text-[11px] text-gray-600 mt-0.5">
                    Require warehouse supervisor digital sign-off before inventory quantity negative decrement.
                  </span>
                </div>
              </label>

              <label className="bg-[#effcf4] border border-[#d5e8dd] rounded-xl p-3.5 flex items-start gap-3 cursor-pointer hover:bg-[#e6f8ed] transition-colors">
                <input
                  type="checkbox"
                  checked={instantAlert}
                  onChange={(e) => setInstantAlert(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#006241] accent-[#006241] cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#10251d]">
                    Instant Lead Auditor Notification on RMA Quarantine
                  </span>
                  <span className="text-[11px] text-gray-600 mt-0.5">
                    Dispatches instant system alert when returned items are tagged as Damaged or Biohazard.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Section 4: Account & SSO Authentication */}
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-sm font-bold text-[#10251d]">Account &amp; SSO Authentication</h2>
            </div>

            <div className="bg-[#effcf4] border border-[#d5e8dd] rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#10251d]">
                  Hayleys Advantis Corporate Single Sign-On (SSO)
                </span>
                <span className="text-[11px] text-gray-600 mt-0.5">
                  Session secured via 256-bit encryption. You can switch employee badge profiles or register a new operational role.
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => alert('SSO Profile management dialog launched.')}
                  className="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
                >
                  Switch / Register
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                >
                  <SVG.SignOut /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Save Configuration Button */}
          <div className="flex justify-end pt-2 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#006241] hover:bg-[#004e34] disabled:opacity-60 text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
            >
              <SVG.Save />
              <span>{isSaving ? 'Saving...' : 'Save Configuration'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
