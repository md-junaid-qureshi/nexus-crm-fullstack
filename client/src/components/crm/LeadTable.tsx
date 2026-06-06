"use client";

import React, { useState, useMemo } from "react";
import { useLeads, Lead, LeadStatus } from "../../context/LeadContext";

export default function LeadTable() {
  const {
    paginatedLeads,
    filteredLeads,
    currentPage,
    setCurrentPage,
    totalPages,
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

  // Apply inline date filtering locally on filteredLeads
  const dateFilteredLeads = useMemo(() => {
    let result = [...filteredLeads];
    if (fromDate) {
      const from = new Date(fromDate).getTime();
      result = result.filter((lead) => new Date(lead.createdAt).getTime() >= from);
    }
    if (toDate) {
      // Set to end of the day (23:59:59)
      const to = new Date(toDate).setHours(23, 59, 59, 999);
      result = result.filter((lead) => new Date(lead.createdAt).getTime() <= to);
    }
    return result;
  }, [filteredLeads, fromDate, toDate]);

  // Recalculate pagination bounds based on dateFilteredLeads
  const paginatedLeadsForTable = useMemo(() => {
    const startIndex = (currentPage - 1) * leadsPerPage;
    return dateFilteredLeads.slice(startIndex, startIndex + leadsPerPage);
  }, [dateFilteredLeads, currentPage, leadsPerPage]);

  const totalPagesForTable = useMemo(() => {
    return Math.max(1, Math.ceil(dateFilteredLeads.length / leadsPerPage));
  }, [dateFilteredLeads.length, leadsPerPage]);

  // Helper to format ISO date to readable format: "Oct 24, 2023"
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

  // Helper to render correct color pills for status
  const getStatusBadgeClass = (status: LeadStatus) => {
    switch (status) {
      case "New":
        return "bg-[#EBF8FF] text-[#2B6CB0]";
      case "Contacted":
        return "bg-[#FEFCBF] text-[#B7791F]";
      case "Qualified":
        return "bg-[#E6FFFA] text-[#2C7A7B]";
      case "Converted":
        return "bg-[#C6F6D5] text-[#22543D]";
      case "Lost":
        return "bg-[#FFF5F5] text-[#C53030]";
      default:
        return "bg-[#EDF2F7] text-[#4A5568]";
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

  // Pagination bounds
  const startEntryIndex = dateFilteredLeads.length === 0 ? 0 : (currentPage - 1) * leadsPerPage + 1;
  const endEntryIndex = Math.min(currentPage * leadsPerPage, dateFilteredLeads.length);

  return (
    <div className="space-y-6">
      {/* Controls Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-outline-variant/40 shadow-sm">
        {/* Left Side: Sorting & Filter */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-slate-600"
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Right Side: Status Select, Dates & Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Inline Date Filters */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">From</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">To</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
          </div>

          <div className="relative w-full md:w-44">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[16px] pointer-events-none">
              filter_list
            </span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1); // Reset to first page
              }}
              className="w-full bg-white border border-slate-200 rounded-lg py-1.5 pl-9 pr-8 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 appearance-none transition-all text-slate-600"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[14px] text-on-surface-variant pointer-events-none">
              keyboard_arrow_down
            </span>
          </div>

          <button
            onClick={handleExport}
            className="bg-surface-container hover:bg-surface-container-high px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/40">
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Lead ID
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Name & Contact
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {paginatedLeadsForTable.length > 0 ? (
                paginatedLeadsForTable.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-surface-container-lowest/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-xs whitespace-nowrap text-on-surface-variant">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-primary font-semibold whitespace-nowrap">
                      {lead.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-on-surface">
                          {lead.name}
                        </span>
                        <span className="text-xs text-on-surface-variant font-medium">
                          {lead.email}
                        </span>
                        <span className="text-[10px] text-on-surface-variant opacity-80 mt-0.5">
                          {lead.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface whitespace-nowrap font-medium">
                      {lead.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${getStatusBadgeClass(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant max-w-[220px] truncate">
                      {lead.notes || <span className="italic opacity-60">No notes</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEditClick(lead)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                          title="Edit Lead"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(lead.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
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
                    className="px-6 py-12 text-center text-sm text-on-surface-variant italic"
                  >
                    No leads found matching current search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {dateFilteredLeads.length > 0 && (
          <div className="px-6 py-4 border-t border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-lowest">
            <p className="text-xs text-on-surface-variant font-medium">
              Showing {startEntryIndex} to {endEntryIndex} of {dateFilteredLeads.length} entries
            </p>
            <div className="flex items-center gap-1.5">
              {/* Prev Button */}
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded border border-outline-variant/60 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>

              {/* Page Numbers */}
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
                        : "border border-outline-variant/60 text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPagesForTable}
                className="w-8 h-8 rounded border border-outline-variant/60 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
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
