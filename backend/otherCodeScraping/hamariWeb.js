import axios from "axios";
import { load } from "cheerio";
import fs from "fs/promises";

const fetchProductsNamesAndPrices = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = load(data);
    const results = [];

    $("div.mobile_box_layout_1").each((_, element) => {
      const hrefName = $(element).find("a").attr("href");

      if (!hrefName) return;

      const href = hrefName.startsWith("http")
        ? hrefName
        : `https://www.hamariweb.com${hrefName}`;

      const brandMatch = hrefName.match(/\/mobiles\/([^\/]+)/);
      const brand = brandMatch ? brandMatch[1].toUpperCase() : "UNKNOWN";

      const model = $(element)
        .find("div.mobile_content_1 > div.title")
        .text()
        .trim()
        .toUpperCase();

      let priceText = $(element)
        .find("div.mobile_content_1 > p")
        .text()
        .trim();

      // Remove "Rs." and convert to integer, or set to null if parsing fails
      const price = priceText
        ? parseInt(priceText.replace(/Rs\.|[^\d]/g, ""), 10)
        : null;

      // Add data only if the model exists
      if (model && hrefName && href && brand) {
        results.push({
          model,
          price: price || 0, // Handle missing prices
          hrefName,
          href,
          brand,
        });
      }
    });

    return results;
  } catch (error) {
    console.error(`Error fetching data from URL: ${url}`, error.message);
    return [];
  }
};

const main = async () => {
    const brands = [
      { name: "samsung", maxPages: 14 },
      { name: "tecno", maxPages: 7 },
      { name: "oppo", maxPages: 12 },
      { name: "vivo", maxPages: 14 },
      {name: "infinix", maxPages: 7},
      { name: "sparx", maxPages: 1 },
      { name: "realme", maxPages: 8 },
      {name: "xiaomi", maxPages: 15 },
      {name: "zte", maxPages: 4 },
      {name: "oneplus", maxPages: 2 },
      {name: "apple", maxPages: 6 },
      {name: "qmobile", maxPages: 5 },
      {name: "nokia", maxPages: 5 },
      {name: "motorola", maxPages: 5 },
      {name: "huawei", maxPages: 5 },
      {name: "lg", maxPages: 5 },
      {name: "sony", maxPages: 5 },
      {name: "google", maxPages: 1 },
      {name: "itel", maxPages: 3 },
      {name: "alcatel", maxPages:3 },
      {name: "htc", maxPages:  5},


      // Add more brands and their max pages as needed
    ];
  
    let results = [];
  
    const promises = brands.flatMap(({ name, maxPages }) =>
      Array.from({ length: maxPages }, (_, i) =>
        fetchProductsNamesAndPrices(
          `https://www.hamariweb.com/mobiles/${name}/page-${i + 1}`
        )
      )
    );
  
    const allResults = await Promise.all(promises);
  
    for (const result of allResults) {
      results = results.concat(result);
    }
  
    try {
      await fs.writeFile("hamariWeb.json", JSON.stringify(results, null, 2));
      console.log("Data saved to HamariWeb.json");
    } catch (err) {
      console.error("Error writing to file", err.message);
    }
  
    return results;
  };
  
  main()
    .then(() => console.log("Scraping completed."))
    .catch((err) => console.error("Error in scraping process", err));