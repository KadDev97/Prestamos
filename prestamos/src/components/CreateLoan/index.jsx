import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../../contexts/ClientContext';
import './style.css';
import Logo from '../../img/Logo.png';  // Asegúrate de que la ruta sea correcta


const CreateLoan = () => {
    const { clients } = useClients(); // Obtén los clientes del contexto
    const [selectedClient, setSelectedClient] = useState('');
    const [loanDetails, setLoanDetails] = useState({ amount: '', interest: '', paymentMode: '', installments: '' });
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica el estado de clients
        console.log('Clientes disponibles:', clients);
    }, [clients]);

    const handleCreateLoan = (e) => {
        e.preventDefault();
        if (selectedClient) {
            // Lógica para crear el préstamo
            console.log('Creating loan for client ID:', selectedClient, 'with details:', loanDetails);
            navigate('/'); // Redirige al Home después de crear el préstamo
        } else {
            alert('Seleccione un cliente');
        }
    };

    return (
        <div className="create-loan-container">
            <div className="modal">
                <div className="modal-content">
                    <button className="close-button" onClick={() => navigate('/')}>×</button>
                    <img src={Logo} alt="Logo" className="auth-logo" />  {/* Imagen agregada aquí */}

                    <h2>Crear Préstamo</h2>
                    <form onSubmit={handleCreateLoan}>
                        <select
                            value={selectedClient}
                            onChange={(e) => setSelectedClient(e.target.value)}
                            required
                        >
                            <option value="">Seleccionar Cliente</option>
                            {clients && clients.length > 0 ? (
                                clients.map(client => (
                                    <option key={client.id} value={client.id}>
                                        {client.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">No hay clientes disponibles</option>
                            )}
                        </select>
                        <input
                            type="number"
                            placeholder="Monto Inicial (₡)"
                            value={loanDetails.amount}
                            onChange={(e) => setLoanDetails({ ...loanDetails, amount: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Intereses (%)"
                            value={loanDetails.interest}
                            onChange={(e) => setLoanDetails({ ...loanDetails, interest: e.target.value })}
                            required
                        />
                        <select
                            value={loanDetails.paymentMode}
                            onChange={(e) => setLoanDetails({ ...loanDetails, paymentMode: e.target.value })}
                            required
                        >
                            <option value="">Modalidad de Pago</option>
                            <option value="semanal">Semanal</option>
                            <option value="quincenal">Quincenal</option>
                            <option value="mensual">Mensual</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Cantidad de Cuotas"
                            value={loanDetails.installments}
                            onChange={(e) => setLoanDetails({ ...loanDetails, installments: e.target.value })}
                            required
                        />
                        <button type="submit">Crear</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateLoan;
