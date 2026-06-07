"use client";

import React, { useState, useEffect } from "react";
import { useLeads, LeadStatus } from "../../context/LeadContext";

export default function LeadModal() {
  const {
    isModalOpen,
    setIsModalOpen,
    selectedLeadForEdit,
    setSelectedLeadForEdit,
    addLead,
    updateLead,
  } = useLeads();

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<LeadStatus>("New");
  const [notes, setNotes] = useState("");

  // Auto-format phone input to +91 XXXXX XXXXX
  const handlePhoneChange = (val: string) => {
    if (val === "" || val === "+" || val === "+9" || val === "+91" || val === "+91 ") {
      setPhone("");
      return;
    }

    let digits = val;
    if (digits.startsWith("+91")) {
      digits = digits.substring(3);
    }
    digits = digits.replace(/\D/g, "").substring(0, 10);

    if (digits.length === 0) {
      setPhone("+91 ");
    } else if (digits.length <= 5) {
      setPhone(`+91 ${digits}`);
    } else {
      setPhone(`+91 ${digits.substring(0, 5)} ${digits.substring(5, 10)}`);
    }
  };

  const handlePhoneFocus = () => {
    if (!phone || phone.trim() === "" || phone === "+91") {
      setPhone("+91 ");
    }
  };

  // Sync state with selected lead when editing
  useEffect(() => {
    if (selectedLeadForEdit) {
      const names = selectedLeadForEdit.name.split(" ");
      setFirstName(names[0] || "");
      setLastName(names.slice(1).join(" ") || "");
      setEmail(selectedLeadForEdit.email);
      setPhone(selectedLeadForEdit.phone);
      setCompany(selectedLeadForEdit.company);
      setStatus(selectedLeadForEdit.status);
      setNotes(selectedLeadForEdit.notes);
    } else {
      // Clear form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setStatus("New");
      setNotes("");
    }
  }, [selectedLeadForEdit, isModalOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedLeadForEdit(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !email.trim() || !company.trim()) {
      alert("First Name, Email, and Company Name are required fields.");
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const leadData = {
      name: fullName,
      email: email.trim(),
      phone: phone.trim() && phone.trim() !== "+91" ? phone.trim() : "+91 98765 43210",
      company: company.trim(),
      status,
      notes: notes.trim(),
    };

    if (selectedLeadForEdit) {
      updateLead(selectedLeadForEdit.id, leadData);
    } else {
      addLead(leadData);
    }

    handleClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white dark:bg-[#1e293b] text-slate-800 dark:text-slate-100 border-l border-slate-200 dark:border-slate-700/60 shadow-2xl z-[70] transition-transform duration-500 ease-in-out flex flex-col ${
          isModalOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-headline-md text-slate-900 dark:text-slate-50">
              {selectedLeadForEdit ? "Edit Lead Profile" : "Add New Lead"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {selectedLeadForEdit
                ? "Update the contact details and status for this lead profile."
                : "Complete the form below to register a new prospect in the system."}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-450 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <form onSubmit={handleSubmit} className="space-y-8" id="lead-form">
            <section>
              <h3 className="text-xs font-bold text-primary dark:text-sky-400 uppercase tracking-widest mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block uppercase">
                    First Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Jane"
                    className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-100 dark:focus:ring-slate-750/30 focus:border-indigo-500 dark:focus:border-sky-500 outline-none transition-all text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block uppercase">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Doe"
                    className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-100 dark:focus:ring-slate-750/30 focus:border-indigo-500 dark:focus:border-sky-500 outline-none transition-all text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block uppercase">
                    Email Address <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane.doe@company.com"
                    className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-100 dark:focus:ring-slate-750/30 focus:border-indigo-500 dark:focus:border-sky-500 outline-none transition-all text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block uppercase">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onFocus={handlePhoneFocus}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-100 dark:focus:ring-slate-750/30 focus:border-indigo-500 dark:focus:border-sky-500 outline-none transition-all text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-primary dark:text-sky-400 uppercase tracking-widest mb-4">
                Company & Status Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block uppercase">
                    Company Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-100 dark:focus:ring-slate-750/30 focus:border-indigo-500 dark:focus:border-sky-500 outline-none transition-all text-slate-800 dark:text-slate-100"
                  />
                </div>
                
                <div className="col-span-1 sm:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block uppercase mb-1">
                    Lead Status
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {(["New", "Contacted", "Qualified", "Converted", "Lost"] as LeadStatus[]).map(
                      (statusOption) => {
                        const isChecked = status === statusOption;
                        return (
                          <button
                            key={statusOption}
                            type="button"
                            onClick={() => setStatus(statusOption)}
                            className={`px-4 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                              isChecked
                                ? "bg-primary dark:bg-sky-500 text-on-primary dark:text-slate-900 border-primary dark:border-sky-500 shadow-sm"
                                : "bg-white dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                          >
                            {statusOption}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-primary dark:text-sky-400 uppercase tracking-widest mb-4">
                Additional Notes
              </h3>
              <div className="space-y-2">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional context about the lead..."
                  rows={4}
                  className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-100 dark:focus:ring-slate-750/30 focus:border-indigo-500 dark:focus:border-sky-500 outline-none transition-all resize-none text-slate-800 dark:text-slate-100"
                />
              </div>
            </section>
          </form>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="lead-form"
            className="bg-primary dark:bg-sky-500 hover:bg-primary-container dark:hover:bg-sky-400 text-on-primary dark:text-slate-950 px-7 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            {selectedLeadForEdit ? "Save Lead Profile" : "Create Lead"}
          </button>
        </div>
      </div>
    </>
  );

}
