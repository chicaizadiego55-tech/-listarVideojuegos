import "./tablaVideoJuegos.css";

function tablaVideoJuegos({ videoJuegos }) {
  return (
    <div className="tabla-contenedor">
      <table className="tabla-videoJuegos">
        <thead>
          <tr>
            <th>Título</th>
            <th>Género</th>
            <th>Plataforma</th>
            <th>Año</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Progreso</th>
          </tr>
        </thead>
        <tbody>
          {videoJuegos.map((juego) => {
            return(
            <tr key={juego.id}>
              <td data-label="Título">{juego.titulo}</td>
              <td data-label="Género">{juego.genero}</td>
              <td data-label="Plataforma">{juego.plataforma}</td>
              <td data-label="Año">{juego.lanzamiento}</td>
              <td data-label="Precio">${juego.precio.toFixed(2)}</td>
              <td data-label="Disponible">
                {juego.disponible ? "Sí" : "No"}
              </td>
              <td data-label="Progreso">
                <div className="progreso-wrapper">
                  <progress
                    className="progreso-barra"
                    value={juego.progreso}
                    max="1"
                  ></progress>
                  <span className="progreso-texto">
                    {Math.round(juego.progreso * 100)}%
                  </span>
                </div>
              </td>
            </tr>
            );
             })};
        </tbody>
      </table>
    </div>
  );
}

export default tablaVideoJuegos;