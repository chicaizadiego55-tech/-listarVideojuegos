import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideojuego.css";

function FormularioVideojuego({ onGuardar }) {

    const location = useLocation();
    const navigate = useNavigate();

    const juegoRecuperado = location.state?.videojuego || null;

    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [lanzamiento, setLanzamiento] = useState("");
    const [precio, setPrecio] = useState("");
    const [progreso, setProgreso] = useState("");
    const [disponible, setDisponible] = useState(true);

    useEffect(() => {
        if (juegoRecuperado) {
            setTitulo(juegoRecuperado.titulo);
            setGenero(juegoRecuperado.genero);
            setPlataforma(juegoRecuperado.plataforma);
            setLanzamiento(juegoRecuperado.lanzamiento);
            setPrecio(juegoRecuperado.precio);
            setProgreso(juegoRecuperado.progreso);
            setDisponible(juegoRecuperado.disponible);
        } else {
            setTitulo("");
            setGenero("");
            setPlataforma("");
            setLanzamiento("");
            setPrecio("");
            setProgreso("");
            setDisponible(true);
        }
    }, [juegoRecuperado]);
    function manejarGuardar() {
        const videojuego = {
            id: juegoRecuperado? juegoRecuperado.id: Date.now(),
            titulo,
            genero,
            plataforma,
            lanzamiento,
            precio: Number(precio),
            progreso: Number(progreso),
            disponible

        };
        onGuardar(videojuego);
        navigate("/");
    }
    function manejarCancelar() {
        navigate("/");
    }
    return (

        <div className="contenedor-formulario">
            <div className="card-formulario">
                <h1>
                    🎮 {juegoRecuperado ? "Editar Videojuego" : "Nuevo Videojuego"}
                </h1>
                <p>
                    Completa la información de tu juego.
                </p>
                <div className="campo">
                    <label>Título</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label>Género</label>
                    <select
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}>
                        <option>Aventura</option>
                        <option>Acción</option>
                        <option>RPG</option>
                        <option>Horror</option>
                        <option>Simulación</option>
                        <option>Sandbox</option>
                        <option>Metroidvania</option>
                        <option>Otro</option>
                    </select>
                </div>
                <div className="campo">
                <p className="plataformas">
                    <span className="titulo-radio">Plataforma</span>
                    <label>
                        <input
                            type="radio"
                            value="Nintendo Switch"
                            checked={plataforma == 'Nintendo Switch'}
                            onChange={(e)=> setPlataforma(e.target.value)}
                        />
                        Nintendo Switch
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="PlayStation"
                            checked={plataforma == 'PlayStation'}
                            onChange={(e)=> setPlataforma(e.target.value)}
                        />
                        PlayStation
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Xbox"
                            checked={plataforma == 'Xbox'}
                            onChange={(e)=> setPlataforma(e.target.value)}
                        />
                        Xbox
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="PC"
                            checked={plataforma == 'PC'}
                            onChange={(e)=> setPlataforma(e.target.value)}
                        />
                        PC
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Multiplataforma"
                            checked={plataforma == 'Multiplataforma'}
                            onChange={(e)=> setPlataforma(e.target.value)}
                        />
                        Multiplataforma
                    </label>
                </p>
                </div>
                <div className="grid">
                    <div className="campo">
                        <label>Año</label>
                        <input
                            type="number"
                            value={lanzamiento}
                            onChange={(e) =>
                                setLanzamiento(e.target.value)
                            }
                        />
                    </div>
                    <div className="campo">
                        <label>Precio</label>
                        <input
                            type="number"
                            value={precio}
                            onChange={(e) =>
                                setPrecio(e.target.value)
                            }
                        />
                    </div>
                </div>
                <div className="campo">
                    <label>Progreso</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={progreso}
                        onChange={(e) =>
                            setProgreso(e.target.value)
                        }
                    />
                </div>
                <label className="check">
                    <input
                        type="checkbox"
                        checked={disponible}
                        onChange={(e) =>
                            setDisponible(e.target.checked)
                        }
                    />
                    Disponible
                </label>
                <div className="botones">
                    <button
                        className="cancelar"
                        onClick={manejarCancelar}
                    >
                        Cancelar
                    </button>
                    <button
                        className="guardar"
                        onClick={manejarGuardar}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormularioVideojuego;