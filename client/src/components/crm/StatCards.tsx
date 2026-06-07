"use client";

import React from "react";
import { useLeads } from "../../context/LeadContext";

export default function StatCards() {
  const { totalStats } = useLeads();
  const targetLeads = 15;
  const progressPercent = Math.min(
    100,
    Math.round((totalStats.total / targetLeads) * 100)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <div className="bg-white dark:bg-[#1e293b] text-slate-800 dark:text-slate-100 p-6 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between h-36 relative overflow-hidden group transition-all duration-300">
        <div className="absolute top-0 right-0 w-20 h-20 bg-teal-50/40 dark:bg-teal-950/20 -mr-6 -mt-6 rounded-full opacity-60 transition-transform group-hover:scale-110"></div>
        <div className="z-10 flex flex-col items-start text-left w-full">
          <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
            Total Leads
          </p>
          <h3 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100 my-2">
            {totalStats.total}
          </h3>
        </div>
        <div className="z-10 mt-auto w-full">
          <div className="flex justify-between text-[10px] mb-1 font-semibold text-slate-500 dark:text-slate-400">
            <span>Target: {targetLeads}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-teal-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] text-slate-800 dark:text-slate-100 p-6 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between h-36 relative overflow-hidden group transition-all duration-300">
        <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50/40 dark:bg-amber-950/20 -mr-6 -mt-6 rounded-full opacity-60 transition-transform group-hover:scale-110"></div>
        <div className="z-10 flex flex-col items-start text-left w-full">
          <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
            Converted Leads
          </p>
          <h3 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100 my-2">
            {totalStats.converted}
          </h3>
        </div>
        <div className="z-10 flex items-center gap-1.5 text-xs font-medium mt-auto text-amber-600 dark:text-amber-500">
          <span className="material-symbols-outlined text-[14px]">trending_up</span>
          <span>12.5% increase this month</span>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] text-slate-800 dark:text-slate-100 p-6 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between h-36 relative overflow-hidden group transition-all duration-300">
        <div className="absolute top-0 right-0 w-20 h-20 bg-rose-50/40 dark:bg-rose-950/20 -mr-6 -mt-6 rounded-full opacity-60 transition-transform group-hover:scale-110"></div>
        <div className="z-10 flex flex-col items-start text-left w-full">
          <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
            Qualified Leads
          </p>
          <h3 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100 my-2">
            {totalStats.qualified}
          </h3>
        </div>
        <div className="z-10 flex items-center gap-2 text-xs font-medium mt-auto text-rose-600 dark:text-rose-400">
          <div className="flex -space-x-1.5">
            <div className="w-5 h-5 rounded-full border border-white dark:border-[#1e293b] bg-slate-100 dark:bg-slate-800 text-[8px] flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">JD</div>
            <div className="w-5 h-5 rounded-full border border-white dark:border-[#1e293b] bg-teal-50 dark:bg-teal-950/40 text-[8px] flex items-center justify-center font-bold text-teal-700 dark:text-teal-400">SJ</div>
            <div className="w-5 h-5 rounded-full border border-white dark:border-[#1e293b] bg-amber-50 dark:bg-amber-950/40 text-[8px] flex items-center justify-center font-bold text-amber-700 dark:text-amber-400">ER</div>
          </div>
          <span>+2 new today</span>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e293b] text-slate-800 dark:text-slate-100 p-6 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between h-36 relative overflow-hidden group transition-all duration-300">
        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50/40 dark:bg-blue-950/20 -mr-6 -mt-6 rounded-full opacity-60 transition-transform group-hover:scale-110"></div>
        <div className="z-10 flex flex-col items-start text-left w-full">
          <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
            Lost Leads
          </p>
          <h3 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100 my-2">
            {totalStats.lost}
          </h3>
        </div>
        <div className="z-10 flex items-center gap-1.5 text-xs font-medium mt-auto text-blue-600 dark:text-blue-400">
          <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
          <span>4.2% lower than Q3</span>
        </div>
      </div>
    </div>
  );
}
