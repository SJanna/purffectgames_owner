'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ClientMetricsPage = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Datos de ejemplo para el gráfico de distribución por tipo de identificación
    const data = {
      labels: ['DNI', 'Pasaporte', 'Licencia de conducir'],
      datasets: [{
        label: 'Distribución por tipo de identificación',
        data: [20, 15, 10], // Puedes reemplazar esto con los datos reales de tu base de datos
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      }],
    };

    // Configuración del gráfico
    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Crear el gráfico
    const ctx = chartRef.current.getContext('2d');
    const myChart = new Chart(ctx, config);

    // Limpieza al desmontar el componente
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ClientMetricsPage;
