import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Lead name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Lead email is required"],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, "Lead phone number is required"],
    trim: true
  },
  companyName: {
    type: String,
    required: [true, "Company name is required"],
    trim: true
  },
  leadStatus: {
    type: String,
    enum: {
      values: ["New", "Contacted", "Qualified", "Converted", "Lost"],
      message: "{VALUE} is not a valid lead status"
    },
    default: "New"
  },
  notes: {
    type: String,
    trim: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
