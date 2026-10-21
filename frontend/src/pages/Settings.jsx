import React from 'react';
import SettingsForm from '../components/forms/SettingsForm.jsx';

export default function Settings() {
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

        {/* Modular Settings Form Component */}
        <SettingsForm />

      </div>
    </div>
  );
}
