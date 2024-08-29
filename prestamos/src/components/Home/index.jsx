import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Home = () => {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Simular la carga inicial de clientes (esto debe ser reemplazado por una carga real si es necesario)
        setClients([
            { id: 1, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },
            { id: 2, name: 'Ana Gómez', phone: '0987654321', address: 'Avenida Siempre Viva 456', idNumber: '987654321' },
            { id: 3, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },
            { id: 4, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },
            { id: 5, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },
            { id: 6, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },
            { id: 7, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },
            { id: 8, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },
            { id: 9, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },
            { id: 10, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },
            { id: 11, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },
            { id: 12, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },
            { id: 13, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },
            { id: 14, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },
            { id: 15, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },
            { id: 16, name: 'Juan Pérez', phone: '1234567890', address: 'Calle Falsa 123', idNumber: '123456789' },


        ]);
    }, []);

    const handleViewLoan = (clientId) => {
        navigate(`/client-loan/${clientId}`);
    };

    return (
        <div className="home-container">
            <div className="clients-list">
                <h2>Lista de Clientes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Celular</th>
                            <th>Dirección</th>
                            <th>Cédula</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.phone}</td>
                                <td>{client.address}</td>
                                <td>{client.idNumber}</td>
                                <td>
                                    <button onClick={() => handleViewLoan(client.id)}>Ver Préstamo</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
