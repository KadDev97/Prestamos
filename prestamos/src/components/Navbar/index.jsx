import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './style.css';
import Logo from '../../img/Logo.png'; 

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        navigate('/login'); // Redirige al login
    };
    
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="navbar">
        <div className="navbar-logo">
            <div className="hamburger" onClick={toggleSidebar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>
        </div>
        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
            <Link to="/">
                <img className='logonav' src={Logo} alt="Logo de la Empresa" />
            </Link>
            <Link to="/" className="navbar-link">Lista de clientes</Link>
            <Link to="/add-client" className="navbar-link">Crear cliente</Link>
            <Link to="/create-loan" className="navbar-link">Crear préstamo</Link>
        </div>
    </div>
    );
};

export default Navbar;
