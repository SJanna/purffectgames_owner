// pages/client-metrics.tsx
import { useEffect, useRef } from "react";
import Chart, { ChartTypeRegistry } from "chart.js/auto";
import { ChartConfiguration } from "chart.js/auto";
import { Client } from "@/types/Client";

type idTypeChartProps = {
  chartType: keyof ChartTypeRegistry;
  clients: Client[];
};

const IdTypeChart = ({ chartType, clients }: idTypeChartProps) => {
  const chartRefIdType = useRef(null);

  useEffect(() => {
    if (clients.length === 0) return;

    // Analizar los tipos de identificación y contar su frecuencia
    const identificationTypes = clients.map(
      (client) => client.identification_type
    );
    console.log(identificationTypes);
    const identificationTypeCounts: { [key: string]: number } =
      identificationTypes.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });

    // Datos para el gráfico
    const dataIdentification = {
      labels: Object.keys(identificationTypeCounts),
      datasets: [
        {
          label: "Identification Type Distribution",
          data: Object.values(identificationTypeCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Configuración del gráfico
    const ctx = (
      chartRefIdType.current as HTMLCanvasElement | null
    )?.getContext("2d");
    if (!ctx) return;

    const config: ChartConfiguration<typeof chartType, number[], string> = {
      type: chartType,
      data: dataIdentification,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Crear el gráfico
    const myChartIdType = new Chart(ctx, config);

    // Limpieza al desmontar el componente
    return () => {
      myChartIdType.destroy();
    };
  }, [clients, chartType]);

  return <canvas ref={chartRefIdType}></canvas>;
};

export default IdTypeChart;
