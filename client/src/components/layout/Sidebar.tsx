"use client";

import React, { useState } from "react";

interface SidebarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function Sidebar({ activeTab = "dashboard", setActiveTab }: SidebarProps) {
  const [salesOpen, setSalesOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-white dark:bg-[#1e293b] border-r border-slate-200 dark:border-slate-700 flex flex-col py-6 px-3 z-50 transition-colors duration-300">
      <div className="mb-8 px-4 flex items-center gap-3">
        <img src="/logo.png" alt="NexusCRM Logo" className="w-8 h-8 object-contain" />
        <div>
          <h1 className="font-semibold text-headline-md text-primary leading-tight">
            NexusCRM
          </h1>
          <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 opacity-70">
            Sales & Operations Panel
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <a
          onClick={(e) => {
            e.preventDefault();
            setActiveTab?.("dashboard");
          }}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group relative ${
            activeTab === "dashboard"
              ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white sidebar-active-indicator"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer active:scale-95"
          }`}
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-semibold text-label-md">Dashboard</span>
        </a>

        <a
          onClick={(e) => {
            e.preventDefault();
            setActiveTab?.("analytics");
          }}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors group cursor-pointer active:scale-95 duration-150 relative ${
            activeTab === "analytics"
              ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white sidebar-active-indicator"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
          href="#"
        >
          <span className="material-symbols-outlined">insights</span>
          <span className="font-semibold text-label-md">Analytics</span>
        </a>

        <div>
          <button
            onClick={() => {
              setSalesOpen(!salesOpen);
              setActiveTab?.("sales");
            }}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors group cursor-pointer active:scale-95 duration-150 text-left ${
              activeTab === "sales"
                ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
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
            <ul className="space-y-1.5 border-l border-slate-200 dark:border-slate-700 pl-3 py-1">
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab?.("sales");
                  }}
                  href="#"
                  className="block py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
                >
                  Invoices
                </a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab?.("sales");
                  }}
                  href="#"
                  className="block py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
                >
                  Transactions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <button
            onClick={() => {
              setPurchaseOpen(!purchaseOpen);
              setActiveTab?.("purchase");
            }}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors group cursor-pointer active:scale-95 duration-150 text-left ${
              activeTab === "purchase"
                ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
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
            <ul className="space-y-1.5 border-l border-slate-200 dark:border-slate-700 pl-3 py-1">
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab?.("purchase");
                  }}
                  href="#"
                  className="block py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
                >
                  Orders
                </a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab?.("purchase");
                  }}
                  href="#"
                  className="block py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
                >
                  Vendors
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <button
            onClick={() => {
              setSettingsOpen(!settingsOpen);
              setActiveTab?.("settings");
            }}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors group cursor-pointer active:scale-95 duration-150 text-left ${
              activeTab === "settings"
                ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
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
            <ul className="space-y-1.5 border-l border-slate-200 dark:border-slate-700 pl-3 py-1">
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab?.("settings");
                  }}
                  href="#"
                  className="block py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab?.("settings");
                  }}
                  href="#"
                  className="block py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700 space-y-1">
        <a
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined">help</span>
          <span className="font-semibold text-label-md">Help</span>
        </a>
        
        <div className="flex items-center gap-3 px-4 py-3 mt-2">
          <img
            alt="Junaid Qureshi"
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4K30NPm_ixfQtJImOwmVhNjwIScDEyYdoXGPXZaORELy6-HlhVCwF4oU0Ejt-3KyeAs3Nwf7fEuoEWTk6DEOXtwLL470jOVesf9l4JTdhVjk400uuYtYhBqHMW5_hzdA64dxLWC6qWh--4_lw8d34dxVLWoAbAcmiQf4-IZpAlKHZmACUH9R3WifKtdsEH4AX_CcQjIAd_rR5o-h6CZEfYYQtE5WE7MEuq5YG33ytOiU6dYqTj-uRNYZ1hvrJBHjIYIcrlbG-nVE"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              Junaid Qureshi
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate opacity-80">
              System Administrator
            </p>
          </div>
          <button
            className="text-slate-500 dark:text-slate-400 hover:text-error dark:hover:text-red-400 transition-colors p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Log Out"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
