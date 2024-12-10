// // // https://www.whatmobile.com.pk/advanceSearch.php?search=doSearch&brands=&availability=1&price_lower=Min&price_upper=Max&OS=&processor_lower=Min&processor_upper=Max&cores_lower=Min&cores_upper=Max&ram_lower=Min&ram_upper=Max&bMemory_lower=Min&bMemory_upper=Max&display_lower=Min&display_upper=Max&camera_lower=Min&camera_upper=Max&secondary_lower=Min&secondary_upper=Max&battery_lower=Min&battery_upper=Max&nSims=&weight_lower=Min&weight_upper=Max&slimness_lower=Min&slimness_upper=Max

// // // https://www.whatmobile.com.pk/advanceSearch.php?search=doSearch&brands=&availability=1&price_lower=Min&price_upper=Max&OS=&processor_lower=Min&processor_upper=Max&cores_lower=Min&cores_upper=Max&ram_lower=Min&ram_upper=Max&bMemory_lower=Min&bMemory_upper=Max&display_lower=Min&display_upper=Max&camera_lower=Min&camera_upper=Max&secondary_lower=Min&secondary_upper=Max&battery_lower=Min&battery_upper=Max&nSims=&weight_lower=Min&weight_upper=Max&slimness_lower=Min&slimness_upper=Max&page=2

// import axios from "axios";
// import { load } from "cheerio";
// import fs from "fs";
// // const fetchProductsNamesAndPrices = async (url) => {
// //   const { data } = await axios.get(url);
// //   const $ = load(data);
// //   // Step 3: Initialize an array to store results
// //   const results = [];
// //   // Step 4: Select all <td> elements with class "BiggerText"
// //   $("td.BiggerText").each((index, element) => {
// //     // Extract the product name
// //     const name = $(element)
// //       .find("a.BiggerText")
// //       .text()
// //       .replace(/\s+/g, " ") // Clean up extra spaces and newlines
// //       .trim();
// //     const href = $(element).find("a").attr("href");
// //     const imagePath = $(element).find("img").attr("src");
// //     const imageSRC = "https://www.whatmobile.com.pk/" + imagePath;
// //     // console.log(imagePath);
// //     const match = imagePath.match(/^([^\/]+\/[^\/]+)\/([^\/]+)/);
// //     const category = match ? match[2] : null;

// //     // Extract the price
// //     const price = $(element)
// //       .find("span.PriceFont")
// //       .text()
// //       .replace(/\s+/g, " ") // Clean up extra spaces and newlines
// //       .trim();

// //     // Add the name and price to the results array
// //     if (name && price && href) {
// //       results.push({ name, price, href, imageSRC, category });
// //     }
// //   });

// //   return results;
// // };

// // const fetchProductDetails = async (productName) => {
// //   try {
// //     const url = `https://m.whatmobile.com.pk${productName}`;
// //     const { data } = await axios.get(url);
// //     const $ = load(data);
// //     // Initialize an array to hold all specs boxes
// //     const allFeatures = {};
// //     fs.writeFileSync("data.html", data);

// //     // Loop through each .specs_box
// //     $(".specs_box").each((_, specsBox) => {
// //       const specs = [];
// //       // console.log(specsBox);
// //       // Find rows inside the current .specs_box
// //       $(specsBox)
// //         .find(".specs-table tbody tr")
// //         .each((_, row) => {
// //           const heading = $(row).find("td.specs_box_subheading").text().trim();
// //           const value = $(row)
// //             .find("td:not(.specs_box_subheading)")
// //             .text()
// //             .trim();

// //           if (heading && value) {
// //             // Push each feature as an object
// //             allFeatures[heading] = value;
// //           }
// //         });
// //     });

// //     // console.log(allFeatures);
// //     return allFeatures;
// //   } catch (error) {
// //     console.log(error.message);
// //     return [];
// //   }
// // };

// // const main = async () => {
// //   let results = [];

// //   // Use Promise.all to handle multiple asynchronous calls
// //   const promises = Array.from({ length: 26 }, (_, i) =>
// //     fetchProductsNamesAndPrices(
// //       `https://www.whatmobile.com.pk/advanceSearch.php?search=doSearch&brands=&availability=1&price_lower=Min&price_upper=Max&OS=&processor_lower=Min&processor_upper=Max&cores_lower=Min&cores_upper=Max&ram_lower=Min&ram_upper=Max&bMemory_lower=Min&bMemory_upper=Max&display_lower=Min&display_upper=Max&camera_lower=Min&camera_upper=Max&secondary_lower=Min&secondary_upper=Max&battery_lower=Min&battery_upper=Max&nSims=&weight_lower=Min&weight_upper=Max&slimness_lower=Min&slimness_upper=Max&page=${
// //         i + 1
// //       }`
// //     )
// //   );

// //   // Wait for all promises to resolve
// //   const allResults = await Promise.all(promises);

// //   // Merge all results into a single array
// //   for (const result of allResults) {
// //     const detailedResults = await Promise.all(
// //       result.map(async (r) => {
// //         const details = await fetchProductDetails(r.href);
// //         return { ...r, details };
// //       })
// //     );
// //     results = results.concat(...detailedResults);
// //   }

