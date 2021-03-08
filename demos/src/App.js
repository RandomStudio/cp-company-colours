import logo from "./logo.svg";
import "./App.scss";
import SimpleSort from "./SimpleSort";

import Swatches from "./swatches.json";

export interface Swatch {
  id: Number;
  dominantColour: Number[];
  file: String;
  fullPath?: String;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">Colours</header>
      <SimpleSort swatches={Swatches} />
    </div>
  );
}

export default App;
