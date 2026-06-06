"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

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

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(initialMockLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeadForEdit, setSelectedLeadForEdit] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const leadsPerPage = 5;

  // Actions
  const addLead = (leadData: Omit<Lead, "id" | "createdAt">) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newLead: Lead = {
      ...leadData,
      id: `#LD-${randomNum}`,
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
    setCurrentPage(1); // Go to first page on add
  };

  const updateLead = (id: string, updatedFields: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updatedFields } : lead))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
    
    // Adjust current page if current page becomes empty after deletion
    setCurrentPage((prev) => {
      const newFilteredCount = leads.filter((lead) => lead.id !== id).length;
      const newTotalPages = Math.max(1, Math.ceil(newFilteredCount / leadsPerPage));
      return prev > newTotalPages ? newTotalPages : prev;
    });
  };

  // Filter & Sort Logic
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // Status Filter
    if (statusFilter !== "All") {
      result = result.filter(
        (lead) => lead.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Search Query (name, email, company)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.company.toLowerCase().includes(q)
      );
    }

    // Sorting
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

  // Calculate stats dynamically from all leads currently in the list
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
