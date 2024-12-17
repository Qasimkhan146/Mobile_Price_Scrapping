// import axios from "axios";
// import { load } from "cheerio";
// import fs from "fs/promises";

// const fetchProductsNamesAndPrices = async (url) => {
//   try {
//     const { data } = await axios.get(url);
//     const $ = load(data);
//     const results = [];

//     // $("td.BiggerText").each((_, element) => {
//     //   const hrefName = $(element).find("a").attr("href");

//     //   const href = hrefName.startsWith("http")
//     //     ? hrefName
//     //     : `https://www.whatmobile.com.pk${hrefName}`;

//     //   const model = hrefName
//     //     .replace(/\//g, "")
//     //     .replace(/_/g, " ")
//     //     .replace(/-/g, " ")
//     //     .replace(/\s+/g, " ")
//     //     .trim()
//     //     .toUpperCase();

//     //   const imagePath = $(element).find("img").attr("src");
//     //   const imageSRC = imagePath
//     //     ? `https://www.whatmobile.com.pk/${imagePath}`
//     //     : null;

//     //   const match = imagePath?.match(/^([^\/]+\/[^\/]+)\/([^\/]+)/);
//     //   const brand = match ? match[2] : "Unknown";

//     //   let price = $(element).find("span.PriceFont").text().trim();
//     //   price = parseInt(price.replace(/[^\d]/g, ""), 10);

//     //   if (model && price && hrefName && href) {
//     //     results.push({ model, price, hrefName, href, imageSRC, brand });
//     //   }
//     // });

//     return results;
//   } catch (error) {
//     console.error(`Error fetching data from URL: ${url}`, error.message);
//     return [];
//   }
// };

// const main = async () => {
//   let results = [];

//   const promises = Array.from({ length: 26 }, (_, i) =>
//     fetchProductsNamesAndPrices(
//       `https://www.daraz.pk/smartphones/?from=hp_categories&page=${i+1}&params=%7B%22catIdLv1%22%3A%222%22%2C%22pvid%22%3A%229a1d51d8-0b40-4517-ab67-d56785f145e9%22%2C%22src%22%3A%22hp_categories%22%2C%22categoryName%22%3A%22Mobiles%22%2C%22categoryId%22%3A%223%22%7D&ppath=31070%3A121127013`
//     )
//   );

// //   `https://www.daraz.pk/smartphones/?from=hp_categories&page=${ i + 1}&params=%7B%22catIdLv1%22%3A%222%22%2C%22pvid%22%3A%229a1d51d8-0b40-4517-ab67-d56785f145e9%22%2C%22src%22%3A%22hp_categories%22%2C%22categoryName%22%3A%22Mobiles%22%2C%22categoryId%22%3A%223%22%7D&ppath=31070%3A121127013`

//   const allResults = await Promise.all(promises);

//   for (const result of allResults) {
//     results = results.concat(result);
//   }

//   try {
//     await fs.writeFile("data.json", JSON.stringify(results, null, 2));
//     console.log("Data saved to data.json");
//   } catch (err) {
//     console.error("Error writing to file", err.message);
//   }

//   return results;
// };

// main()
//   .then(() => console.log("Scraping completed."))
//   .catch((err) => console.error("Error in scraping process", err));
// const axios = require("axios");
// import axios from "axios";
// import { load } from "cheerio";
// import fs from "fs/promises";

// const baseUrl = "https://www.daraz.pk";

// const fetchProductsNamesAndPrices = async (url) => {
//   try {
//     const { data } = await axios.get(url);
//     const $ = load(data);
//     const results = [];

//     $("._95X4G").each((_, element) => {
//       const href = baseUrl + $(element).find("a").attr("href");
//       const imageUrl = $(element).find(".picture-wrapper.jBwCF img").attr("src");
//       const model = $(element).find(".picture-wrapper.jBwCF img").attr("alt");
//         console.log("what is coming ",href,imageUrl,model)
//       if (imageUrl && model && href) {
//         results.push({ model, imageUrl, href });
//       }
//     });

//     return results;
//   } catch (error) {
//     console.error(`Error fetching data from URL: ${url}`, error.message);
//     return [];
//   }
// };

// const main = async () => {
//   let results = [];

//   const promises = Array.from({ length: 14 }, (_, i) =>
//     fetchProductsNamesAndPrices(
//       `${baseUrl}/smartphones/?from=hp_categories&page=${i+1}&params=%7B%22catIdLv1%22%3A%222%22%2C%22pvid%22%3A%229a1d51d8-0b40-4517-ab67-d56785f145e9%22%2C%22src%22%3A%22hp_categories%22%2C%22categoryName%22%3A%22Mobiles%22%2C%22categoryId%22%3A%223%22%7D&ppath=31070%3A121127013`
//     )
//   );
  
//   const allResults = await Promise.all(promises);

//   for (const result of allResults) {
//     results = results.concat(result);
//   }

//   try {
//     await fs.writeFile("daraz.json", JSON.stringify(results, null, 2));
//     console.log("Data saved to daraz.json");
//   } catch (err) {
//     console.error("Error writing to file", err.message);
//   }

//   return results;
// };

// main()
//   .then(() => console.log("Scraping completed."))
//   .catch((err) => console.error("Error in scraping process", err));
import puppeteer from "puppeteer";
import fs from "fs/promises";

const baseUrl = "https://www.daraz.pk";

const fetchProductsNamesAndPrices = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" }); // Wait for network requests to finish

    const results = await page.evaluate(() => {
      const products = [];
      document.querySelectorAll("._95X4G").forEach((element) => {
        const href = element.querySelector("a")?.href;
        const imageUrl = element.querySelector(".picture-wrapper img")?.src;
        const model = element.querySelector(".picture-wrapper img")?.alt;

        if (href && imageUrl && model) {
          products.push({ model, imageUrl, href });
        }
      });
      return products;
    });

    await browser.close();
    return results;
  } catch (error) {
    console.error(`Error fetching data from URL: ${url}`, error.message);
    return [];
  }
};

const main = async () => {
  let results = [];

  const promises = Array.from({ length: 14 }, (_, i) =>
    fetchProductsNamesAndPrices(
      `${baseUrl}/smartphones/?from=hp_categories&page=${i + 1}&params=%7B%22catIdLv1%22%3A%222%22%2C%22pvid%22%3A%229a1d51d8-0b40-4517-ab67-d56785f145e9%22%2C%22src%22%3A%22hp_categories%22%2C%22categoryName%22%3A%22Mobiles%22%2C%22categoryId%22%3A%223%22%7D&ppath=31070%3A121127013`
    )
  );

  const allResults = await Promise.all(promises);

  for (const result of allResults) {
    results = results.concat(result);
  }

  try {
    await fs.writeFile("daraz.json", JSON.stringify(results, null, 2));
    console.log("Data saved to daraz.json");
  } catch (err) {
    console.error("Error writing to file", err.message);
  }

  return results;
};

main()
  .then(() => console.log("Scraping completed."))
  .catch((err) => console.error("Error in scraping process", err));
