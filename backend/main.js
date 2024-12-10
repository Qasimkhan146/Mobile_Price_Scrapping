import axios from "axios";
import { load } from "cheerio";
import fs from "fs/promises";

const fetchProductsNamesAndPrices = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = load(data);
    const results = [];

    $("td.BiggerText").each((_, element) => {
      const name = $(element).find("a.BiggerText").text().trim();
      const href = $(element).find("a").attr("href");
      const imagePath = $(element).find("img").attr("src");
      const imageSRC = imagePath
        ? `https://www.whatmobile.com.pk/${imagePath}`
        : null;
      const match = imagePath?.match(/^([^\/]+\/[^\/]+)\/([^\/]+)/);
      const category = match ? match[2] : "Unknown";
      const price = $(element).find("span.PriceFont").text().trim();

      if (name && price && href) {
        results.push({ name, price, href, imageSRC, category });
      }
    });

    return results;
  } catch (error) {
    console.error(`Error fetching data from URL: ${url}`, error.message);
    return [];
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
    results = results.concat(result);
  }

  try {
    await fs.writeFile("data.json", JSON.stringify(results, null, 2));
    console.log("Data saved to data.json");
  } catch (err) {
    console.error("Error writing to file", err.message);
  }

  return results;
};

main()
  .then(() => console.log("Scraping completed."))
  .catch((err) => console.error("Error in scraping process", err));
