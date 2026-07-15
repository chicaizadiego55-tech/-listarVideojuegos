import { useState } from "react";
import TablaVideojuegos from "./components/TablaVideojuegos";
import data from "./data/videojuegos";
import "./App.css";

function App() {
  const [videojuegos] = useState(data);

  return (
    <div className="app-contenedor">
      <h1>Tienda de Videojuegos</h1>
      <TablaVideojuegos videojuegos={videojuegos} />
    </div>
  );
}

export default App;