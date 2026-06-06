import express from "express";
import mongoose from "mongoose";
import Lead from "../models/Lead.js";

const router = express.Router();

// Seed initial in-memory data for demo fallback mode
let inMemoryLeads = [
  {
    _id: "ld-9842",
    name: "Rahul Sharma",
    email: "rahul.sharma@tcs.com",
    phone: "+91 98765 43210",
    companyName: "Tata Consultancy Services",
    leadStatus: "Qualified",
    notes: "Discussed enterprise integration requirements during the discovery call.",
    createdDate: new Date("2023-10-24T10:00:00.000Z")
  },
  {
    _id: "ld-9841",
    name: "Priya Nair",
    email: "priya.nair@zoho.com",
    phone: "+91 87654 32109",
    companyName: "Zoho Corp",
    leadStatus: "New",
    notes: "Inbound inquiry via website contact form. Needs platform demo.",
    createdDate: new Date("2023-10-23T14:30:00.000Z")
  },
  {
    _id: "ld-9839",
    name: "Amit Patel",
    email: "amit.patel@blinkit.in",
    phone: "+91 76543 21098",
    companyName: "Blinkit",
    leadStatus: "Contacted",
    notes: "Followed up via LinkedIn. Scheduled a detailed call for next Tuesday.",
    createdDate: new Date("2023-10-22T09:15:00.000Z")
  },
  {
    _id: "ld-9838",
    name: "Neha Gupta",
    email: "neha@techflow.io",
    phone: "+91 54321 09876",
    companyName: "TechFlow Systems",
    leadStatus: "Lost",
    notes: "Budget constraint. Lead opted for a lower-tier local alternative.",
    createdDate: new Date("2023-10-22T16:45:00.000Z")
  },
  {
    _id: "ld-9835",
    name: "Vikram Malhotra",
    email: "v.malhotra@reliance.com",
    phone: "+91 65432 10987",
    companyName: "Reliance Industries",
    leadStatus: "Converted",
    notes: "Contract signed today. Initial onboarding checklist shared with the stakeholder.",
    createdDate: new Date("2023-10-21T11:00:00.000Z")
  },
  {
    _id: "ld-9830",
    name: "Rohan Sen",
    email: "rohan.sen@infosys.com",
    phone: "+91 98989 89898",
    companyName: "Infosys",
    leadStatus: "New",
    notes: "Looking for robust cloud consulting details.",
    createdDate: new Date("2023-10-20T13:20:00.000Z")
  },
  {
    _id: "ld-9828",
    name: "Ananya Roy",
    email: "ananya.roy@wipro.com",
    phone: "+91 70707 07070",
    companyName: "Wipro",
    leadStatus: "Contacted",
    notes: "Discussing compliance models.",
    createdDate: new Date("2023-10-19T10:30:00.000Z")
  },
  {
    _id: "ld-9825",
    name: "Kunal Das",
    email: "kunal.das@hcl.com",
    phone: "+91 80808 80808",
    companyName: "HCL Tech",
    leadStatus: "Qualified",
    notes: "Demo scheduled for next Monday.",
    createdDate: new Date("2023-10-18T15:00:00.000Z")
  }
];

// Helper to check DB status
const isConnected = () => mongoose.connection.readyState === 1;

// GET /api/leads - Fetch all leads
router.get("/leads", async (req, res) => {
  try {
    const { status, sort, search } = req.query;

    if (isConnected()) {
      const filterQuery = {};
      if (status && status !== "All") {
        filterQuery.leadStatus = status;
      }
      if (search) {
        const searchRegex = new RegExp(search, "i");
        filterQuery.$or = [
          { name: searchRegex },
          { email: searchRegex },
          { companyName: searchRegex }
        ];
      }
      let query = Lead.find(filterQuery);
      if (sort === "date_asc") {
        query = query.sort({ createdDate: 1 });
      } else if (sort === "name") {
        query = query.sort({ name: 1 });
      } else {
        query = query.sort({ createdDate: -1 });
      }
      const leads = await query;
      return res.status(200).json(leads);
    } else {
      // Offline fallback: filter and sort in-memory
      let result = [...inMemoryLeads];

      if (status && status !== "All") {
        result = result.filter(l => l.leadStatus === status);
      }
      if (search) {
        const q = search.toLowerCase();
        result = result.filter(
          l =>
            l.name.toLowerCase().includes(q) ||
            l.email.toLowerCase().includes(q) ||
            l.companyName.toLowerCase().includes(q)
        );
      }

      result.sort((a, b) => {
        if (sort === "date_asc") {
          return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
        }
        if (sort === "name") {
          return a.name.localeCompare(b.name);
        }
        // default date_desc
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      });

      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve leads", details: error.message });
  }
});

// POST /api/leads - Create a new lead
router.post("/leads", async (req, res) => {
  try {
    const { name, email, phone, companyName, leadStatus, notes } = req.body;

    if (!name || !email || !phone || !companyName) {
      return res.status(400).json({
        error: "Validation failed",
        message: "Name, email, phone, and companyName are required fields."
      });
    }

    if (isConnected()) {
      const newLead = new Lead({ name, email, phone, companyName, leadStatus, notes });
      const savedLead = await newLead.save();
      return res.status(201).json(savedLead);
    } else {
      // Offline fallback: save to in-memory array
      const mockId = "ld-" + Math.floor(1000 + Math.random() * 9000);
      const newLead = {
        _id: mockId,
        name,
        email,
        phone,
        companyName,
        leadStatus: leadStatus || "New",
        notes,
        createdDate: new Date()
      };
      inMemoryLeads.push(newLead);
      return res.status(201).json(newLead);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create lead", details: error.message });
  }
});

// PUT /api/leads/:id - Update lead details by ID
router.put("/leads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, companyName, leadStatus, notes } = req.body;

    if (isConnected()) {
      const updatedLead = await Lead.findByIdAndUpdate(
        id,
        { name, email, phone, companyName, leadStatus, notes },
        { new: true, runValidators: true }
      );
      if (!updatedLead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      return res.status(200).json(updatedLead);
    } else {
      // Offline fallback
      const idx = inMemoryLeads.findIndex(l => l._id === id);
      if (idx === -1) {
        return res.status(404).json({ error: "Lead not found" });
      }
      const updatedLead = {
        ...inMemoryLeads[idx],
        name: name !== undefined ? name : inMemoryLeads[idx].name,
        email: email !== undefined ? email : inMemoryLeads[idx].email,
        phone: phone !== undefined ? phone : inMemoryLeads[idx].phone,
        companyName: companyName !== undefined ? companyName : inMemoryLeads[idx].companyName,
        leadStatus: leadStatus !== undefined ? leadStatus : inMemoryLeads[idx].leadStatus,
        notes: notes !== undefined ? notes : inMemoryLeads[idx].notes
      };
      inMemoryLeads[idx] = updatedLead;
      return res.status(200).json(updatedLead);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update lead", details: error.message });
  }
});

// DELETE /api/leads/:id - Delete a lead by ID
router.delete("/leads/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isConnected()) {
      const deletedLead = await Lead.findByIdAndDelete(id);
      if (!deletedLead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      return res.status(200).json({ message: "Lead successfully deleted", id });
    } else {
      // Offline fallback
      const idx = inMemoryLeads.findIndex(l => l._id === id);
      if (idx === -1) {
        return res.status(404).json({ error: "Lead not found" });
      }
      inMemoryLeads.splice(idx, 1);
      return res.status(200).json({ message: "Lead successfully deleted", id });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete lead", details: error.message });
  }
});

export default router;
