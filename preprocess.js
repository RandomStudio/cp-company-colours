const fs = require('fs/promises');
const path = require('path');

const sharp = require('sharp');

const main = async() => {
  const files = await fs.readdir(path.resolve('./originals/unzipped'));
  console.log(files.length);
}


main().then(res => {

}).catch(e =>
  console.error(e)
)
