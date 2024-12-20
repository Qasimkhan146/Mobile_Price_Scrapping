import axios from "axios";
import fs from "fs";
import path from "path";
import Mobile from "../model/mobileModel.js";

export const downloadImages = async () => {
  try {
    // Fetch only the model names and imageSRC fields
    const mobiles = await Mobile.find({}, { model: 1, imageSRC: 1, _id: 0 });

    if (mobiles.length === 0) {
      console.log("No mobiles found to download images.");
      return;
    }

    // Create a folder to save images if it doesn't exist
    const imagesFolder = path.resolve("downloads");
    if (!fs.existsSync(imagesFolder)) {
      fs.mkdirSync(imagesFolder);
    }

    for (const mobile of mobiles) {
      const { model, imageSRC } = mobile;

      if (!imageSRC) {
        console.log(`No image available for ${model}`);
        continue;
      }

      // Generate a safe filename
      const sanitizedModelName = model.replace(/[^a-zA-Z0-9]/g, " ");
      const filePath = path.join(imagesFolder, `${sanitizedModelName}.jpg`);

      try {
        // Download the image
        const response = await axios({
          url: imageSRC,
          method: "GET",
          responseType: "stream",
        });

        // Save the image locally
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        // Wait for the file to finish writing
        await new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
        });

        console.log(`Downloaded image for ${model}`);
      } catch (error) {
        console.error(`Failed to download image for ${model}:`, error.message);
      }
    }
  } catch (error) {
    console.error("Failed to fetch mobiles or download images:", error.message);
  }
};

// Call the function
// downloadImages();
