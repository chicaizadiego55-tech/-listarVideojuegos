import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import data from "./data/videojuegos.js";

import Navbar from "./components/Navbar.jsx";
import TablaVideojuegos from "./components/TablaVideojuegos.jsx";
import FormularioVideojuego from "./components/FormularioVideojuego.jsx";
import NoEncontrada from "./components/PaginaNoEncontrada.jsx";

function App() {
  const [videojuegos, setVideojuegos] = useState(data);

  // Agregar videojuego (garantiza un ID único si no viene uno)
  function agregarJuego(nuevoJuego) {
    const juegoConId = {
      ...nuevoJuego,
      id: nuevoJuego.id || Date.now()
    };
    setVideojuegos((prev) => [...prev, juegoConId]);
  }

  // Eliminar videojuego
  function eliminarJuego(id) {
    setVideojuegos((prev) => prev.filter((juego) => juego.id !== id));
  }

  // Editar videojuego (Corregido el typo de videoJuegos -> videojuegos)
  function editarJuego(juegoEditado) {
    setVideojuegos((prev) =>
      prev.map((juego) =>
        juego.id === juegoEditado.id ? juegoEditado : juego
      )
    );
  }

  // Guardar (crear o actualizar)
  function manejarGuardar(videojuego) {
    const existe = videojuegos.some(
      (juego) => juego.id === videojuego.id
    );

    if (existe) {
      editarJuego(videojuego);
    } else {
      agregarJuego(videojuego);
    }
  }

  return (
    <>
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* Listado principal */}
          <Route
            path="/"
            element={
              <TablaVideojuegos
                videoJuegos={videojuegos}
                onEliminar={eliminarJuego}
              />
            }
          />

          {/* Registrar nuevo videojuego */}
          <Route
            path="/registrar"
            element={
              <FormularioVideojuego
                onGuardar={manejarGuardar}
              />
            }
          />

          
          <Route
            path="/editar/:id"
            element={
              <FormularioVideojuego
                videojuegos={videojuegos}
                onGuardar={manejarGuardar}
              />
            }
          />

          {/* Página 404 */}
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
    </>
  );
}

export default App;