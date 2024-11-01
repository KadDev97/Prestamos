import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import './style.css';

// Registramos los componentes necesarios para Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

// Función para formatear montos como moneda
const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value);
};

// Función para filtrar pagos por rango de fechas
const filterPaymentsByDateRange = (payments, startDate, endDate) => {
    return payments.filter(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate >= startDate && paymentDate <= endDate;
    });
};

const FinancialReport = () => {
    const [clients, setClients] = useState([]);
    const [loans, setLoans] = useState([]);
    const [payments, setPayments] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        // Cargar datos desde localStorage
        const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
        const storedLoans = JSON.parse(localStorage.getItem('loans')) || [];
        const storedPayments = JSON.parse(localStorage.getItem('payments')) || [];
        setClients(storedClients);
        setLoans(storedLoans);
        setPayments(storedPayments);
    }, []);

    // Filtrar pagos por rango de fechas
    const filteredPayments = filterPaymentsByDateRange(payments, startDate, endDate);

    // Calcular totales
    const totalClients = clients.length;
    const totalLoanAmount = loans.reduce((acc, loan) => acc + parseFloat(loan.amount), 0);
    
    // Total de todos los pagos
    const totalPaid = payments.reduce((acc, payment) => acc + parseFloat(payment.amount), 0);
    // Calcular el interés total de todos los préstamos
    const totalInterest = loans.reduce((acc, loan) => {
    return acc + ((parseFloat(loan.amount) * parseFloat(loan.interest) / 100) * parseInt(loan.installments));
     }, 0);
   // Monto pendiente basado en el total de préstamos, los intereses y el total de pagos realizados
    const outstandingAmount = (totalLoanAmount + totalInterest) - totalPaid;


    const dataBar = {
        labels: ['Total Préstamos', 'Monto Pagado', 'Monto Pendiente', 'Ganancia Intereses'],
        datasets: [{
            label: 'Resumen Financiero',
            data: [totalLoanAmount, totalPaid, outstandingAmount, totalInterest],
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#e74a3b'],
        }]
    };

    const dataPie = {
        labels: ['Monto Pagado en Intereses', 'Monto Pagado en Capital'],
        datasets: [{
            data: [totalInterest, totalPaid - totalInterest],
            backgroundColor: ['#ff6384', '#36a2eb'],
        }]
    };

    // Opciones para los gráficos
    const optionsBar = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { size: 14 }
                }
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${formatCurrency(context.raw)}`
                }
            }
        },
        scales: {
            x: { grid: { color: '#e0e0e0' }, ticks: { font: { size: 14 } } },
            y: { grid: { color: '#e0e0e0' }, ticks: { font: { size: 14 } } }
        }
    };

    const optionsPie = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { size: 14 }
                }
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${formatCurrency(context.raw)}`
                }
            }
        }
    };

    return (
        <div className="financial-report-page">
            <header className="header">
                <h1>Reporte Financiero</h1>
            </header>
            <main className="report-container">
                <div className="filter-container">
                    <label htmlFor="start-date">Fecha de Inicio:</label>
                    <input
                        type="date"
                        id="start-date"
                        value={startDate.toISOString().substr(0, 10)}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                    />
                    <label htmlFor="end-date">Fecha de Fin:</label>
                    <input
                        type="date"
                        id="end-date"
                        value={endDate.toISOString().substr(0, 10)}
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                    />
                </div>
                <div className="summary-cards">
                    <div className="card">
                        <h3>Total de Clientes</h3>
                        <p>{totalClients}</p>
                    </div>
                    <div className="card">
                        <h3>Total de Dinero Prestado</h3>
                        <p>{formatCurrency(totalLoanAmount)}</p>
                    </div>
                    <div className="card">
                        <h3>Monto Cobrado</h3>
                        <p>{formatCurrency(totalPaid)}</p>
                    </div>
                    <div className="card">
                        <h3>Monto Pendiente</h3>
                        <p>{formatCurrency(outstandingAmount)}</p>
                    </div>
                    <div className="card">
                        <h3>Ganancia de Intereses</h3>
                        <p>{formatCurrency(totalInterest)}</p>
                    </div>
                </div>
                <div className="charts">
                    <div className="chart-container">
                        <h3>Resumen Financiero</h3>
                        <Bar data={dataBar} options={optionsBar} />
                    </div>
                    <div className="chart-container">
                        <h3>Distribución del Monto Pagado</h3>
                        <Pie data={dataPie} options={optionsPie} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FinancialReport;