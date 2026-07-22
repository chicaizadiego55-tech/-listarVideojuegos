import { Link } from "react-router-dom";
import "./PaginaNoEncontrada.css";

function NoEncontrada() {
    return (
        <div className="error-container">

            <div className="error-card">

                <div className="error-icon">
                    🎮
                </div>

                <h1>404</h1>

                <h2>GAME OVER</h2>

                <p>
                    La página que intentas visitar no existe o fue movida.
                </p>

                <Link to="/" className="btn-volver">
                    Volver a la Biblioteca
                </Link>

            </div>

        </div>
    );
}

export default NoEncontrada;