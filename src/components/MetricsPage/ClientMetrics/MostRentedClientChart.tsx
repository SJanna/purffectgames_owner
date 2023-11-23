// components/MetricsPage/ClientMetrics/MostRentedClientChart.tsx
import React, { useEffect, useRef, useState } from "react";
import Chart, { ChartTypeRegistry } from "chart.js/auto";
import { ChartConfiguration } from "chart.js/auto";
import { TextField, Box } from "@mui/material";
import { Client } from "@/types/Client";
import { Rental } from "@/types/Rental";

type MostRentedClientChartProps = {
  chartType: keyof ChartTypeRegistry;
  clients: Client[];
  rentals: Rental[];
  topClientsCount: number;
};

const MostRentedClientChart = ({
  chartType,
  clients,
  rentals,
  topClientsCount,
}: MostRentedClientChartProps) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (clients.length === 0 || rentals.length === 0) return;

    // Obtener el top de clientes con más rentas
    const mostRentedClients = rentals.reduce((acc, rental) => {
      if (!acc[rental.client]) {
        acc[rental.client] = 0;
      }

      acc[rental.client] += 1;

      return acc;
    }, {} as { [key: number]: number });

    const topClients = Object.keys(mostRentedClients)
      .sort(
        (a, b) => mostRentedClients[Number(b)] - mostRentedClients[Number(a)]
      )
      .slice(0, topClientsCount);

    // Crear el gráfico
    const data = {
      labels: topClients.map((clientId: string) => {
        const client = clients.find((c) => c.id === Number(clientId));
        return client ? `${client.first_name} ${client.last_name}` : "Unknown";
      }),
      datasets: [
        {
          label: `Top ${topClientsCount} clientes con más rentas`,
          data: topClients.map(
            (clientId: string) => mostRentedClients[Number(clientId)]
          ),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    const ctx = (chartRef.current as HTMLCanvasElement | null)?.getContext(
      "2d"
    );
    if (!ctx) return;

    const config: ChartConfiguration<typeof chartType, number[], string> = {
      type: chartType,
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const myChart = new Chart(ctx, config);

    // Limpiar al desmontar el componente
    return () => {
      myChart.destroy();
    };
  }, [clients, rentals, chartType, topClientsCount]);

  return <canvas ref={chartRef}></canvas>;
};

export default MostRentedClientChart;
