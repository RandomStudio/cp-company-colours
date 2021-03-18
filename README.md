# CP Company Colour Experiments

Sorting, arranging and grouping of images by colour.

## Development notes

### Main Applications

### Demos (Browser-based)

(This project favours the use of [yarn](https://yarnpkg.com/) over npm.)`

```
cd demos
yarn install
yarn start
```

### Languages / Frameworks / Libraries used

- Extensive use of [Pixi JS](https://www.pixijs.com/) for ease of WebGL (GPU-accelerated) HTML Canvas drawing
- Some custom [shaders](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_shaders_to_apply_color_in_WebGL) have been written using [GLSL](<https://www.khronos.org/opengl/wiki/Core_Language_(GLSL)>)
- [React](https://reactjs.org/) was used for ease of UI development, but core functionality does not depend on React
- Created with `create-react-app` - more details [here](./README_CREATE_REACT_APP)
- Some of the core components and functionality are written in [TypeScript](https://www.typescriptlang.org/) to aid readability/documentation and enforce type safety
- [Sass](https://sass-lang.com/) is generally used instead of plain CSS

### Preprocessing (NodeJS, CLI tool)

This script only needs to be run if you intend to change the selection of images used in the browser-based Demo.

Example

```
cd preprocess
node preprocess.js
```

The script uses [node-sharp](https://github.com/lovell/sharp) to crop and resize images. It uses [ColorThief](https://lokeshdhakar.com/projects/color-thief/) to calculate "dominant colour" values for each image.

The resized images are placed in `./demos/public/output` by default. The data (including colour info) is written to `./demos/src/swatches.json` by default.

You can also run the colour calculations without the image-resizing step, i.e.

```
node preprocess.js --resize=false
```

### Languages / Frameworks / Libraries used

- [React](https://reactjs.org/) was used for ease of UI development, but core functionality does not depend on React
- Created with `create-react-app` - more details [here](./README_CREATE_REACT_APP)
- Some of the core components and functionality are written in [TypeScript](https://www.typescriptlang.org/) to aid readability/documentation and enforce type safety
- [Sass](https://sass-lang.com/) is generally used instead of plain CSS
