import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="logo">
                <span className="logo-icon">🎮</span>
                <div>
                    <h2>GameVault</h2>
                    <p>Biblioteca Gamer</p>
                </div>
            </div>

            <div className="menu">
                <Link to="/">Biblioteca</Link>
                <Link to="/Registrar">Nuevo Juego</Link>
            </div>

        </nav>
    );
}

export default Navbar;