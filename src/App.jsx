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

  // Agregar videojuego
  function agregarJuego(nuevoJuego) {
    setVideojuegos([...videojuegos, nuevoJuego]);
  }

  // Eliminar videojuego
  function eliminarJuego(id) {
    setVideojuegos(videojuegos.filter((juego) => juego.id !== id));
  }

  // Editar videojuego
  function editarJuego(juegoEditado) {
    setVideojuegos(
      videoJuegos.map((juego) =>
        juego.id === juegoEditado.id ? juegoEditado : juego
      )
    );
  }

  // Guardar (nuevo o editado)
  function manejarGuardar(videojuego) {
    const existe = videojuegos.find(
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

      <Routes>
        <Route
          path="/"
          element={
            <TablaVideojuegos
              videoJuegos={videojuegos}
              onEliminar={eliminarJuego}
            />
          }
        />

        <Route
          path="/Registrar"
          element={
            <FormularioVideojuego
              onGuardar={manejarGuardar}
            />
          }
        />

        <Route
          path="/Editar"
          element={
            <FormularioVideojuego
              onGuardar={manejarGuardar}
            />
          }
        />

        <Route
          path="*"
          element={<NoEncontrada />}
        />
      </Routes>
    </>
  );
}

export default App;