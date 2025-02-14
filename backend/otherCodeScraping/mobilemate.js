
import axios from "axios";
import fs from "fs";
import { release } from "os";

const API_URL = "https://mm.magma3c.com/mobiles/latestMobiles";
const OUTPUT_FILE = "mobiles.json";

async function fetchAndSaveMobiles() {
  try {
    // Fetch the data from the API
    const response = await axios.get(API_URL);

    // Check if data exists and process it
    if (response.data && Array.isArray(response.data)) {
      // Extract brand, model, and price for each mobile
      const mobiles = response.data.map((mobile) => ({
        brand: mobile.brand || "Unknown",
        model: mobile.brand+" "+mobile.model || "Unknown",
        price: mobile.pricePkr || "Unknown",
        source: "Mobilemate.io",
        href: `https://www.mobilemate.io/${mobile.brand}/${mobile.model.replace(/ /g, '-').toUpperCase()}`,
        release: mobile.createdOn || "Unknown"
      }));

      // Write the extracted data to a JSON file
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mobiles, null, 2));

      console.log(`File '${OUTPUT_FILE}' created successfully with ${mobiles.length} records.`);
    } else {
      console.error("Invalid or empty response from the API.");
    }
  } catch (error) {
    console.error("Error fetching data from the API:", error.message);
  }
}

// Run the function
fetchAndSaveMobiles();
