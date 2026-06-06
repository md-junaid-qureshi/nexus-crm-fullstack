"use client";

import React from "react";
import { useLeads } from "../../context/LeadContext";

export default function StatCards() {
  const { totalStats } = useLeads();

  // Target leads threshold for visual target progress bar calculations
  const targetLeads = 15;
  const progressPercent = Math.min(
    100,
    Math.round((totalStats.total / targetLeads) * 100)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total Leads Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between h-36 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-20 h-20 bg-teal-50/40 -mr-6 -mt-6 rounded-full opacity-60 transition-transform group-hover:scale-110"></div>
        <div className="z-10 flex flex-col items-start text-left w-full">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Total Leads
          </p>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 my-2">
            {totalStats.total}
          </h3>
        </div>
        <div className="z-10 mt-auto w-full">
          <div className="flex justify-between text-[10px] mb-1 font-semibold text-slate-500">
            <span>Target: {targetLeads}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-teal-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Converted Leads Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between h-36 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50/40 -mr-6 -mt-6 rounded-full opacity-60 transition-transform group-hover:scale-110"></div>
        <div className="z-10 flex flex-col items-start text-left w-full">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Converted Leads
          </p>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 my-2">
            {totalStats.converted}
          </h3>
        </div>
        <div className="z-10 flex items-center gap-1.5 text-xs font-medium mt-auto text-amber-600">
          <span className="material-symbols-outlined text-[14px]">trending_up</span>
          <span>12.5% increase this month</span>
        </div>
      </div>

      {/* Qualified Leads Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between h-36 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-20 h-20 bg-rose-50/40 -mr-6 -mt-6 rounded-full opacity-60 transition-transform group-hover:scale-110"></div>
        <div className="z-10 flex flex-col items-start text-left w-full">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Qualified Leads
          </p>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 my-2">
            {totalStats.qualified}
          </h3>
        </div>
        <div className="z-10 flex items-center gap-2 text-xs font-medium mt-auto text-rose-600">
          <div className="flex -space-x-1.5">
            <div className="w-5 h-5 rounded-full border border-white bg-slate-100 text-[8px] flex items-center justify-center font-bold text-slate-600">JD</div>
            <div className="w-5 h-5 rounded-full border border-white bg-teal-50 text-[8px] flex items-center justify-center font-bold text-teal-700">SJ</div>
            <div className="w-5 h-5 rounded-full border border-white bg-amber-50 text-[8px] flex items-center justify-center font-bold text-amber-700">ER</div>
          </div>
          <span>+2 new today</span>
        </div>
      </div>

      {/* Lost Leads Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between h-36 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50/40 -mr-6 -mt-6 rounded-full opacity-60 transition-transform group-hover:scale-110"></div>
        <div className="z-10 flex flex-col items-start text-left w-full">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Lost Leads
          </p>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900 my-2">
            {totalStats.lost}
          </h3>
        </div>
        <div className="z-10 flex items-center gap-1.5 text-xs font-medium mt-auto text-blue-600">
          <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
          <span>4.2% lower than Q3</span>
        </div>
      </div>
    </div>
  );
}
