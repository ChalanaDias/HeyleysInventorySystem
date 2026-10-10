import React from 'react';

const SVG = {
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Bell: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
  LogOut: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
  ChevronDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Box: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
  Money: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>,
  Cart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>,
  Hammer: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>, // Actually it's more like a gavel in the image, but this works
  Barcode: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5v14M8 5v14M12 5v14M17 5v14M21 5v14"></path></svg>,
  MapPin: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  Activity: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
  Filter: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>,
  Edit: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
  ExternalLink: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>,
  BarChart: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>,
  CheckCircle: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  ShieldCheck: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>,
  Thermometer: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>
};

const SKUData = [
  {
    id: 'SKU-GLT-01',
    name: 'Gillette Blue 2 Disposable',
    desc: 'Single Disposable Razor @ Rs. 150',
    brand: 'Gillette',
    bin: 'Bay F-01 (Hub A)',
    avail: 1200,
    total: 1250,
    reserved: 50,
    wholesale: '125.00',
    retail: '150.00',
    margin: '+20%',
    valuation: '150,000.00',
    health: 'Healthy',
    minSafe: 300,
    lot: '#GLT-2401',
    expiry: 'Aug 20, 2028',
    status: 'Safe'
  },
  {
    id: 'SKU-GLT-02',
    name: 'Gillette Blue 2 Disposable Pouches',
    desc: '5+1 Razor Pouch @ Rs. 750',
    brand: 'Gillette',
    bin: 'Bay F-02 (Hub A)',
    avail: 640,
    total: 700,
    reserved: 60,
    wholesale: '620.00',
    retail: '750.00',
    margin: '+21%',
    valuation: '396,800.00',
    health: 'Healthy',
    minSafe: 150,
    lot: '#GLT-2402',
    expiry: 'Aug 20, 2028',
    status: 'Safe'
  },
  {
    id: 'SKU-MPT-01',
    name: 'MP Crisps Original',
    desc: 'Potato Crisps 100g @ Rs. 840',
    brand: 'Mister Potato',
    bin: 'Bay M-03 (Hub A)',
    avail: 1150,
    total: 1250,
    reserved: 100,
    wholesale: '700.00',
    retail: '840.00',
    margin: '+20%',
    valuation: '805,000.00',
    health: 'Healthy',
    minSafe: 250,
    lot: '#MPT-2401',
    expiry: 'Apr 20, 2026',
    status: 'Safe'
  },
  {
    id: 'SKU-SUN-07',
    name: 'GA Peanut Butter Creamy',
    desc: 'Creamy Butter 450g @ Rs. 1,700',
    brand: 'Sun Up',
    bin: 'Bay S-07 (Hub A)',
    avail: 520,
    total: 580,
    reserved: 60,
    wholesale: '1420.00',
    retail: '1700.00',
    margin: '+20%',
    valuation: '738,400.00',
    health: 'Healthy',
    minSafe: 110,
    lot: '#SUN-2407',
    expiry: 'May 30, 2026',
    status: 'Safe'
  }
];

