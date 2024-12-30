// import axios from "axios";
// import { load } from "cheerio";
// import fs from "fs/promises";

// const fetchProductsNamesAndPrices = async (url) => {
//     try {
//         const { data } = await axios.get(url);
//         const $ = load(data);
//         const results = [];
//         $("").each((_, element) => {
            
//         })

//         return results;
//     } catch (error) {
//         console.error(`Error fetching data from URL: ${url}`, error.message);
//         return [];
//     }
// };

// const main = async () => {
//     try {
//        let results = [];
//        const promises = Array.from({ length: 284 }, (_, i) => {
//            return fetchProductsNamesAndPrices(`https://www.mobilemate.io/Advance_Search?page=${i+1}`);
//         });
//         const allResults = await Promise.all(promises);
//         for (const result of allResults) {
//             results = results.concat(result);
//         }
//         await fs.writeFile("mobilemate.json", JSON.stringify(results, null, 2));
//         console.log("Data saved to data.json");
//     } catch (error) {
//         console.error("Error writing to file", error.message);
//     }
// };

// main().then(() => console.log("Scraping completed.")).catch((err) => console.error("Error in scraping process", err));

// import axios from "axios";
// import { load } from "cheerio";
// import fs from "fs/promises";

// const fetchProductsNamesAndPrices = async (url) => {
//     try {
//         const { data } = await axios.get(url);
//         const $ = load(data);
//         const results = [];

//         $(".main-advance-search-container").each((_, element) => {
//             const brandName = $(element).find("p").text().split("\n")[0].trim(); // Extract brand name
//             const modelName = $(element).find("p span:first-child").text().trim(); // Extract model name
//             const price = $(element).find("p span[style*='font-weight']").text().replace("Rs:", "").trim(); // Extract price
//             const href = $(element).find("a").attr("href"); // Extract href

//             if (brandName && modelName && price && href) {
//                 results.push({ brandName, modelName, price, href });
//             }
//         });

//         return results;
//     } catch (error) {
//         console.error(`Error fetching data from URL: ${url}`, error.message);
//         return [];
//     }
// };

// const main = async () => {
//     try {
//         let results = [];
//         const promises = Array.from({ length: 284 }, (_, i) =>
//             fetchProductsNamesAndPrices(`https://www.mobilemate.io/Advance_Search?page=${i + 1}`)
//         );
//         const allResults = await Promise.all(promises);
//         for (const result of allResults) {
//             results = results.concat(result);
//         }
//         await fs.writeFile("mobilemate.json", JSON.stringify(results, null, 2));
//         console.log("Data saved to mobilemate.json");
//     } catch (error) {
//         console.error("Error writing to file", error.message);
//     }
// };

// // main()
// //     .then(() => console.log("Scraping completed."))
// //     .catch((err) => console.error("Error in scraping", err));


//     const test= async ()=>{
//         const { data } = await axios.get("https://www.mobilemate.io/Advance_Search?page=1");
//         // console.log(data)
//         const $ = load(data);
//         const results = [];

//         const container = $(".main-advance-search-container")
//         console.log(container.length)


//     }

//     test();


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
