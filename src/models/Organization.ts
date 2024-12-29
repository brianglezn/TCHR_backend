import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  website: { type: String },
  address: { type: String },
  industry: { type: String },
  logo: { type: String, validate: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Organization", OrganizationSchema); 