const fs = require('fs/promises');
const path = require('path');

const sharp = require('sharp');
const parseConfig = require('rc');

const config = parseConfig('preprocess', {
  resize: true,
})

const processImage = async (filePath, destination) => {
  const outputPath = path.resolve(destination, path.basename(filePath));
  // console.log(`processing ${filePath} \n to ${outputPath} ... \n`);
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
  const destDirectory = path.resolve('./output');

  const files = await fs.readdir(sourceDirectory);
  console.log(files.length);

  const imagesOnly = files.filter(f => {
    const lowercase = f.toLowerCase();
    return lowercase.includes('.jpg') || lowercase.includes('.png' || lowercase.includes('.tiff'));
  });

  if (config.resize === true) {
    console.log('Deleting', destDirectory, '...');
    await fs.rmdir(destDirectory, { recursive: true });
    console.log('Done!');
    await fs.mkdir(destDirectory);

    console.log('processing', imagesOnly.length, 'files... (please wait)');

    const q = await Promise.all(
      imagesOnly.map(
        src => processImage(path.resolve(sourceDirectory, src), destDirectory)
      )
    ).catch(e => {
      console.error('processing error:', e);
    });

    console.log(`resized ${q.length} images`);
  }

  

  return `Successfully converted ${imagesOnly.length} files`;

}


main().then(res => {
  console.log('result:', res);
}).catch(e =>
  console.error('main error:', se)
)
