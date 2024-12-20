import mongoose from "mongoose";

const mobileSchema = new mongoose.Schema({
  model: { type: String, required: true },
  price: { type: Number, required: true },
  hrefName: { type: String },
  href: { type: String, required: true },
  imageSRC: { type: String, required: true },
  brand: { type: String, required: true },
  OS: { type: String, default: "Nill" },
  Dimensions: { type: String, default: "Nill" },
  weight: { type: Number, default: 0 },
  SIM: { type: String, default: "Nill" },
  Colors: { type: String, default: "Nill" },
  "2G Band": { type: String, default: "Nill" },
  "3G Band": { type: String, default: "Nill" },
  "4G Band": { type: String, default: "Nill" },
  "5G Band": { type: String, default: "Nill" },
  CPU: { type: String, default: "Nill" },
  Chipset: { type: String, default: "Nill" },
  GPU: { type: String, default: "Nill" },
  Technology: { type: String, default: "Nill" },
  Size: { type: Number, default: 0 },
  Resolution: { type: String, default: "Nill" },
  Protection: { type: String, default: "Nill" },
  Extra_Features: { type: String, default: "Nill" },
  Ram: { type: Number, default: 0 },
  Rom: { type: Number, default: 0 },
  Built_in: { type: String, default: "Nill" },
  Card: { type: String, default: "Nill" },
  Main: { type: String, default: "Nill" },
  Back_Cam: { type: Number, default: 0 },
  Features: { type: String, default: "Nill" },
  Front_Cam: { type: String, default: "Nill" },
  Front: { type: String, default: "Nill" },
  WLAN: { type: String, default: "Nill" },
  Bluetooth: { type: String, default: "Nill" },
  GPS: { type: String, default: "Nill" },
  Data: { type: String, default: "Nill" },
  Sensors: { type: String, default: "Nill" },
  Audio: { type: String, default: "Nill" },
  Browser: { type: String, default: "Nill" },
  Messaging: { type: String, default: "Nill" },
  Games: { type: String, default: "Nill" },
  Extra: { type: String, default: "Nill" },
  Capacity: { type: Number, default: 0 },
  PriceInUsd: { type: String, default: "Not Available" },
  Radio: { type: String, default: "Nill" },
});

const Mobile = mongoose.model("Mobile", mobileSchema);

export default Mobile;
