import React, { useState } from 'react';
import './style.css';
import Logo from '../../img/Logo.png';  // Asegúrate de que la ruta sea correcta


const ClientLoan = () => {
    const [payments, setPayments] = useState([]);
    const [newPayment, setNewPayment] = useState('');
    const [remainingBalance, setRemainingBalance] = useState(500000); // Saldo inicial del préstamo en colones

    const handleAddPayment = (e) => {
        e.preventDefault();
        const paymentAmount = parseFloat(newPayment);

        if (isNaN(paymentAmount) || paymentAmount <= 0) {
            alert('Ingrese un monto válido');
            return;
        }

        setPayments([...payments, {
            date: new Date().toLocaleDateString(),
            amount: paymentAmount,
            remainingBalance: (remainingBalance - paymentAmount).toFixed(2)
        }]);
        setRemainingBalance((remainingBalance - paymentAmount).toFixed(2));
        setNewPayment('');
    };

    return (
        <div className="client-loan-container">
            <div className="client-loan-details">
            <img src={Logo} alt="Logo" className="auth-logo" />  {/* Imagen agregada aquí */}

                <h2>Detalles del Préstamo</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Monto Inicial (₡)</th>
                            <th>Intereses (%)</th>
                            <th>Modalidad de Pago</th>
                            <th>Cantidad de Cuotas</th>
                            <th>Saldo Actual (₡)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Datos del préstamo, ejemplo */}
                        <tr>
                            <td>₡1000000</td>
                            <td>5%</td>
                            <td>Mensual</td>
                            <td>12</td>
                            <td>₡{remainingBalance}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3>Historial de Pagos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Pago (₡)</th>
                        <th>Saldo Restante (₡)</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={index}>
                            <td>{payment.date}</td>
                            <td>₡{payment.amount}</td>
                            <td>₡{payment.remainingBalance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Agregar Pago</h3>
            <form onSubmit={handleAddPayment}>
                <input
                    type="number"
                    value={newPayment}
                    onChange={(e) => setNewPayment(e.target.value)}
                    placeholder="Monto del Pago (₡)"
                    required
                />
                <button type="submit">Agregar Pago</button>
            </form>
        </div>
    );
};

export default ClientLoan;
