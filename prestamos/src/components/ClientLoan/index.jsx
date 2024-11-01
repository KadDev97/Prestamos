import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';

const ClientLoan = () => {
    const { clientId } = useParams();
    const [loan, setLoan] = useState(null);
    const [payments, setPayments] = useState([]);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedLoans = JSON.parse(localStorage.getItem('loans')) || [];
        const currentLoan = storedLoans.find(loan => loan.clientId === clientId);
        setLoan(currentLoan || null);

        const storedPayments = JSON.parse(localStorage.getItem('payments')) || [];
        setPayments(storedPayments.filter(payment => payment.clientId === clientId));
    }, [clientId]);

    const handleAddPayment = (e) => {
        e.preventDefault();
        if (loan && paymentAmount) {
            const newPayment = {
                clientId,
                amount: parseFloat(paymentAmount),
                date: paymentDate || new Date().toISOString()
            };

            const updatedPayments = [...payments, newPayment];
            localStorage.setItem('payments', JSON.stringify(updatedPayments));
            setPayments(updatedPayments);
            setPaymentAmount('');
            setPaymentDate('');
        }
    };

    const calculateTotalAmount = () => {
        if (loan) {
            const totalAmount = parseFloat(loan.amount) + (parseFloat(loan.amount) * parseFloat(loan.interest) / 100 * parseInt(loan.installments));
            return totalAmount;
        }
        return 0;
    };

    const calculateInstallmentAmount = () => {
        if (loan) {
            const totalAmount = calculateTotalAmount();
            return totalAmount / parseInt(loan.installments);
        }
        return 0;
    };

    const calculateOutstandingAmount = () => {
        const totalAmount = calculateTotalAmount();
        const totalPaid = payments.reduce((acc, payment) => acc + parseFloat(payment.amount), 0);
        return totalAmount - totalPaid;
    };

    const calculateTotalInterest = () => {
        if (loan) {
            const totalAmount = calculateTotalAmount();
            return totalAmount - parseFloat(loan.amount);
        }
        return 0;
    };

    const calculateLateFee = () => {
        const lateFees = payments.reduce((acc, payment) => {
            const paymentDate = new Date(payment.date);
            const dueDate = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), 1);
            if (paymentDate > dueDate) {
                const daysLate = Math.ceil((paymentDate - dueDate) / (1000 * 60 * 60 * 24));
                const fee = (parseFloat(loan.lateFee) / 100) * daysLate;
                acc += fee;
            }
            return acc;
        }, 0);
        return lateFees;
    };

    return (
        <div className="client-loan-page">
            <header className="header">
            </header>
            <main className="details-container">
                <div className="loan-details" style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
                    <h2>Detalles del Préstamo</h2>
                    {loan ? (
                      <div className="loan-detail-info">
                      <p><strong>Monto Inicial:</strong> ₡{loan.amount}</p>
                      <p><strong>Intereses:</strong> {loan.interest}%</p>
                      <p><strong>Interés de Mora por Día:</strong> {loan.lateFee}%</p>
                      <p><strong>Modalidad de Pago:</strong> {loan.paymentMode}</p>
                      <p><strong>Cantidad de Cuotas:</strong> {loan.installments}</p>
                      <p><strong>Total del Préstamo:</strong> ₡{calculateTotalAmount().toFixed(2)}</p>
                      <p><strong>Monto por Cuota:</strong> ₡{calculateInstallmentAmount().toFixed(2)}</p>
                      <p><strong>Interés Total:</strong> ₡{calculateTotalInterest().toFixed(2)}</p> {/* Nueva línea */}
                  </div>
                    ) : (
                        <p>No se encontraron detalles del préstamo.</p>
                    )}
                </div>
                <div className="payment-form">
                    <h2>Agregar Pago</h2>
                    <form onSubmit={handleAddPayment}>
                        <input
                            type="number"
                            placeholder="Monto del Pago (₡)"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            placeholder="Fecha del Pago"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                        />
                        <button type="submit">Agregar Pago</button>
                    </form>
                </div>
                <div className="payment-history">
                    <h2>Historial de Pagos</h2>
                    <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
                        <p><strong>Saldo Actual:</strong> ₡{(calculateOutstandingAmount() + calculateLateFee()).toFixed(2)}</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.length > 0 ? (
                                    payments.map((payment, index) => (
                                        <tr key={index}>
                                            <td>{new Date(payment.date).toLocaleDateString()}</td>
                                            <td>₡{payment.amount.toFixed(2)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">No hay pagos registrados.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ClientLoan;
