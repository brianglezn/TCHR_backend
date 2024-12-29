import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  clerk_id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["admin", "manager", "employee"], required: true },
  organization_id: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  settings: {
    theme: { type: String, default: "light" },
    language: { type: String, default: "en" },
    notifications_enabled: { type: Boolean, default: true }
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Users", UsersSchema); 