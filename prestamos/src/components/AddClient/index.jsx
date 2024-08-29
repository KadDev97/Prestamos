import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../../contexts/ClientContext';
import './style.css';
import Logo from '../../img/Logo.png';  // Asegúrate de que la ruta sea correcta


const AddClient = () => {
    const { setClients } = useClients();
    const [newClient, setNewClient] = useState({ name: '', phone: '', address: '', idNumber: '' });
    const navigate = useNavigate();

    const handleAddClient = (e) => {
        e.preventDefault();
        const newClientId = Date.now(); // Genera un ID único (esto es solo un ejemplo)
        setClients(prevClients => [...prevClients, { ...newClient, id: newClientId }]);
        navigate('/'); // Redirige al Home
    };

    return (
        <div className="add-client-container">
            <div className="modal">
                <div className="modal-content">
                    <button className="close-button" onClick={() => navigate('/')}>×</button>
                    <img src={Logo} alt="Logo" className="auth-logo" />  {/* Imagen agregada aquí */}

                    <h2>Añadir Cliente</h2>
                    <form onSubmit={handleAddClient}>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={newClient.name}
                            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Celular"
                            value={newClient.phone}
                            onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Dirección"
                            value={newClient.address}
                            onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Cédula"
                            value={newClient.idNumber}
                            onChange={(e) => setNewClient({ ...newClient, idNumber: e.target.value })}
                            required
                        />
                        <button type="submit">Añadir</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClient;
