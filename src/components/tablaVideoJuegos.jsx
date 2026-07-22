import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TablaVideojuegos.css";

function TablaVideojuegos({ videoJuegos, onEliminar }) {

    const navigate = useNavigate();


    function manejarEditar(juego) {
        navigate("/Editar", { state: { videojuego: juego } });
    }

    return (
        <div className="contenedor-tabla">

            <div className="titulo-seccion">
                <h1>🎮 Biblioteca Gamer</h1>
                <p>Administra toda tu colección de videojuegos.</p>
            </div>

            <div className="tabla-responsive">

                <table className="tabla-videojuegos">

                    <thead>

                        <tr>
                            <th>Título</th>
                            <th>Género</th>
                            <th>Plataforma</th>
                            <th>Año</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Progreso</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {videoJuegos.map((juego) => (

                            <tr key={juego.id}>

                                <td className="titulo-juego">
                                    {juego.titulo}
                                </td>

                                <td>{juego.genero}</td>

                                <td>{juego.plataforma}</td>

                                <td>{juego.lanzamiento}</td>

                                <td className="precio">
                                    ${Number(juego.precio).toFixed(2)}
                                </td>

                                <td>

                                    <span
                                        className={
                                            juego.disponible
                                                ? "badge disponible"
                                                : "badge nodisponible"
                                        }
                                    >
                                        {juego.disponible
                                            ? "Disponible"
                                            : "No"}
                                    </span>

                                </td>

                                <td>

                                    <div className="barra">

                                        <div
                                            className="relleno"
                                            style={{
                                                width: `${juego.progreso * 100}%`
                                            }}
                                        ></div>

                                    </div>

                                    <span className="porcentaje">
                                        {(juego.progreso * 100).toFixed(0)}%
                                    </span>

                                </td>

                                <td>

                                    <div className="acciones">

                                        <button
                                            onClick={() => navigate(`/editar/${juego.id}`)}
                                        >
                                            ✏ Editar
                                        </button>

                                        <button
                                            className="eliminar"
                                            onClick={() => onEliminar(juego.id)}
                                        >
                                            🗑 Eliminar
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default TablaVideojuegos;