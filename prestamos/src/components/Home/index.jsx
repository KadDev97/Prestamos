import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './style.css';

const Home = () => {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar clientes desde localStorage
        const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
        setClients(storedClients);
    }, []);

    const handleViewLoan = (clientId) => {
        navigate(`/client-loan/${clientId}`);
    };

    const handleDeleteClient = (clientId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Este cliente será eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedClients = clients.filter(client => client.id !== clientId);
                setClients(updatedClients);
                localStorage.setItem('clients', JSON.stringify(updatedClients));
                Swal.fire(
                    'Eliminado',
                    'El cliente ha sido eliminado.',
                    'success'
                );
            }
        });
    };

    const handleViewFinancialReport = () => {
        navigate('/financial-report');
    };

    return (
        <div className="home-container">
            <div className="clients-list">
                <h2>Lista de Clientes</h2>
                <button onClick={handleViewFinancialReport} className="view-report-button">
                    Ver Reporte Financiero
                </button>
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
                                    <button onClick={() => handleDeleteClient(client.id)}>Eliminar</button>
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
