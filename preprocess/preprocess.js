// Built in (Node) modules
const fs = require("fs/promises");
const path = require("path");

// Third-party modules
const sharp = require("sharp");
const ColorThief = require("colorthief");

// Config object, overridable via CLI flags, etc.
const config = require("parse-strings-in-object")(
  require("rc")("preprocess", {
    resize: true,
    getSwatches: true,
    jsonPath: "../demos/src/swatches.json",
  })
);

console.info("config:", JSON.stringify(config, null, 4));

const processImage = async (filePath, destination) => {
  const outputPath = path.resolve(destination, path.basename(filePath));
  // console.log(`processing ${filePath} \n to ${outputPath} ... \n`);
  await sharp(filePath)
    .resize({
      width: 128,
      height: 128,
      fit: sharp.fit.cover,
      position: sharp.strategy.entropy,
    })
    .toFile(outputPath);
};

const getSwatches = async (images, destDirectory) => {
  const results = await Promise.all(
    images.map(async (img, index) => {
      const fullPath = path.resolve(destDirectory, img);
      try {
        const dominantColourRGB = await ColorThief.getColor(fullPath);
        return {
          dominantColour: dominantColourRGB,
          file: img,
          fullPath,
          id: index,
        };
      } catch (e) {
        console.error("ColorThief error:", { e, i: img, fullPath });
      }
    })
  );

  return results;
};

const main = async () => {
  const sourceDirectory = path.resolve("./originals/unzipped");
  const destDirectory = path.resolve("./output");

  const files = await fs.readdir(sourceDirectory);
  console.log(files.length);

  const imagesOnly = files.filter((f) => {
    const lowercase = f.toLowerCase();
    return (
      lowercase.includes(".jpg") ||
      lowercase.includes(".png" || lowercase.includes(".tiff"))
    );
  });

  if (config.resize === true) {
    console.log("Deleting", destDirectory, "...");
    await fs.rmdir(destDirectory, { recursive: true });
    console.log("Done!");
    await fs.mkdir(destDirectory);

    console.log("processing", imagesOnly.length, "files... (please wait)");

    const q = await Promise.all(
      imagesOnly.map((src) =>
        processImage(path.resolve(sourceDirectory, src), destDirectory)
      )
    ).catch((e) => {
      console.error("processing error:", e);
    });

    console.log(`resized ${q.length} images`);
  } else {
    console.warn("skipping resize");
  }

  if (config.getSwatches === true) {
    const json = path.resolve("./swatches.json");
    console.log(`calculating dominant colours and writing to ${json} ...`);
    const outputImages = await fs.readdir(destDirectory);
    const swatches = await getSwatches(outputImages, destDirectory);
    // console.log(swatches);

    const destinationJson = path.resolve(config.jsonPath);
    console.log("writing JSON to", destinationJson, "...");
    await fs.writeFile(destinationJson, JSON.stringify(swatches));
  } else {
    console.warn("skipping getSwatches");
  }

  return `Successfully processed ${imagesOnly.length} files`;
};

main()
  .then((res) => {
    console.log("result:", res);
  })
  .catch((e) => console.error("main error:", e));
