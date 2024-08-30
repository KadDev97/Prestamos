import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Logo from '../../img/Logo.png';  // Asegúrate de que la ruta sea correcta

const AddClient = () => {
    const [newClient, setNewClient] = useState({ name: '', phone: '', address: '', idNumber: '' });
    const navigate = useNavigate();

    const handleAddClient = (e) => {
        e.preventDefault();
        if (!newClient.name || !newClient.phone || !newClient.address || !newClient.idNumber) {
            alert('Por favor, complete todos los campos.');
            return;
        }
        const newClientId = Date.now(); // Genera un ID único
        const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
        const updatedClients = [...storedClients, { ...newClient, id: newClientId }];
        localStorage.setItem('clients', JSON.stringify(updatedClients));
        navigate('/'); // Redirige al Home
    };
    

    return (
        <div className="add-client-page">
            <header className="header">
            </header>
            <main className="form-container">
            <img src={Logo} alt="Logo" className="header-logo" />
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
            </main>
        </div>
    );
};

export default AddClient;
