import axios from "axios";
import { load } from "cheerio";
import fs from "fs";
// Fetch page prodcuts data
const fetchPageProducts = async (url) => {
  try {
    const html = await axios.get(url);
    const $ = load(html.data);

    // Select all the product boxes
    const productList = $(".productBox.b-productBox");

    // Initialize an array to store the extracted data
    const products = [];

    productList.each((index, element) => {
      // Extract the product name (strip extra whitespace)
      const model = $(element).find(".p-title.bold.h5").text().trim().toUpperCase();
      const brand = $(element).attr("data-brand").toUpperCase();
      // Extract the product price (strip extra whitespace)
      let price = $(element).find(".price-box.p1").text().trim();
        price = parseInt(price.replace(/[^\d]/g, ""), 10);
      // Extract the product link
      const href = $(element).find("a").attr("href");

      // Push the extracted data into the products array
      // Changeable
      products.push({
        source: "PriceOye",
        model,
        price,
        href,
        brand,
      });
    });
    return products;
  } catch (error) {
    console.log(error.message);
  }
};

const main = async () => {
  try {
    const totalProducts = [];

    const promises = Array.from({ length: 23 }, (_, i) => {
      return fetchPageProducts(`https://priceoye.pk/mobiles?page=${i + 1}`);
    });
    const allResults = await Promise.all(promises);
    allResults.forEach((result) => {
      totalProducts.push(...result);
    });
    fs.writeFileSync("priceoye.json", JSON.stringify(totalProducts, null, 2));
    console.log("Total Products: ", totalProducts.length);
  } catch (error) {
    console.log(error.message);
  }
};

await main();
