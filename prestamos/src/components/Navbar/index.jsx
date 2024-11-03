import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import Logo from '../../img/Logo.png'; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí iría la lógica para cerrar sesión, por ejemplo, eliminar el token de autenticación
        navigate('/login'); // Redirige al login
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={Logo} alt="Logo de la Empresa" />
                </Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Lista de Clientes</Link>
                <Link to="/add-client" className="navbar-link">Añadir Cliente</Link>
                <Link to="/create-loan" className="navbar-link">Crear Préstamo</Link>
                {/*<span onClick={handleLogout} className="logout-link">Cerrar Sesión</span>*/}
            </div>
        </nav>
    );
};

export default Navbar;
