"use client";

import { LeadProvider, useLeads } from "@/context/LeadContext";
import Sidebar from "@/components/layout/Sidebar";
import StatCards from "@/components/crm/StatCards";
import LeadTable from "@/components/crm/LeadTable";
import LeadModal from "@/components/crm/LeadModal";

function DashboardContent() {
  const { searchQuery, setSearchQuery, setIsModalOpen, setSelectedLeadForEdit } = useLeads();

  const handleAddClick = () => {
    setSelectedLeadForEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen w-screen bg-surface-bright overflow-hidden">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col pl-[240px] h-full overflow-hidden">
        {/* Header navigation bar */}
        <header className="h-16 bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-6 z-40 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md border border-slate-200 rounded-full bg-white flex items-center px-3.5 py-1.5 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-500 transition-all">
              <span className="material-symbols-outlined text-slate-400 text-[20px] mr-2 pointer-events-none select-none">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-0 py-0.5"
                placeholder="Search across name, email, company..."
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-all cursor-pointer"
              title="Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-all cursor-pointer"
              title="History"
            >
              <span className="material-symbols-outlined">history</span>
            </button>
            <div className="h-6 w-[1px] bg-outline-variant mx-1"></div>
            <button
              onClick={handleAddClick}
              className="bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Add Lead</span>
            </button>
          </div>
        </header>

        {/* Scrollable Dashboard Viewport */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-surface-bright">
          <div className="max-w-7xl mx-auto space-y-6 pb-12">
            {/* Page Title & Subtitle */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-on-surface">CRM Dashboard</h2>
                <p className="text-xs text-on-surface-variant">Manage your pipeline prospects and leads metrics.</p>
              </div>
            </div>

            {/* KPI Cards Row */}
            <StatCards />

            {/* Leads Table Card */}
            <LeadTable />
          </div>
        </main>
      </div>

      {/* Floating Dialog Drawer */}
      <LeadModal />
    </div>
  );
}

export default function Home() {
  return (
    <LeadProvider>
      <DashboardContent />
    </LeadProvider>
  );
}
