import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Asegúrate de tener el archivo de estilos

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
            <button onClick={() => navigate('/')}>Volver a Inicio</button>
        </div>
    );
};

export default NotFound;
