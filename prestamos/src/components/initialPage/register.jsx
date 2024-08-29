import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/Logo.png'; 
import './Auth.css';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Aquí iría la lógica de registro
        // Si el registro es exitoso:
        navigate('/home');  // Redirige a la página principal
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
            <img src={Logo} alt="Logo" className="auth-logo" /> 
                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Nombre" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Apellidos" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input 
                        type="Correo" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="Contraseña" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Registrarte</button>
                </form>
                <div className="auth-footer">
                    <a href="/login">Volver al inicio de session</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
