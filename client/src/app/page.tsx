"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { LeadProvider, useLeads } from "@/context/LeadContext";
import Sidebar from "@/components/layout/Sidebar";
import StatCards from "@/components/crm/StatCards";
import LeadTable from "@/components/crm/LeadTable";
import LeadModal from "@/components/crm/LeadModal";

function DashboardContent() {
  const { searchQuery, setSearchQuery, setIsModalOpen, setSelectedLeadForEdit } = useLeads();
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleAddClick = () => {
    setSelectedLeadForEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen w-screen bg-slate-50 dark:bg-[#0f172a] overflow-hidden text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col pl-[240px] h-full overflow-hidden">
        <header className="h-16 bg-white dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-700/60 flex justify-between items-center px-6 z-40 shrink-0 transition-colors duration-300">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-lg border border-slate-200 dark:border-slate-700/60 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center px-4 py-1.5 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-slate-700/40 focus-within:border-indigo-500 dark:focus-within:border-indigo-650 transition-all duration-300">
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[20px] mr-2 pointer-events-none select-none">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-0 py-0.5"
                placeholder="Search across name, email, company..."
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer animate-none"
              title="Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer animate-none"
              title="History"
            >
              <span className="material-symbols-outlined">history</span>
            </button>
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex-shrink-0"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
              {!mounted && <span className="w-[18px] h-[18px]" />}
            </button>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <button
              onClick={handleAddClick}
              className="bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Add Lead</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300">
          <div className="max-w-7xl mx-auto space-y-6 pb-12">
            {activeTab === "dashboard" ? (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">CRM Dashboard</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Manage your pipeline prospects and leads metrics.</p>
                  </div>
                </div>

                <StatCards />

                <LeadTable />
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 capitalize">{activeTab} Panel</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Enterprise CRM Modules</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-[#1e293b]/40 transition-colors duration-300">
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">Module Under Development</p>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">This core engine is structured for enterprise scaling. The data pipeline is currently provisioned for Lead Management.</p>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

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