// //   //   console.log(JSON.stringify(results, null, 2));
// //   //   console.log(results);
// //   fs.writeFileSync("data.json", JSON.stringify(results, null, 2));
// //   //   console.log(results);
// //   return results;
// // };

// // // Example call
// // //main().then((data) => console.log(data));

// // // await fetchProductDetails("QMobileParis");

// // await main();

// //my changies qasim khan 

// const fetchProductsNamesAndPrices = async (url) => {
//   try {
//     const { data } = await axios.get(url);
//     const $ = load(data);
//     const results = [];

//     $("td.BiggerText").each((_, element) => {
//       const hrefName = $(element).find("a").attr("href");

//       // Ensure that the href has the base URL prepended if it's a relative URL
//       const href = hrefName.startsWith("http") ? hrefName : `https://www.whatmobile.com.pk${hrefName}`;
      
//       const model = hrefName
//           .replace(/\//g, "") // Remove slashes
//           .replace(/_/g, " ") // Replace underscores with spaces
//           .replace(/-/g, " ") // Replace hyphens with spaces
//           .replace(/\s+/g, " ") // Remove extra spaces
//           .trim().toUpperCase(); // Trim leading/trailing spaces

//       const imagePath = $(element).find("img").attr("src");
//       const imageSRC = imagePath
//         ? `https://www.whatmobile.com.pk/${imagePath}`
//         : null;

//       const match = imagePath?.match(/^([^\/]+\/[^\/]+)\/([^\/]+)/);
//       const brand = match ? match[2] : "Unknown";

//       // Extract and clean the price
//       let price = $(element).find("span.PriceFont").text().trim();
//       price = parseInt(price.replace(/[^\d]/g, ""), 10); // Remove non-numeric characters and convert to number

//       if (model && price && hrefName && href) {
//         results.push({ model, price, hrefName, href, imageSRC, brand });
//       }
//     });

//     return results;
//   } catch (error) {
//     console.error(`Error fetching data from URL: ${url}`, error.message);
//     return [];
//   }
// };




// // const fetchProductDetails = async (productHref) => {
// //   try {
// //     const url = `https://m.whatmobile.com.pk${productHref}`;
// //     const { data } = await axios.get(url);
// //     const $ = load(data);
// //     const allFeatures = {};

// //     $(".specs_box").each((_, specsBox) => {
// //       $(specsBox)
// //         .find(".specs-table tbody tr")
// //         .each((_, row) => {
// //           const heading = $(row).find("td.specs_box_subheading").text().trim();
// //           const value = $(row).find("td:not(.specs_box_subheading)").text().trim();
// //           if (heading && value) {
// //             allFeatures[heading] = value;
// //           }
// //         });
// //     });

// //     return allFeatures;
// //   } catch (error) {
// //     console.error(`Failed to fetch details for ${productHref}: ${error.message}`);
// //     return {};
// //   }
// // };

// const fetchProductDetails = async (productHref) => {
//   try {
//     // Check if the productHref is a full URL or needs prepending
//     const url = productHref.startsWith("http")
//       ? productHref
//       : `https://m.whatmobile.com.pk${productHref}`;

//     const { data } = await axios.get(url);
//     const $ = load(data);
//     const allFeatures = {};

//     $(".specs_box").each((_, specsBox) => {
//       $(specsBox)
//         .find(".specs-table tbody tr")
//         .each((_, row) => {
//           const heading = $(row).find("td.specs_box_subheading").text().trim();
//           const value = $(row).find("td:not(.specs_box_subheading)").text().trim();
//           if (heading && value) {
//             allFeatures[heading] = value;
//           }
//         });
//     });

//     return allFeatures;
//   } catch (error) {
//     console.error(`Failed to fetch details for ${productHref}: ${error.message}`);
//     return {};
//   }
// };

// const main = async () => {
//   let results = [];

//   const promises = Array.from({ length: 26 }, (_, i) =>
//     fetchProductsNamesAndPrices(
//       `https://www.whatmobile.com.pk/advanceSearch.php?search=doSearch&brands=&availability=1&price_lower=Min&price_upper=Max&OS=&processor_lower=Min&processor_upper=Max&cores_lower=Min&cores_upper=Max&ram_lower=Min&ram_upper=Max&bMemory_lower=Min&bMemory_upper=Max&display_lower=Min&display_upper=Max&camera_lower=Min&camera_upper=Max&secondary_lower=Min&secondary_upper=Max&battery_lower=Min&battery_upper=Max&nSims=&weight_lower=Min&weight_upper=Max&slimness_lower=Min&slimness_upper=Max&page=${
//         i + 1
//       }`
//     )
//   );

//   const allResults = await Promise.all(promises);

//   for (const result of allResults) {
//     const detailedResults = await Promise.all(
//       result.map(async (r) => {
//         const details = await fetchProductDetails(r.hrefName);
//         return { ...r, ...details };
//       })
//     );
//     results = results.concat(detailedResults);
//   }

//   fs.writeFileSync("data.json", JSON.stringify(results, null, 2));
//   return results;
// };

// main().then((data) => console.log("Data fetched successfully."));


// const axios = require("axios");
import axios from "axios";
// const { load } = require("cheerio");
import { load } from "cheerio";
// const fs = require("fs");
import fs from "fs";
// const xlsx = require("xlsx");
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
