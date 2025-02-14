
import axios from "axios";
import { load } from "cheerio";
import fs from "fs";
import xlsx from "xlsx";

const fetchProductsNamesAndPrices = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = load(data);
    const results = [];

    $("td.BiggerText").each((_, element) => {
      const hrefName = $(element).find("a").attr("href");

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
      const brand = match ? match[2] : "Unknown";

      let price = $(element).find("span.PriceFont").text().trim();
      price = parseInt(price.replace(/[^\d]/g, ""), 10);

      if (model && price && hrefName && href) {
        results.push({ model, price, hrefName, href, imageSRC, brand });
      }
    });

    return results;
  } catch (error) {
    console.error(`Error fetching data from URL: ${url}`, error.message);
    return [];
  }
};

const fetchProductDetails = async (productHref) => {
  try {
    const url = productHref.startsWith("http")
      ? productHref
      : `https://m.whatmobile.com.pk${productHref}`;

    const { data } = await axios.get(url);
    const $ = load(data);
    const allFeatures = {};

    $(".specs_box").each((_, specsBox) => {
      $(specsBox)
        .find(".specs-table tbody tr")
        .each((_, row) => {
          const heading = $(row).find("td.specs_box_subheading").text().trim();
          const value = $(row).find("td:not(.specs_box_subheading)").text().trim();
          if (heading && value) {
            allFeatures[heading] = value;
          }
        });
    });

    return allFeatures;
  } catch (error) {
    console.error(`Failed to fetch details for ${productHref}: ${error.message}`);
    return {};
  }
};

const main = async () => {
  let results = [];

  const promises = Array.from({ length: 26 }, (_, i) =>
    fetchProductsNamesAndPrices(
      `https://www.whatmobile.com.pk/advanceSearch.php?search=doSearch&brands=&availability=1&price_lower=Min&price_upper=Max&OS=&processor_lower=Min&processor_upper=Max&cores_lower=Min&cores_upper=Max&ram_lower=Min&ram_upper=Max&bMemory_lower=Min&bMemory_upper=Max&display_lower=Min&display_upper=Max&camera_lower=Min&camera_upper=Max&secondary_lower=Min&secondary_upper=Max&battery_lower=Min&battery_upper=Max&nSims=&weight_lower=Min&weight_upper=Max&slimness_lower=Min&slimness_upper=Max&page=${
        i + 1
      }`
    )
  );

  const allResults = await Promise.all(promises);

  for (const result of allResults) {
    const detailedResults = await Promise.all(
      result.map(async (r) => {
        const details = await fetchProductDetails(r.hrefName);
        return { ...r, ...details };
      })
    );
    results = results.concat(detailedResults);
  }

  // Convert data to Excel format
  const worksheet = xlsx.utils.json_to_sheet(results);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Products");
  xlsx.writeFile(workbook, "products_data.xlsx");

  console.log("Data fetched successfully and saved to Excel file.");
};

main();