export default function Inventory() {
  return (
    <div className="w-full flex flex-col min-h-screen text-[#10251d] font-sans">
      {/* Main Content */}
      <div className="p-6 flex flex-col gap-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#006241] bg-[#eef6f1] px-2 py-1 rounded border border-[#bce3d0] tracking-wider uppercase">
                Hayleys Hub A Master Stock
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00c993]"></div>
                <span className="text-xs text-gray-500 font-medium">Auto-Sync Enabled (10s)</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[#10251d]">Inventory Catalog & SKU Management</h1>
            <p className="text-gray-500 text-sm max-w-3xl">
              Complete directory of active SKUs, bin locations, batch lots, and stock health thresholds across Hayleys Central Distribution Hub A.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50">
              <SVG.ExternalLink /> Export Registry <SVG.ChevronDown />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#eef7f2] border border-[#bce3d0] rounded-md text-sm font-semibold text-[#0d5236] shadow-sm hover:bg-[#d1f0e4]">
              <SVG.Filter /> Batch Adjust Stock
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#006241] rounded-md text-sm font-semibold text-white shadow-sm hover:bg-[#004e34]">
              <SVG.Plus /> Add New SKU
            </button>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">Total Cataloged</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#10251d]">254</span>
                <span className="text-sm font-medium text-gray-500">SKUs</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-bold text-[#00c993]">↗ +12 added this month</span>
                {/* Sparkline placeholder */}
                <svg className="w-16 h-4 stroke-[#00c993] fill-none" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,20 Q10,5 25,15 T50,10 T75,18 T100,5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <div className="w-10 h-10 rounded bg-[#eef6f1] text-[#00c993] flex items-center justify-center">
              <SVG.Box />
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">In-Stock Valuation</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#10251d]">Rs.</span>
                <span className="text-3xl font-extrabold text-[#10251d]">1,428,590</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs font-bold bg-[#eef6f1] text-[#00c993] px-2 py-0.5 rounded-full">+3.4% vs last qtr</span>
                <span className="text-xs text-gray-400">Holding: 94.2%</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded bg-[#eef6f1] text-[#00c993] flex items-center justify-center">
              <SVG.Money />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">Low Stock Warnings</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#10251d]">14</span>
                <span className="text-sm font-bold text-red-500">Critical</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold text-red-600">! PO Pending for 8</span>
                <a href="#" className="text-xs font-bold text-[#006241] hover:underline">Review POs</a>
              </div>
            </div>
            <div className="w-10 h-10 rounded bg-red-50 text-red-500 flex items-center justify-center">
              <SVG.Cart />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">Quarantined Stock</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#10251d]">3</span>
                <span className="text-sm font-medium text-gray-500">Batches</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs font-bold bg-[#f1f5f9] text-[#475569] px-2 py-0.5 rounded">QA Room B</span>
                <span className="text-xs text-gray-400">120 Units</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded bg-gray-100 text-gray-500 flex items-center justify-center">
              <SVG.Hammer />
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <SVG.Search />
              </span>
              <input 
                type="text" 
                placeholder="Search SKU code, item title, lot # or bin..." 
                className="w-full bg-[#f8faf9] border border-gray-200 rounded-md py-2 pl-10 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-[#00c993]"
              />
              <button className="absolute inset-y-1.5 right-1.5 px-3 bg-[#eef7f2] border border-[#bce3d0] rounded text-[#0d5236] text-xs font-bold flex items-center gap-1">
                <SVG.Barcode /> Scan
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#f8faf9] border border-gray-200 rounded-md text-sm font-semibold text-gray-700">
              <SVG.MapPin /> All Hub Locations <SVG.ChevronDown />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#eef7f2] border border-[#bce3d0] rounded-md text-sm font-semibold text-[#0d5236]">
              <SVG.Activity /> All Health States <SVG.ChevronDown />
            </button>
            <button className="px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-500">
              <SVG.Filter />
            </button>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mr-2">Brand / Category:</span>
            <button className="px-3 py-1 bg-[#006241] text-white text-xs font-bold rounded-full">All Brands (62)</button>
            <button className="px-3 py-1 bg-[#eef7f2] text-[#0d5236] text-xs font-bold rounded-full">Gillette (23)</button>
            <button className="px-3 py-1 bg-[#eef7f2] text-[#0d5236] text-xs font-bold rounded-full">Olay (4)</button>
            <button className="px-3 py-1 bg-[#eef7f2] text-[#0d5236] text-xs font-bold rounded-full">Head & Shoulders (7)</button>
            <button className="px-3 py-1 bg-[#eef7f2] text-[#0d5236] text-xs font-bold rounded-full">Pampers (13)</button>
            <button className="px-3 py-1 bg-[#eef7f2] text-[#0d5236] text-xs font-bold rounded-full">Vicks (3)</button>
            <button className="px-3 py-1 bg-[#eef7f2] text-[#0d5236] text-xs font-bold rounded-full">Whisper (1)</button>
            <button className="px-3 py-1 bg-[#eef7f2] text-[#0d5236] text-xs font-bold rounded-full">Tide (1)</button>
            <button className="px-3 py-1 bg-[#eef7f2] text-[#0d5236] text-xs font-bold rounded-full">Mabroc (2)</button>
            <button className="px-3 py-1 bg-[#eef7f2] text-[#0d5236] text-xs font-bold rounded-full">Sun Up (7)</button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eef7f2] text-[#0d5236] text-[10px] uppercase tracking-wider font-bold border-b border-gray-200">
                <th className="px-4 py-3">SKU Identification & Barcode</th>
                <th className="px-4 py-3">Brand / Category & Bin Location</th>
                <th className="px-4 py-3 w-48">Stock Available</th>
                <th className="px-4 py-3 text-right">Wholesale Price (Rs.)</th>
                <th className="px-4 py-3 text-right">Retail Price (Rs.)</th>
                <th className="px-4 py-3 text-right">Valuation (Rs.)</th>
                <th className="px-4 py-3">Reorder & Health</th>
                <th className="px-4 py-3">Batch & Expiry</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {SKUData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#eef7f2] rounded border border-[#bce3d0] flex items-center justify-center">
                        {/* Barcode-like visual */}
                        <div className="flex gap-0.5 h-6">
                          <div className="w-1 bg-[#10251d]"></div>
                          <div className="w-0.5 bg-[#10251d]"></div>
                          <div className="w-1 bg-[#10251d]"></div>
                          <div className="w-1.5 bg-[#10251d]"></div>
                          <div className="w-0.5 bg-[#10251d]"></div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[#10251d]">{item.name}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-mono bg-[#eef6f1] text-[#006241] px-1.5 py-0.5 rounded">{item.id}</span>
                          <span className="text-xs text-gray-500">&bull; {item.desc}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#10251d]">{item.brand}</span>
                      <div className="flex items-center gap-1 mt-0.5 text-gray-500 text-xs">
                        <SVG.Box /> {item.bin}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-end">
                        <span className="font-bold text-[#006241]">{item.avail} Avail</span>
                        <span className="text-xs text-gray-500">{item.total} total</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-[#006241] h-1.5 rounded-full" style={{width: `${(item.avail / item.total) * 100}%`}}></div>
                      </div>
                      <span className="text-[10px] text-gray-400">{item.reserved} units reserved</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#10251d]">Rs. {item.wholesale}</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wide">Wholesale</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-[#10251d]">Rs. {item.retail}</span>
                      <span className="text-[10px] font-bold text-[#00c993] bg-[#eef7f2] px-1 rounded mt-0.5">{item.margin}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#10251d]">Rs. {item.valuation}</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wide">Total Value</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#006241] bg-[#eef7f2] px-2 py-0.5 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00c993]"></div> {item.health}
                      </span>
                      <span className="text-xs text-gray-500">Min Safe: {item.minSafe}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#10251d]">Lot {item.lot}</span>
                      <span className="text-xs text-gray-500">{item.expiry}</span>
                      <span className="text-[10px] text-gray-400">({item.status})</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="flex items-center gap-1 px-2 py-1 bg-[#eef7f2] text-[#0d5236] rounded text-xs font-bold border border-[#bce3d0] hover:bg-[#d1f0e4]">
                        <SVG.Edit /> Edit
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 bg-gray-50 border border-gray-200 rounded">
                        <SVG.ExternalLink />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Cards Section */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 font-bold text-[#10251d]">
                <SVG.BarChart /> Hub A Capacity Load
              </div>
              <span className="text-xs font-bold text-[#006241]">81.4% Capacity</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Bay A &bull; Bulk Pallet Racks</span>
                  <span className="font-bold text-[#10251d]">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-red-500 h-1.5 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Bay B &bull; Sterile / Pharma Vaults</span>
                  <span className="font-bold text-[#10251d]">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-[#006241] h-1.5 rounded-full" style={{width: '68%'}}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Cold Chain &bull; Bio Vault-01</span>
                  <span className="font-bold text-[#10251d]">79%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-[#00c993] h-1.5 rounded-full" style={{width: '79%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500">Available storage: 420 bins</span>
              <a href="#" className="text-xs font-bold text-[#006241] hover:underline">View Heatmap</a>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 font-bold text-[#10251d]">
                <SVG.CheckCircle /> Daily Cycle Counts
              </div>
              <span className="text-[10px] font-bold text-[#006241] bg-[#eef7f2] px-2 py-0.5 rounded">On Schedule</span>
            </div>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              48 of 50 randomized daily verification counts verified with zero discrepancy variance recorded today.
            </p>
            <div className="mt-auto bg-[#eef7f2] rounded-lg p-3 flex items-start gap-3 border border-[#bce3d0]">
              <div className="text-[#006241] mt-0.5"><SVG.Activity /></div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0d5236]">Auditor Shift: Team Alpha</span>
                <span className="text-[10px] text-[#006241]">Next cycle initiates at 18:00 UTC</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 font-bold text-[#10251d]">
                <SVG.ShieldCheck /> ISO-13485 Compliance
              </div>
              <span className="text-[10px] font-bold text-[#006241] bg-[#eef7f2] px-2 py-0.5 rounded">Validated</span>
            </div>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Temperature and humidity logs in Vault-01 maintained strict 2.0°C to 8.0°C stability without incident across past 720 hours.
            </p>
            <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#006241]">
                <SVG.Thermometer /> Vault-01: +4.2°C Stable
              </span>
              <a href="#" className="text-xs font-bold text-[#006241] hover:underline">Download Cert</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
