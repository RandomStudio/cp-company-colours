import "./App.scss";
import NoSort from "./NoSort";
import SimpleSort from "./SimpleSort";

import SwatchData from "./swatches.json";

export interface Swatch {
  id: number;
  dominantColour: number[];
  file: string;
  fullPath: string;
}

export interface Size {
  width: number;
  height: number;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">Colours</header>
      {/* <NoSort swatches={SwatchData as Swatch[]} /> */}
      <SimpleSort swatches={SwatchData as Swatch[]} debug={true} />
    </div>
  );
}

export default App;
