import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Auth.css';
import Logo from '../../img/Logo.png';  // Asegúrate de que la ruta sea correcta

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = Navigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Aquí iría la lógica de autenticación
        // Si la autenticación es exitosa:
        navigate('/');  // Redirige a la página principal
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <img src={Logo} alt="Logo" className="auth-logo" />  {/* Imagen agregada aquí */}
                    <h2>Bienvenido</h2>
                </div>
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Correo" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Ingresar</button>
                </form>
                <div className="auth-footer">
                    <a href="/register">Regístrate</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
