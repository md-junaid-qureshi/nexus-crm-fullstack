"use client";

import React, { useState, useMemo } from "react";
import { useLeads, Lead, LeadStatus } from "../../context/LeadContext";

export default function LeadTable() {
  const {
    filteredLeads,
    currentPage,
    setCurrentPage,
    leadsPerPage,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    setSelectedLeadForEdit,
    setIsModalOpen,
    deleteLead,
  } = useLeads();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const dateFilteredLeads = useMemo(() => {
    let result = [...filteredLeads];
    if (fromDate) {
      const from = new Date(fromDate).getTime();
      result = result.filter((lead) => new Date(lead.createdAt).getTime() >= from);
    }
    if (toDate) {
      const to = new Date(toDate).setHours(23, 59, 59, 999);
      result = result.filter((lead) => new Date(lead.createdAt).getTime() <= to);
    }
    return result;
  }, [filteredLeads, fromDate, toDate]);

  const paginatedLeadsForTable = useMemo(() => {
    const startIndex = (currentPage - 1) * leadsPerPage;
    return dateFilteredLeads.slice(startIndex, startIndex + leadsPerPage);
  }, [dateFilteredLeads, currentPage, leadsPerPage]);

  const totalPagesForTable = useMemo(() => {
    return Math.max(1, Math.ceil(dateFilteredLeads.length / leadsPerPage));
  }, [dateFilteredLeads.length, leadsPerPage]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  const getStatusBadgeClass = (status: LeadStatus) => {
    switch (status) {
      case "New":
        return "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400";
      case "Contacted":
        return "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400";
      case "Qualified":
        return "bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400";
      case "Converted":
        return "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400";
      case "Lost":
        return "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400";
    }
  };

  const handleEditClick = (lead: Lead) => {
    setSelectedLeadForEdit(lead);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      deleteLead(id);
    }
  };

  const handleExport = () => {
    alert("Exporting current filter of " + filteredLeads.length + " leads to CSV...");
  };

  const startEntryIndex = dateFilteredLeads.length === 0 ? 0 : (currentPage - 1) * leadsPerPage + 1;
  const endEntryIndex = Math.min(currentPage * leadsPerPage, dateFilteredLeads.length);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm transition-all duration-300">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider shrink-0">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto text-sm bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 transition-all text-slate-800 dark:text-slate-100 cursor-pointer"
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full lg:w-auto lg:justify-end">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider w-8 sm:w-auto shrink-0 text-left">From</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-auto border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-[#1e293b] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 transition-all cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider w-8 sm:w-auto shrink-0 text-left">To</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-auto border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-[#1e293b] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 transition-all cursor-pointer"
              />
            </div>
          </div>

          <div className="relative w-full sm:w-44">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[16px] pointer-events-none">
              filter_list
            </span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 pl-9 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 appearance-none transition-all text-slate-800 dark:text-slate-100 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[14px] text-slate-500 dark:text-slate-400 pointer-events-none">
              keyboard_arrow_down
            </span>
          </div>

          <button
            onClick={handleExport}
            className="bg-slate-100/80 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-100 cursor-pointer w-full sm:w-auto"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export
          </button>
        </div>
      </div>


      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Lead ID
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Name & Contact
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Company
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
              {paginatedLeadsForTable.length > 0 ? (
                paginatedLeadsForTable.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-4 text-xs whitespace-nowrap text-slate-600 dark:text-slate-300">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-primary dark:text-sky-400 font-semibold whitespace-nowrap">
                      {lead.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                          {lead.name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {lead.email}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 opacity-80 mt-0.5">
                          {lead.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-800 dark:text-slate-200 whitespace-nowrap font-medium">
                      {lead.company}
                    </td>
                    <td className="text-left px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center justify-center text-xs font-medium px-2.5 py-1 rounded-full ${getStatusBadgeClass(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-400 max-w-[220px] truncate">
                      {lead.notes || <span className="italic opacity-60">No notes</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEditClick(lead)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-450 hover:text-indigo-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                          title="Edit Lead"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(lead.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-450 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete Lead"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-sm text-slate-500 dark:text-slate-400 italic"
                  >
                    No leads found matching current search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {dateFilteredLeads.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-[#0f172a]/60">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Showing {startEntryIndex} to {endEntryIndex} of {dateFilteredLeads.length} entries
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>

              {Array.from({ length: totalPagesForTable }, (_, index) => {
                const pageNum = index + 1;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary text-on-primary shadow-sm"
                        : "border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPagesForTable}
                className="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
