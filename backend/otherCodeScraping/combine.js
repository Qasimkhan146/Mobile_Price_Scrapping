import axios from "axios";
import { load } from "cheerio";
import fs from "fs/promises";

// Fetch products from HamariWeb
const fetchFromHamariWeb = async (url) => {
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

      const price = priceText
        ? parseInt(priceText.replace(/Rs\.|[^\d]/g, ""), 10)
        : null;

      if (model && hrefName && href && brand) {
        results.push({
          source: "HamariWeb",
          model,
          price: price || 0,
          hrefName,
          href,
          brand,
        });
      }
    });

    return results;
  } catch (error) {
    console.error(`Error fetching data from HamariWeb URL: ${url}`, error.message);
    return [];
  }
};

// Fetch products from WhatMobile
const fetchFromWhatMobile = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = load(data);
    const results = [];

    $("td.BiggerText").each((_, element) => {
      const hrefName = $(element).find("a").attr("href");

      if (!hrefName) return;

      const href = hrefName.startsWith("http")
        ? hrefName
        : `https://www.whatmobile.com.pk${hrefName}`;

      const model = hrefName
        .replace(/\//g, "")
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toUpperCase();

      const imagePath = $(element).find("img").attr("src");
      const imageSRC = imagePath
        ? `https://www.whatmobile.com.pk/${imagePath}`
        : null;

      const match = imagePath?.match(/^([^\/]+\/[^\/]+)\/([^\/]+)/);
      const brand = match ? match[2].toUpperCase() : "UNKNOWN";

      let price = $(element).find("span.PriceFont").text().trim();
      price = parseInt(price.replace(/[^\d]/g, ""), 10);

      if (model && price && hrefName && href) {
        results.push({
          source: "WhatMobile",
          model,
          price,
          hrefName,
          href,
          imageSRC,
          brand,
        });
      }
    });

    return results;
  } catch (error) {
    console.error(`Error fetching data from WhatMobile URL: ${url}`, error.message);
    return [];
  }
};

// Main function to combine data
const main = async () => {
  const hamariWebBrands = [
    { name: "samsung", maxPages: 14 },
    { name: "tecno", maxPages: 7 },
    { name: "oppo", maxPages: 12 },
    { name: "vivo", maxPages: 14 },
    { name: "infinix", maxPages: 7 },
    { name: "sparx", maxPages: 1 },
    { name: "realme", maxPages: 8 },
    { name: "xiaomi", maxPages: 15 },
    { name: "zte", maxPages: 4 },
    { name: "oneplus", maxPages: 2 },
    { name: "apple", maxPages: 6 },
    { name: "qmobile", maxPages: 5 },
    { name: "nokia", maxPages: 5 },
    { name: "motorola", maxPages: 5 },
    { name: "huawei", maxPages: 5 },
    { name: "lg", maxPages: 5 },
    { name: "sony", maxPages: 5 },
    { name: "google", maxPages: 1 },
    { name: "itel", maxPages: 3 },
    { name: "alcatel", maxPages: 3 },
    { name: "htc", maxPages: 5 },
  ];

  let combinedResults = [];

  // Fetch from HamariWeb
  const hamariWebPromises = hamariWebBrands.flatMap(({ name, maxPages }) =>
    Array.from({ length: maxPages }, (_, i) =>
      fetchFromHamariWeb(`https://www.hamariweb.com/mobiles/${name}/page-${i + 1}`)
    )
  );

  // Fetch from WhatMobile
  const whatMobilePromises = Array.from({ length: 26 }, (_, i) =>
    fetchFromWhatMobile(
      `https://www.whatmobile.com.pk/advanceSearch.php?search=doSearch&brands=&availability=1&price_lower=Min&price_upper=Max&OS=&processor_lower=Min&processor_upper=Max&cores_lower=Min&cores_upper=Max&ram_lower=Min&ram_upper=Max&bMemory_lower=Min&bMemory_upper=Max&display_lower=Min&display_upper=Max&camera_lower=Min&camera_upper=Max&secondary_lower=Min&secondary_upper=Max&battery_lower=Min&battery_upper=Max&nSims=&weight_lower=Min&weight_upper=Max&slimness_lower=Min&slimness_upper=Max&page=${
        i + 1
      }`
    )
  );

  // Combine all promises
  const allPromises = [...hamariWebPromises, ...whatMobilePromises];
  const allResults = await Promise.all(allPromises);

  for (const result of allResults) {
    combinedResults = combinedResults.concat(result);
  }

  // Save to JSON
  try {
    await fs.writeFile("combinedResults.json", JSON.stringify(combinedResults, null, 2));
    console.log("Data saved to combinedResults.json");
  } catch (err) {
    console.error("Error writing to file", err.message);
  }
};

main()
  .then(() => console.log("Scraping completed."))
  .catch((err) => console.error("Error in scraping process", err));
