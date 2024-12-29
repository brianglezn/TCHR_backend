import mongoose from "mongoose";

const TimeOffSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  organization_id: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  reason: { type: String },
  status: { type: String, enum: ["pending", "approved", "denied"], default: "pending" },
  approved_by: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TimeOff", TimeOffSchema); 