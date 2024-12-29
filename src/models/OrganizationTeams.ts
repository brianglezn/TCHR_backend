import mongoose from "mongoose";

const OrganizationTeamsSchema = new mongoose.Schema({
  organization_id: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
  name: { type: String, required: true },
  color: { type: String, match: /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/ },
  description: { type: String },
  users_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Teams", OrganizationTeamsSchema); 