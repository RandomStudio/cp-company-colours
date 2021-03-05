const fs = require('fs/promises');
const path = require('path');

const sharp = require('sharp');

const processImage = async (filePath, destination) => {
  const outputPath = path.resolve(destination, path.basename(filePath));
  console.log(`processing ${filePath} \n to ${outputPath} ... \n`);
  await sharp(filePath)
    .resize(
      {
        width: 128,
        height: 128,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      }
    ).toFile(outputPath);
}

const main = async() => {
  const sourceDirectory = path.resolve('./originals/unzipped');
  const files = await fs.readdir(sourceDirectory);
  console.log(files.length);

  // files.forEach(f => console.log(f, typeof f, f.toLowerCase()));


  const imagesOnly = files.filter(f => {
    const lowercase = f.toLowerCase();
    return lowercase.includes('.jpg') || lowercase.includes('.png' || lowercase.includes('.tiff'));
  });

  const q = await Promise.all(imagesOnly.map(
    src => processImage(path.resolve(sourceDirectory, src), path.resolve('./output')
  ))).catch(e => {
    console.error('processing error:', e);
  });

  return `Successfully converted ${q.length} files`;

}


main().then(res => {
  console.log('result:', res);
}).catch(e =>
  console.error(e)
)
