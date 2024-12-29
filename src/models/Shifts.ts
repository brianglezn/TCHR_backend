import mongoose from "mongoose";

const ShiftsSchema = new mongoose.Schema({
  organization_id: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
  users_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  description: { type: String },
  shift_type: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Shifts", ShiftsSchema); 