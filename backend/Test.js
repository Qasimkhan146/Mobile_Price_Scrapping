import fs from "fs";

// Step 1: Read the JSON file
const dataUnparsed = fs.readFileSync("data.json", "utf-8");

// Step 2: Parse the JSON data
const results = JSON.parse(dataUnparsed);

const AppleResults = results.filter((result) => result.category === "Apple");
fs.writeFileSync("Apple.json", JSON.stringify(AppleResults, null, 2));
// results.forEach((result) => {
//   if (result.category === "Apple") {
//     console.log(result.name);
//   }
// });
