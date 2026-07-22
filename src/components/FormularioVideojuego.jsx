import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideojuego.css";

function FormularioVideojuego({ videojuegos = [], onGuardar }) {
    const { id } = useParams(); // Lee el ID de la URL (/editar/:id)
    const location = useLocation();
    const navigate = useNavigate();

    // Busca el juego por ID en la prop 'videojuegos' o por location.state
    const juegoRecuperado = 
        location.state?.videojuego || 
        videojuegos.find((j) => String(j.id) === String(id)) || 
        null;

    // Estados de los campos
    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("Aventura");
    const [plataforma, setPlataforma] = useState("PC");
    const [fechaLanzamiento, setFechaLanzamiento] = useState("");
    const [precio, setPrecio] = useState("");
    const [calificacion, setCalificacion] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [progreso, setProgreso] = useState("");
    const [disponible, setDisponible] = useState(true);

    // Estado para capturar errores de validación
    const [errores, setErrores] = useState({});

    useEffect(() => {
    if (juegoRecuperado) {
        // 1. Título / Nombre
        setTitulo(juegoRecuperado.titulo || juegoRecuperado.nombre || "");

        // 2. Género y Plataforma
        setGenero(juegoRecuperado.genero || "Aventura");
        setPlataforma(juegoRecuperado.plataforma || "PC");

        // 3. Fecha de Lanzamiento (Formateo a AAAA-MM-DD)
        const fechaRaw = juegoRecuperado.fechaLanzamiento ?? juegoRecuperado.lanzamiento ?? juegoRecuperado.fecha ?? "";
        let fechaStr = String(fechaRaw).trim();

        // 💡 Si la fecha es solo un año de 4 dígitos (ej. "2023"), la convertimos a "2023-01-01"
        if (/^\d{4}$/.test(fechaStr)) {
            fechaStr = `${fechaStr}-01-01`;
        } else if (fechaStr.includes("T")) {
            fechaStr = fechaStr.split("T")[0]; // Si viene con hora ISO
        } else if (fechaStr.includes("/")) {
            const partes = fechaStr.split("/");
            if (partes.length === 3) {
                // Si viene como DD/MM/AAAA -> AAAA-MM-DD
                fechaStr = `${partes[2]}-${partes[1].padStart(2, "0")}-${partes[0].padStart(2, "0")}`;
            }
        }
        setFechaLanzamiento(fechaStr);

        // 4. Precio
        setPrecio(juegoRecuperado.precio !== undefined ? juegoRecuperado.precio : "");

        // 5. Calificación (Revisa 'calificacion', 'rating' o 'puntaje')
        const calif = juegoRecuperado.calificacion ?? juegoRecuperado.rating ?? juegoRecuperado.puntaje ?? "";
        setCalificacion(calif);

        // 6. Sinopsis / Descripción (Revisa 'sinopsis', 'descripcion' o 'resena')
        const desc = juegoRecuperado.sinopsis || juegoRecuperado.descripcion || juegoRecuperado.resena || "";
        setSinopsis(desc);

        // 7. Progreso y Disponibilidad
        setProgreso(juegoRecuperado.progreso !== undefined ? juegoRecuperado.progreso : "");
        setDisponible(juegoRecuperado.disponible ?? true);
    } else {
        // Reset de campos para crear un juego nuevo
        setTitulo("");
        setGenero("Aventura");
        setPlataforma("PC");
        setFechaLanzamiento("");
        setPrecio("");
        setCalificacion("");
        setSinopsis("");
        setProgreso("");
        setDisponible(true);
    }
    setErrores({});
}, [juegoRecuperado]);

    // Función interna para validar campos antes de guardar
    const validarFormulario = () => {
        const erroresActivos = {};
        const hoy = new Date().toISOString().split("T")[0];

        // 1. Título no vacío
        if (!titulo || titulo.trim().length === 0) {
            erroresActivos.titulo = "El título es obligatorio y no puede estar vacío.";
        }

        // 2. Precio válido mayor a 0
        if (!precio || Number(precio) <= 0) {
            erroresActivos.precio = "Ingresa un precio válido mayor a 0.";
        }

        // 3. Fecha de Lanzamiento obligatoria y no futura
        if (!fechaLanzamiento) {
            erroresActivos.fechaLanzamiento = "La fecha de lanzamiento es obligatoria.";
        } else if (fechaLanzamiento > hoy) {
            erroresActivos.fechaLanzamiento = "La fecha de lanzamiento no puede ser una fecha futura.";
        }

        // 4. Calificación estrictamente entre 1 y 100
        const califNum = Number(calificacion);
        if (!calificacion || isNaN(califNum) || califNum < 1 || califNum > 100) {
            erroresActivos.calificacion = "La calificación debe situarse estrictamente entre 1 y 100.";
        }

        // 5. Sinopsis entre 10 y 250 caracteres
        const longitudSinopsis = sinopsis.trim().length;
        if (longitudSinopsis < 10) {
            erroresActivos.sinopsis = "La sinopsis debe contener al menos 10 caracteres.";
        } else if (longitudSinopsis > 250) {
            erroresActivos.sinopsis = "La sinopsis no puede superar los 250 caracteres.";
        }

        return erroresActivos;
    };

    function manejarGuardar(e) {
    e.preventDefault();

    const erroresDetectados = validarFormulario();

    if (Object.keys(erroresDetectados).length > 0) {
        setErrores(erroresDetectados);
        return;
    }

    // Extraemos solo el año de la fecha (ejemplo: "2023-01-01" -> "2023")
    const anioCalculado = fechaLanzamiento ? fechaLanzamiento.split("-")[0] : "";

    const videojuego = {
        ...(juegoRecuperado || {}), // Conserva el objeto base si existía
        id: juegoRecuperado ? juegoRecuperado.id : Date.now(),
        titulo: titulo.trim(),
        nombre: titulo.trim(),
        genero,
        plataforma,
        fechaLanzamiento,
        lanzamiento: anioCalculado || fechaLanzamiento, // 👈 Compatibilidad con la tabla
        anio: anioCalculado || fechaLanzamiento,        // 👈 Compatibilidad con la tabla
        fecha: fechaLanzamiento,
        precio: Number(precio),
        calificacion: Number(calificacion),
        sinopsis: sinopsis.trim(),
        descripcion: sinopsis.trim(),
        progreso: progreso !== "" ? Number(progreso) : 0,
        disponible
    };

    onGuardar(videojuego);
    navigate("/");
}

    function manejarCancelar() {
        navigate("/");
    }

    const hoyFormato = new Date().toISOString().split("T")[0];

    return (
        <div className="contenedor-formulario">
            <form className="card-formulario" onSubmit={manejarGuardar} noValidate>
                <h1>
                    🎮 {juegoRecuperado ? "Editar Videojuego" : "Nuevo Videojuego"}
                </h1>
                <p>Completa la información de tu juego.</p>

                {/* TÍTULO */}
                <div className="campo">
                    <label htmlFor="titulo">Título *</label>
                    <input
                        id="titulo"
                        type="text"
                        value={titulo}
                        onChange={(e) => {
                            setTitulo(e.target.value);
                            if (errores.titulo) setErrores({ ...errores, titulo: null });
                        }}
                        className={errores.titulo ? "input-error" : ""}
                    />
                    {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
                </div>

                {/* GÉNERO */}
                <div className="campo">
                    <label htmlFor="genero">Género</label>
                    <select
                        id="genero"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                    >
                        <option value="Aventura">Aventura</option>
                        <option value="Acción">Acción</option>
                        <option value="RPG">RPG</option>
                        <option value="Horror">Horror</option>
                        <option value="Simulación">Simulación</option>
                        <option value="Sandbox">Sandbox</option>
                        <option value="Metroidvania">Metroidvania</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                {/* PLATAFORMA */}
                <div className="campo">
                    <div className="plataformas">
                        <span className="titulo-radio">Plataforma</span>
                        {["Nintendo Switch", "PlayStation", "Xbox", "PC", "Multiplataforma"].map((plat) => (
                            <label key={plat}>
                                <input
                                    type="radio"
                                    name="plataforma"
                                    value={plat}
                                    checked={plataforma === plat}
                                    onChange={(e) => setPlataforma(e.target.value)}
                                />
                                {plat}
                            </label>
                        ))}
                    </div>
                </div>

                {/* GRID: FECHA, PRECIO Y CALIFICACIÓN */}
                <div className="grid">
                    {/* Fecha de Lanzamiento */}
                    <div className="campo">
                        <label htmlFor="fechaLanzamiento">Fecha de Lanzamiento *</label>
                        <input
                            id="fechaLanzamiento"
                            type="date"
                            max={hoyFormato}
                            value={fechaLanzamiento}
                            onChange={(e) => {
                                setFechaLanzamiento(e.target.value);
                                if (errores.fechaLanzamiento) setErrores({ ...errores, fechaLanzamiento: null });
                            }}
                            className={errores.fechaLanzamiento ? "input-error" : ""}
                        />
                        {errores.fechaLanzamiento && (
                            <span className="error-mensaje">{errores.fechaLanzamiento}</span>
                        )}
                    </div>

                    {/* Precio */}
                    <div className="campo">
                        <label htmlFor="precio">Precio ($) *</label>
                        <input
                            id="precio"
                            type="number"
                            step="0.01"
                            value={precio}
                            onChange={(e) => {
                                setPrecio(e.target.value);
                                if (errores.precio) setErrores({ ...errores, precio: null });
                            }}
                            className={errores.precio ? "input-error" : ""}
                        />
                        {errores.precio && <span className="error-mensaje">{errores.precio}</span>}
                    </div>

                    {/* Calificación */}
                    <div className="campo">
                        <label htmlFor="calificacion">Calificación Crítica (1-100) *</label>
                        <input
                            id="calificacion"
                            type="number"
                            min="1"
                            max="100"
                            value={calificacion}
                            onChange={(e) => {
                                setCalificacion(e.target.value);
                                if (errores.calificacion) setErrores({ ...errores, calificacion: null });
                            }}
                            className={errores.calificacion ? "input-error" : ""}
                        />
                        {errores.calificacion && (
                            <span className="error-mensaje">{errores.calificacion}</span>
                        )}
                    </div>
                </div>

                {/* SINOPSIS / DESCRIPCIÓN */}
                <div className="campo">
                    <div className="label-header">
                        <label htmlFor="sinopsis">Sinopsis / Descripción *</label>
                        <span className="contador">{sinopsis.length}/250</span>
                    </div>
                    <textarea
                        id="sinopsis"
                        rows="3"
                        maxLength={250}
                        value={sinopsis}
                        onChange={(e) => {
                            setSinopsis(e.target.value);
                            if (errores.sinopsis) setErrores({ ...errores, sinopsis: null });
                        }}
                        className={errores.sinopsis ? "input-error" : ""}
                        placeholder="Escribe una breve reseña (mínimo 10 caracteres)..."
                    />
                    {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
                </div>

                {/* PROGRESO */}
                <div className="campo">
                    <label htmlFor="progreso">Progreso (0.0 a 1.0)</label>
                    <input
                        id="progreso"
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={progreso}
                        onChange={(e) => setProgreso(e.target.value)}
                    />
                </div>

                {/* DISPONIBLE */}
                <label className="check">
                    <input
                        type="checkbox"
                        checked={disponible}
                        onChange={(e) => setDisponible(e.target.checked)}
                    />
                    Disponible para venta
                </label>

                {/* ACCIONES */}
                <div className="botones">
                    <button type="button" className="cancelar" onClick={manejarCancelar}>
                        Cancelar
                    </button>
                    <button type="submit" className="guardar">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormularioVideojuego;