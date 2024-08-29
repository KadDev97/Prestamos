import React, { useState, useEffect } from 'react';
import './style.css';
import Logo from '../../img/Logo.png';  // Asegúrate de que la ruta sea correcta

const ClientLoan = () => {
    const initialAmount = 1000000; // Monto inicial del préstamo en colones
    const interestRate = 5; // Tasa de interés en porcentaje
    const numInstallments = 12; // Cantidad de cuotas

    const [payments, setPayments] = useState([]);
    const [newPayment, setNewPayment] = useState('');
    const [remainingBalance, setRemainingBalance] = useState(initialAmount);

    useEffect(() => {
        // Calcular el saldo actual
        const totalAmountWithInterest = initialAmount * (1 + (interestRate / 100));
        setRemainingBalance(totalAmountWithInterest);
    }, []);

    const handleAddPayment = (e) => {
        e.preventDefault();
        const paymentAmount = parseFloat(newPayment);

        // Validar que el monto sea un número positivo
        if (isNaN(paymentAmount) || paymentAmount <= 0) {
            alert('Ingrese un monto válido');
            return;
        }

        // Validar que el saldo no sea negativo
        if (remainingBalance - paymentAmount < 0) {
            alert('El monto del pago excede el saldo restante');
            return;
        }

        // Agregar el nuevo pago
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
                            <td>₡{initialAmount}</td>
                            <td>{interestRate}%</td>
                            <td>Mensual</td>
                            <td>{numInstallments}</td>
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
