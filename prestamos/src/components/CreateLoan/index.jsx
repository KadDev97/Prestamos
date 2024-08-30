import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Logo from '../../img/Logo.png';  // Asegúrate de que la ruta sea correcta

const CreateLoan = () => {
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState('');
    const [selectedClientName, setSelectedClientName] = useState('');
    const [loanDetails, setLoanDetails] = useState({
        amount: '',
        interest: '',
        lateFee: '',
        paymentMode: '',
        installments: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar clientes desde localStorage
        const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
        setClients(storedClients);
    }, []);

    useEffect(() => {
        if (selectedClientId) {
            const client = clients.find(client => client.id === selectedClientId);
            setSelectedClientName(client ? client.name : '');
        }
    }, [selectedClientId, clients]);
    const handleCreateLoan = (e) => {
        e.preventDefault();
        if (!selectedClientId) {
            alert('Seleccione un cliente');
            return;
        }
        if (!loanDetails.amount || !loanDetails.interest || !loanDetails.lateFee || !loanDetails.installments) {
            alert('Por favor, complete todos los campos del préstamo.');
            return;
        }
        const newLoan = {
            clientId: selectedClientId,
            clientName: selectedClientName,
            ...loanDetails
        };
    
        const storedLoans = JSON.parse(localStorage.getItem('loans')) || [];
        storedLoans.push(newLoan);
        localStorage.setItem('loans', JSON.stringify(storedLoans));
    
        navigate(`/client-loan/${selectedClientId}`); // Redirige al detalle del préstamo después de crear el préstamo
    };
    

    return (
        <div className="create-loan-page">
            <header className="header">
            </header>
            <main className="form-container">
                <img src={Logo} alt="Logo" className="header-logo" />
                <h2>Crear Préstamo</h2>
                <form onSubmit={handleCreateLoan}>
                    <select
                        value={selectedClientId}
                        onChange={(e) => setSelectedClientId(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar Cliente</option>
                        {clients.length > 0 ? (
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
                    <input
                        type="number"
                        placeholder="Interés de Mora por Día (%)"
                        value={loanDetails.lateFee}
                        onChange={(e) => setLoanDetails({ ...loanDetails, lateFee: e.target.value })}
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
            </main>
        </div>
    );
};

export default CreateLoan;
