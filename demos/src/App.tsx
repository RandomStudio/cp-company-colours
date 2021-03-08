import "./App.scss";
import NoSort from "./NoSort";

import SwatchData from "./swatches.json";

export interface Swatch {
  id: number;
  dominantColour: number[];
  file: string;
  fullPath: string;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">Colours</header>
      <NoSort swatches={SwatchData as Swatch[]} />
    </div>
  );
}

export default App;
