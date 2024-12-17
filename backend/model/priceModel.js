import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  source: { type: String, required: true }, // Source website
  model: { type: String, required: true },  // Model of the mobile
  price: { type: Number, required: true },  // Price of the mobile
  hrefName: { type: String, required: true }, // Name in the URL
  href: { type: String, required: true }, // Full URL for the product
  brand: { type: String, required: true }, // Brand of the mobile
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("Price", priceSchema);
