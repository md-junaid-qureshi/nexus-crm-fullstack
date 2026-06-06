"use client";

import React, { useState } from "react";

export default function Sidebar() {
  const [salesOpen, setSalesOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-surface border-r border-outline-variant flex flex-col py-6 px-3 z-50 glass-panel">
      {/* Brand Header */}
      <div className="mb-8 px-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined text-[20px]">dashboard</span>
        </div>
        <div>
          <h1 className="font-semibold text-headline-md text-primary leading-tight">
            NexusCRM
          </h1>
          <p className="text-[10px] uppercase tracking-wider text-on-surface-variant opacity-70">
            Sales & Operations Panel
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {/* Dashboard Link (Always Active for this prototype) */}
        <a
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-secondary-container text-on-secondary-container sidebar-active-indicator relative group transition-all duration-200"
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-semibold text-label-md">Dashboard</span>
        </a>

        {/* Analytics Link */}
        <a
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors group cursor-pointer active:scale-95 duration-150"
          href="#"
        >
          <span className="material-symbols-outlined">insights</span>
          <span className="font-semibold text-label-md">Analytics</span>
        </a>

        {/* Sales Dropdown Menu */}
        <div>
          <button
            onClick={() => setSalesOpen(!salesOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors group cursor-pointer active:scale-95 duration-150 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">payments</span>
              <span className="font-semibold text-label-md">Sales</span>
            </div>
            <span
              className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                salesOpen ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>
          </button>
          
          <div
            className={`pl-11 pr-4 overflow-hidden transition-all duration-300 ${
              salesOpen ? "max-h-24 opacity-100 mt-1" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="space-y-1.5 border-l border-outline-variant/30 pl-3 py-1">
              <li>
                <a
                  href="#"
                  className="block py-1 text-xs text-on-surface-variant hover:text-primary transition-colors"
                >
                  Invoices
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-1 text-xs text-on-surface-variant hover:text-primary transition-colors"
                >
                  Transactions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Purchase Dropdown Menu */}
        <div>
          <button
            onClick={() => setPurchaseOpen(!purchaseOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors group cursor-pointer active:scale-95 duration-150 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">shopping_cart</span>
              <span className="font-semibold text-label-md">Purchase</span>
            </div>
            <span
              className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                purchaseOpen ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>
          </button>
          
          <div
            className={`pl-11 pr-4 overflow-hidden transition-all duration-300 ${
              purchaseOpen ? "max-h-24 opacity-100 mt-1" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="space-y-1.5 border-l border-outline-variant/30 pl-3 py-1">
              <li>
                <a
                  href="#"
                  className="block py-1 text-xs text-on-surface-variant hover:text-primary transition-colors"
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-1 text-xs text-on-surface-variant hover:text-primary transition-colors"
                >
                  Vendors
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Settings Dropdown Menu */}
        <div>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors group cursor-pointer active:scale-95 duration-150 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-semibold text-label-md">Settings</span>
            </div>
            <span
              className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                settingsOpen ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>
          </button>
          
          <div
            className={`pl-11 pr-4 overflow-hidden transition-all duration-300 ${
              settingsOpen ? "max-h-24 opacity-100 mt-1" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="space-y-1.5 border-l border-outline-variant/30 pl-3 py-1">
              <li>
                <a
                  href="#"
                  className="block py-1 text-xs text-on-surface-variant hover:text-primary transition-colors"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-1 text-xs text-on-surface-variant hover:text-primary transition-colors"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Footer Profile area */}
      <div className="mt-auto pt-6 border-t border-outline-variant/30 space-y-1">
        <a
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined">help</span>
          <span className="font-semibold text-label-md">Help</span>
        </a>
        
        <div className="flex items-center gap-3 px-4 py-3 mt-2">
          <img
            alt="Junaid Qureshi"
            className="w-8 h-8 rounded-full bg-surface-container-highest object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4K30NPm_ixfQtJImOwmVhNjwIScDEyYdoXGPXZaORELy6-HlhVCwF4oU0Ejt-3KyeAs3Nwf7fEuoEWTk6DEOXtwLL470jOVesf9l4JTdhVjk400uuYtYhBqHMW5_hzdA64dxLWC6qWh--4_lw8d34dxVLWoAbAcmiQf4-IZpAlKHZmACUH9R3WifKtdsEH4AX_CcQjIAd_rR5o-h6CZEfYYQtE5WE7MEuq5YG33ytOiU6dYqTj-uRNYZ1hvrJBHjIYIcrlbG-nVE"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-on-surface truncate">
              Junaid Qureshi
            </p>
            <p className="text-xs text-on-surface-variant truncate opacity-80">
              System Administrator
            </p>
          </div>
          <button
            className="text-on-surface-variant hover:text-error transition-colors p-1 rounded hover:bg-surface-container-high"
            title="Log Out"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
