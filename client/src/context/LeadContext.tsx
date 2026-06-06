"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Converted" | "Lost";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
}

interface LeadContextType {
  leads: Lead[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  leadsPerPage: number;
  
  // Selection/Modal controls
  selectedLeadForEdit: Lead | null;
  setSelectedLeadForEdit: (lead: Lead | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;

  // Actions
  addLead: (lead: Omit<Lead, "id" | "createdAt">) => void;
  updateLead: (id: string, lead: Partial<Lead>) => void;
  deleteLead: (id: string) => void;

  // Derived Values
  filteredLeads: Lead[];
  paginatedLeads: Lead[];
  totalPages: number;
  totalStats: {
    total: number;
    newCount: number;
    contacted: number;
    qualified: number;
    converted: number;
    lost: number;
  };
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

// Initial Mock Data Fallbacks
const initialMockLeads: Lead[] = [
  {
    id: "#LD-9842",
    name: "Rahul Sharma",
    email: "rahul.sharma@tcs.com",
    phone: "+91 98765 43210",
    company: "Tata Consultancy Services",
    status: "Qualified",
    notes: "Discussed enterprise integration requirements during the discovery call.",
    createdAt: "2023-10-24T10:00:00.000Z",
  },
  {
    id: "#LD-9841",
    name: "Priya Nair",
    email: "priya.nair@zoho.com",
    phone: "+91 87654 32109",
    company: "Zoho Corp",
    status: "New",
    notes: "Inbound inquiry via website contact form. Needs platform demo.",
    createdAt: "2023-10-23T14:30:00.000Z",
  },
  {
    id: "#LD-9839",
    name: "Amit Patel",
    email: "amit.patel@blinkit.in",
    phone: "+91 76543 21098",
    company: "Blinkit",
    status: "Contacted",
    notes: "Followed up via LinkedIn. Scheduled a detailed call for next Tuesday.",
    createdAt: "2023-10-22T09:15:00.000Z",
  },
  {
    id: "#LD-9838",
    name: "Neha Gupta",
    email: "neha@techflow.io",
    phone: "+91 54321 09876",
    company: "TechFlow Systems",
    status: "Lost",
    notes: "Budget constraint. Lead opted for a lower-tier local alternative.",
    createdAt: "2023-10-22T16:45:00.000Z",
  },
  {
    id: "#LD-9835",
    name: "Vikram Malhotra",
    email: "v.malhotra@reliance.com",
    phone: "+91 65432 10987",
    company: "Reliance Industries",
    status: "Converted",
    notes: "Contract signed today. Initial onboarding checklist shared with the stakeholder.",
    createdAt: "2023-10-21T11:00:00.000Z",
  },
  {
    id: "#LD-9830",
    name: "Rohan Sen",
    email: "rohan.sen@infosys.com",
    phone: "+91 98989 89898",
    company: "Infosys",
    status: "New",
    notes: "Looking for robust cloud consulting details.",
    createdAt: "2023-10-20T13:20:00.000Z",
  },
  {
    id: "#LD-9828",
    name: "Ananya Roy",
    email: "ananya.roy@wipro.com",
    phone: "+91 70707 07070",
    company: "Wipro",
    status: "Contacted",
    notes: "Discussing compliance models.",
    createdAt: "2023-10-19T10:30:00.000Z",
  },
  {
    id: "#LD-9825",
    name: "Kunal Das",
    email: "kunal.das@hcl.com",
    phone: "+91 80808 80808",
    company: "HCL Tech",
    status: "Qualified",
    notes: "Demo scheduled for next Monday.",
    createdAt: "2023-10-18T15:00:00.000Z",
  },
];

const API_BASE = "http://localhost:5000/api/leads";

// Mapping Helpers to align Client interfaces with Mongoose collections
const mapLeadFromApi = (apiLead: any): Lead => ({
  id: apiLead._id,
  name: apiLead.name,
  email: apiLead.email,
  phone: apiLead.phone,
  company: apiLead.companyName,
  status: apiLead.leadStatus,
  notes: apiLead.notes || "",
  createdAt: apiLead.createdDate || apiLead.createdAt,
});

const mapLeadToApi = (lead: Omit<Lead, "id" | "createdAt">) => ({
  name: lead.name,
  email: lead.email,
  phone: lead.phone,
  companyName: lead.company,
  leadStatus: lead.status,
  notes: lead.notes,
});

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(initialMockLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeadForEdit, setSelectedLeadForEdit] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const leadsPerPage = 5;

  // API Integration: GET Leads
  const fetchLeads = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "All") params.append("status", statusFilter);
      if (sortBy) params.append("sort", sortBy);
      if (searchQuery.trim()) params.append("search", searchQuery);

      const response = await fetch(`${API_BASE}?${params.toString()}`);
      if (!response.ok) throw new Error("API retrieval error");
      const data = await response.json();
      setLeads(data.map(mapLeadFromApi));
    } catch (error: any) {
      console.warn("NexusCRM Backend offline. Switched to client fallback mode:", error.message);
    }
  };

  // Trigger query refetches when criteria change
  useEffect(() => {
    fetchLeads();
  }, [searchQuery, statusFilter, sortBy]);

  // API Integration: POST Add Lead
  const addLead = async (leadData: Omit<Lead, "id" | "createdAt">) => {
    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mapLeadToApi(leadData)),
      });
      if (!response.ok) throw new Error("Failed to insert lead document");
      const savedLead = await response.json();
      setLeads((prev) => [mapLeadFromApi(savedLead), ...prev]);
      setCurrentPage(1);
    } catch (error) {
      console.warn("API request failed. Falling back to local state insert:", error);
      // Client-side fallback operation
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newLead: Lead = {
        ...leadData,
        id: `local-${randomNum}`,
        createdAt: new Date().toISOString(),
      };
      setLeads((prev) => [newLead, ...prev]);
      setCurrentPage(1);
    }
  };

  // API Integration: PUT Update Lead
  const updateLead = async (id: string, updatedFields: Partial<Lead>) => {
    try {
      const apiPayload: any = {};
      if (updatedFields.name !== undefined) apiPayload.name = updatedFields.name;
      if (updatedFields.email !== undefined) apiPayload.email = updatedFields.email;
      if (updatedFields.phone !== undefined) apiPayload.phone = updatedFields.phone;
      if (updatedFields.company !== undefined) apiPayload.companyName = updatedFields.company;
      if (updatedFields.status !== undefined) apiPayload.leadStatus = updatedFields.status;
      if (updatedFields.notes !== undefined) apiPayload.notes = updatedFields.notes;

      const response = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });
      if (!response.ok) throw new Error("Failed to update lead document");
      const updatedLead = await response.json();
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? mapLeadFromApi(updatedLead) : lead))
      );
    } catch (error) {
      console.warn("API request failed. Falling back to local state update:", error);
      // Client-side fallback operation
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, ...updatedFields } : lead))
      );
    }
  };

  // API Integration: DELETE Lead
  const deleteLead = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete lead document");
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
      
      setCurrentPage((prev) => {
        const newFilteredCount = leads.filter((lead) => lead.id !== id).length;
        const newTotalPages = Math.max(1, Math.ceil(newFilteredCount / leadsPerPage));
        return prev > newTotalPages ? newTotalPages : prev;
      });
    } catch (error) {
      console.warn("API request failed. Falling back to local state deletion:", error);
      // Client-side fallback operation
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
      setCurrentPage((prev) => {
        const newFilteredCount = leads.filter((lead) => lead.id !== id).length;
        const newTotalPages = Math.max(1, Math.ceil(newFilteredCount / leadsPerPage));
        return prev > newTotalPages ? newTotalPages : prev;
      });
    }
  };

  // Client-side local filtering block (acts as the offline lookup core)
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // Status Filter (Fallback only when server fails to connect)
    if (statusFilter !== "All") {
      result = result.filter(
        (lead) => lead.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Search Query (Fallback only when server fails to connect)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.company.toLowerCase().includes(q)
      );
    }

    // Sort order (Fallback only when server fails to connect)
    result.sort((a, b) => {
      if (sortBy === "date_desc") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "date_asc") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [leads, searchQuery, statusFilter, sortBy]);

  // Paginated leads
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * leadsPerPage;
    return filteredLeads.slice(startIndex, startIndex + leadsPerPage);
  }, [filteredLeads, currentPage, leadsPerPage]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredLeads.length / leadsPerPage));
  }, [filteredLeads.length, leadsPerPage]);

  // Stats calculation
  const totalStats = useMemo(() => {
    return {
      total: leads.length,
      newCount: leads.filter((l) => l.status === "New").length,
      contacted: leads.filter((l) => l.status === "Contacted").length,
      qualified: leads.filter((l) => l.status === "Qualified").length,
      converted: leads.filter((l) => l.status === "Converted").length,
      lost: leads.filter((l) => l.status === "Lost").length,
    };
  }, [leads]);

  return (
    <LeadContext.Provider
      value={{
        leads,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        sortBy,
        setSortBy,
        currentPage,
        setCurrentPage,
        leadsPerPage,
        selectedLeadForEdit,
        setSelectedLeadForEdit,
        isModalOpen,
        setIsModalOpen,
        addLead,
        updateLead,
        deleteLead,
        filteredLeads,
        paginatedLeads,
        totalPages,
        totalStats,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLeads must be used within a LeadProvider");
  }
  return context;
};
