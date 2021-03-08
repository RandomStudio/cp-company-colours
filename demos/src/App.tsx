import "./App.scss";
import SimpleSort from "./SimpleSort";

import SwatchData from "./swatches.json";

export interface Swatch {
  id: Number;
  dominantColour: Number[];
  file: string;
  fullPath: string;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">Colours</header>
      <SimpleSort swatches={SwatchData as Swatch[]} />
    </div>
  );
}

export default App;
