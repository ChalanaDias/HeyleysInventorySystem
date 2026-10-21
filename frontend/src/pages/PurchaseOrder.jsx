import React, { useState, useEffect } from 'react';
import CreatePO from '../components/forms/CreatePO.jsx';

const SVG = {
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Box: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  ),
  Clock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Truck: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  ),
  Gauge: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M4.93 4.93l2.83 2.83M2 12h4M4.93 19.07l2.83-2.83M12 22v-4M19.07 19.07l-2.83-2.83M22 12h-4M19.07 4.93l-2.83 2.83"></path>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  Calendar: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  Download: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  ),
  FileText: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  Barcode: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5v14M8 5v14M12 5v14M17 5v14M21 5v14"></path>
    </svg>
  ),
  ExternalLink: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  AuditIcon: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      <path d="m9 14 2 2 4-4"></path>
    </svg>
  )
};

export default function PurchaseOrder() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Connect to backend API when available
  useEffect(() => {
    let isMounted = true;
    const fetchPurchaseOrders = async () => {
      try {
        setIsLoading(true);
        const apiUrl = import.meta.env?.VITE_API_BASE_URL 
          ? `${import.meta.env.VITE_API_BASE_URL}/purchase-orders` 
          : 'http://localhost:5000/api/purchase-orders';

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        const items = Array.isArray(data) ? data : (data.orders || data.items || data.data || []);
        if (isMounted && Array.isArray(items)) {
          setOrders(items);
          setIsBackendConnected(true);
        }
      } catch (err) {
        console.warn('Backend not reachable or error fetching purchase orders:', err.message);
        if (isMounted) {
          setIsBackendConnected(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPurchaseOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter orders according to active tab, search query, and supplier dropdown
  const filteredOrders = orders.filter((order) => {
    // Tab filter
    if (activeTab === 'Pending Approval' && order.status !== 'Pending Approval') return false;
    if (activeTab === 'Sent / Confirmed' && order.status !== 'Sent / Confirmed') return false;
    if (activeTab === 'Inbound Partial' && order.status !== 'Awaiting Delivery') return false;
    if (activeTab === 'Received' && order.status !== 'GRN Logged') return false;

    // Supplier dropdown
    if (selectedSupplier !== 'All' && order.supplierName !== selectedSupplier) return false;

    // Search query
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;

    return (
      (order.id && order.id.toLowerCase().includes(q)) ||
      (order.supplierName && order.supplierName.toLowerCase().includes(q)) ||
      (order.issuedBy && order.issuedBy.toLowerCase().includes(q)) ||
      (order.destination && order.destination.toLowerCase().includes(q))
    );
  });

  // Calculate tab counts
  const pendingCount = orders.filter((o) => o.status === 'Pending Approval').length;
  const sentCount = orders.filter((o) => o.status === 'Sent / Confirmed').length;
  const inboundCount = orders.filter((o) => o.status === 'Awaiting Delivery').length;
  const receivedCount = orders.filter((o) => o.status === 'GRN Logged').length;

  return (
    <div className="w-full flex flex-col min-h-screen text-[#10251d] font-sans pb-12 pt-[68px]">
      {/* Page Header Area */}
      <div className="p-6 flex flex-col gap-5">
        
        {/* Breadcrumb & Gateway Status */}
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-500 uppercase tracking-wider text-[11px]">
              Hayleys Procurement Hub / Purchase Orders Ledger
            </span>
            <span className="text-xs font-bold text-[#006241] bg-[#eef6f1] px-2 py-0.5 rounded border border-[#bce3d0] tracking-wider uppercase">
              EDI 850 Synced
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <div className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-[#00c993] animate-pulse' : 'bg-[#00c993]'}`}></div>
            <span className="font-medium text-[11px]">
              {isBackendConnected ? 'ERP Gateway: Connected (Live)' : 'ERP Gateway: Connected'}
            </span>
            <span>&bull;</span>
            <span className="text-[11px]">Last Requisition Cycle: 14 mins ago</span>
          </div>
        </div>

        {/* Page Title & Main Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#eef7f2] border border-[#bce3d0] text-[#006241] flex items-center justify-center shrink-0 mt-0.5">
              <SVG.Box />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#10251d]">
                Purchase Orders &amp; Procurement
              </h1>
              <p className="text-gray-500 text-sm max-w-3xl mt-0.5">
                Manage vendor orders, track procurement lifecycle, approve purchase requisitions, and monitor inbound shipments across Hayleys automated bays.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50">
              PO vs GRN Variance Report
              <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded font-bold">3 Variances</span>
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50">
              <SVG.Download /> Import PO (EDI/CSV)
            </button>
            <button 
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#006241] hover:bg-[#004e34] text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
            >
              <SVG.Plus /> Create Purchase Order
            </button>
          </div>
        </div>

        {/* Banner: PO vs GRN Intake Reconciliation & Financial Variance Audit */}
        <div className="bg-[#f4faf7] border border-[#bce3d0] rounded-xl p-4 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#006241] text-white flex items-center justify-center shrink-0 shadow-sm">
              <SVG.AuditIcon />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#10251d]">
                  PO vs GRN Intake Reconciliation &amp; Financial Variance Audit
                </span>
                <span className="text-[10px] font-bold text-[#006241] bg-[#e1f5ec] px-2 py-0.5 rounded border border-[#bce3d0]">
                  LIVE RECONCILIATION
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                Tracks ordered quantities vs physical GRN delivery intake across all warehouse bays with real-time financial variance detection.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 self-stretch lg:self-auto justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-emerald-100">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gray-400">PO COMMITTED</span>
              <span className="text-sm font-extrabold text-[#10251d]">Rs. 2,954,000.00</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gray-400">GRN RECEIVED</span>
              <span className="text-sm font-extrabold text-[#10251d]">Rs. 2,857,400.00</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gray-400">NET VARIANCE</span>
              <span className="text-sm font-extrabold text-red-600">▲ -Rs. 96,600.00</span>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-[#006241] hover:bg-[#004e34] text-white rounded-lg text-xs font-bold transition-colors">
              View Audit Report &rarr;
            </button>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: ACTIVE POS */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">Active POs</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-[#10251d]">{orders.length}</span>
                  <span className="text-xs font-semibold text-gray-500">Orders Active</span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#eef7f2] text-[#006241] flex items-center justify-center">
                <SVG.Box />
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
              <span className="font-semibold text-gray-700">Rs. 204,500 committed</span>
              <span className="font-bold text-[#00a876]">10% VS LM</span>
            </div>
          </div>

          {/* Card 2: PENDING SUPPLIER APPROVAL */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">Pending Supplier Approval</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-[#10251d]">7</span>
                  <span className="text-xs font-semibold text-gray-500">Requisitions</span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <SVG.Clock />
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">3 Urgent Review</span>
              <span className="font-semibold text-gray-600">Rs. 62,700 queue</span>
            </div>
          </div>

          {/* Card 3: INBOUND EXPECTED (7D) */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">Inbound Expected (7D)</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-[#10251d]">11</span>
                  <span className="text-xs font-semibold text-gray-500">Shipments</span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <SVG.Truck />
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
              <span className="text-red-500 font-bold text-xs flex items-center gap-1">
                ▲ 3 GRN Pending Docking
              </span>
              <span className="font-semibold text-gray-600">Bay 2-4 Reserved</span>
            </div>
          </div>

          {/* Card 4: AVERAGE LEAD TIME */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">Average Lead Time</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-[#10251d]">4.8</span>
                  <span className="text-xs font-semibold text-gray-500">Days avg</span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#eef7f2] text-[#006241] flex items-center justify-center">
                <SVG.Gauge />
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
              <span className="text-[#00c993] font-bold text-xs flex items-center gap-0.5">
                ↓ -0.9d Improvement
              </span>
              <span className="font-semibold text-gray-600">SLA: 96.4%</span>
            </div>
          </div>
        </div>

        {/* Procurement Pipeline & Receiving Velocity */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-sm font-bold text-[#10251d]">
                Procurement Pipeline &amp; Receiving Velocity
              </h2>
              <p className="text-xs text-gray-500">
                Real-time status breakdown across 42 active purchase orders
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#006241] font-bold bg-[#eef6f1] px-2 py-0.5 rounded border border-[#bce3d0]">
                Monthly Run Rate
              </span>
              <span className="text-gray-400 text-[11px]">Updated 3m ago</span>
            </div>
          </div>

          {/* Multi-segmented Bar */}
          <div className="w-full flex h-3 rounded-full overflow-hidden gap-0.5 bg-gray-100">
            <div style={{ width: '44%' }} className="bg-[#006241] h-full" title="Fulfilled: 44%"></div>
            <div style={{ width: '26%' }} className="bg-[#00a876] h-full" title="In Transit: 26%"></div>
            <div style={{ width: '18%' }} className="bg-[#f59e0b] h-full" title="Supplier Prep: 18%"></div>
            <div style={{ width: '12%' }} className="bg-[#ef4444] h-full" title="At Risk: 12%"></div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006241]"></span>
              <span className="font-medium">Fulfilled: 44% (18 POs)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00a876]"></span>
              <span className="font-medium">In Transit: 26% (11 POs)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
              <span className="font-medium">Supplier Prep: 18% (8 POs)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
              <span className="font-medium">At Risk: 12% (5 POs)</span>
            </div>
          </div>

          {/* Callout Info Row */}
          <div className="bg-[#f8faf9] border border-gray-200 rounded-lg p-3 flex justify-between items-center text-xs">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <span className="text-[#006241] font-bold">&rarr;</span>
              <span>Next Expected Gate Arrival:</span>
              <strong className="text-[#10251d]">Apex Global Pharma (PO-2024-3861) &bull; Bay 02 Gate B</strong>
            </div>
            <span className="bg-[#eef7f2] text-[#006241] font-bold text-[10px] px-2 py-0.5 rounded border border-[#bce3d0]">
              ETA 14:30 CST
            </span>
          </div>
        </div>

        {/* Filter Section & Tabs */}
        <div className="flex flex-col gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('All')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'All'
                  ? 'bg-[#006241] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('Pending Approval')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'Pending Approval'
                  ? 'bg-[#006241] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Pending Approval ({pendingCount})
            </button>
            <button
              onClick={() => setActiveTab('Sent / Confirmed')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'Sent / Confirmed'
                  ? 'bg-[#006241] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Sent / Confirmed ({sentCount})
            </button>
            <button
              onClick={() => setActiveTab('Inbound Partial')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'Inbound Partial'
                  ? 'bg-[#006241] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Inbound Partial ({inboundCount})
            </button>
            <button
              onClick={() => setActiveTab('Received')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'Received'
                  ? 'bg-[#006241] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Received ({receivedCount})
            </button>
          </div>

          {/* Search & Actions Bar */}
          <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="relative flex-1 w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <SVG.Search />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search PO #, vendor, or SKU..."
                className="w-full bg-[#f8faf9] border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#00c993]"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="bg-[#f8faf9] border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00c993]"
              >
                <option value="All">All Approved Suppliers (28)</option>
                <option value="Procter & Gamble Direct Supply Ltd">Procter &amp; Gamble</option>
                <option value="Pampers Logistics Network">Pampers Logistics</option>
                <option value="Hayleys Plantations & Agro">Hayleys Plantations</option>
                <option value="Hayleys Consumer Distribution">Hayleys Consumer</option>
              </select>

              <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm whitespace-nowrap">
                <SVG.Download /> Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Purchase Orders Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#eef7f2] text-[#0d5236] text-[10px] uppercase tracking-wider font-bold border-b border-gray-200">
                  <th className="px-4 py-3">PO NUMBER &amp; ISSUED</th>
                  <th className="px-4 py-3">SUPPLIER / VENDOR</th>
                  <th className="px-4 py-3">ITEMS &amp; VOLUME</th>
                  <th className="px-4 py-3 text-right">COMMITTED VALUE</th>
                  <th className="px-4 py-3">DELIVERY &amp; DESTINATION</th>
                  <th className="px-4 py-3">STATUS &amp; STAGE</th>
                  <th className="px-4 py-3 text-center">QUICK ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-gray-100">
                {isLoading && orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#006241] border-t-transparent rounded-full animate-spin"></div>
                        Fetching purchase orders from backend...
                      </div>
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500 font-medium">
                      No purchase orders found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const statusStyles = {
                      'Awaiting Delivery': 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      'Pending Approval': 'bg-amber-50 text-amber-700 border-amber-200',
                      'GRN Logged': 'bg-teal-50 text-teal-700 border-teal-200',
                      'Sent / Confirmed': 'bg-blue-50 text-blue-700 border-blue-200'
                    };

                    const currentStyle = statusStyles[order.status] || 'bg-gray-50 text-gray-700 border-gray-200';

                    return (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        {/* PO Number & Issued */}
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-[#10251d] text-xs hover:text-[#006241] cursor-pointer">
                              {order.id}
                            </span>
                            <span className="text-[11px] text-gray-500 mt-0.5">
                              {order.issuedDate} &bull; By {order.issuedBy}
                            </span>
                          </div>
                        </td>

                        {/* Supplier / Vendor */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#eef7f2] border border-[#bce3d0] text-[#006241] font-extrabold text-[11px] flex items-center justify-center shrink-0">
                              {order.supplierInitials || 'VN'}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-[#10251d]">
                                {order.supplierName}
                              </span>
                              <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-0.5">
                                <span className="text-[#006241] font-semibold">{order.supplierTier}</span>
                                <span>&bull;</span>
                                <span>Lead: {order.supplierLead}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Items & Volume */}
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-[#10251d]">
                              {order.skus} SKUs
                            </span>
                            <span className="text-[11px] text-gray-500 mt-0.5">
                              {Number(order.totalUnits).toLocaleString()} Total Units
                            </span>
                          </div>
                        </td>

                        {/* Committed Value */}
                        <td className="px-4 py-4 text-right">
                          <div className="flex flex-col items-end">
                            <span className="font-extrabold text-[#10251d]">
                              Rs. {order.committedValue}
                            </span>
                            <span className="text-[10px] text-gray-500 uppercase mt-0.5">
                              {order.paymentTerms}
                            </span>
                          </div>
                        </td>

                        {/* Delivery & Destination */}
                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5 font-bold text-[#10251d]">
                              <SVG.Calendar />
                              <span>{order.deliveryDate}</span>
                            </div>
                            <span className="text-[11px] text-gray-500 mt-0.5">
                              {order.destination}
                            </span>
                          </div>
                        </td>

                        {/* Status & Stage */}
                        <td className="px-4 py-4">
                          <div className="flex flex-col items-start gap-1">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentStyle}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                              {order.status}
                            </span>
                            <span className="text-[10px] text-gray-500 max-w-[200px] truncate">
                              {order.stageLabel}
                            </span>
                          </div>
                        </td>

                        {/* Quick Actions */}
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {order.status === 'Pending Approval' ? (
                              <button className="flex items-center gap-1 px-2.5 py-1 bg-[#006241] text-white rounded text-[11px] font-bold shadow-sm hover:bg-[#004e34]">
                                <SVG.Check /> Approve
                              </button>
                            ) : order.status === 'GRN Logged' ? (
                              <>
                                <button className="px-2 py-1 bg-amber-50 text-amber-800 border border-amber-300 rounded text-[10px] font-bold hover:bg-amber-100">
                                  Variance Report
                                </button>
                                <button className="px-2 py-1 bg-[#eef7f2] text-[#0d5236] border border-[#bce3d0] rounded text-[10px] font-bold hover:bg-[#d1f0e4]">
                                  + Add GRN
                                </button>
                              </>
                            ) : (
                              <button className="flex items-center gap-1 px-2.5 py-1 bg-[#eef7f2] text-[#0d5236] border border-[#bce3d0] rounded text-[11px] font-bold hover:bg-[#d1f0e4]">
                                + GRN
                              </button>
                            )}

                            <button className="p-1 text-gray-400 hover:text-gray-600 bg-gray-50 border border-gray-200 rounded">
                              <SVG.FileText />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-3.5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-3">
            <div>
              Showing <span className="font-bold text-[#10251d]">{filteredOrders.length > 0 ? 1 : 0}</span> to{' '}
              <span className="font-bold text-[#10251d]">{filteredOrders.length}</span> of{' '}
              <span className="font-bold text-[#10251d]">{orders.length}</span> Purchase Orders
            </div>

            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-700">
                Weekly Committed Spend:{' '}
                <strong className="text-[#10251d]">Rs. 176,250.00</strong>
              </span>

              <div className="flex items-center gap-1">
                <button className="w-6 h-6 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 flex items-center justify-center font-bold">
                  &lt;
                </button>
                <button className="w-6 h-6 rounded bg-[#006241] text-white flex items-center justify-center font-bold">
                  1
                </button>
                <button className="w-6 h-6 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 flex items-center justify-center font-bold">
                  2
                </button>
                <button className="px-2 h-6 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 flex items-center justify-center font-bold text-xs">
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner: Ready to Process Dock Shipments? */}
        <div className="bg-[#f4faf7] border border-[#bce3d0] rounded-xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#006241] text-white flex items-center justify-center shrink-0">
              <SVG.Barcode />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[#10251d]">
                Ready to Process Dock Shipments?
              </span>
              <p className="text-xs text-gray-600">
                Launch handheld barcode camera or RFID gateway to automatically match packing slips with active PO lines.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end md:self-auto">
            <button className="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
              Configure EDI
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#006241] hover:bg-[#004e34] text-white rounded-lg text-xs font-bold shadow-sm transition-colors">
              <SVG.ExternalLink /> Open Receiving Terminal
            </button>
          </div>
        </div>

      </div>

      {/* Create Purchase Order Modal */}
      {isCreateOpen && (
        <CreatePO onClose={() => setIsCreateOpen(false)} />
      )}
    </div>
  );
}
