// pages/client-metrics.tsx
import { useEffect, useRef, useState } from "react";
import Chart, { ChartTypeRegistry } from "chart.js/auto";
import { useGetClients } from "@/hooks/useGetClients";
import { ChartConfiguration } from "chart.js/auto";

type ageChartProps = {
  chartType: keyof ChartTypeRegistry;
};

const AgeChart = ({ chartType }: ageChartProps) => {
  const clients = useGetClients();
  const chartRefAge = useRef(null);

  useEffect(() => {
    if (clients.length === 0) return;

    // Calcular la edad a partir de la fecha de nacimiento
    const today = new Date();
    const ages = clients.map((client) => {
      const birthDate = new Date(client.birth_date);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age;
    });

    // Agrupar las edades en rangos de 10 años
    const ageRanges = Array.from({ length: 10 }, (_, index) => index * 10);
    const ageCounts: { [key: string]: number } = ageRanges.reduce(
      (acc, range) => {
        const upperLimit = range + 9;
        const label = `${range}-${upperLimit}`;
        acc[label] = ages.filter(
          (age) => age >= range && age <= upperLimit
        ).length;
        return acc;
      },
      {} as { [key: string]: number }
    );

    const dataAge = {
      labels: Object.keys(ageCounts),
      datasets: [
        {
          label: "Distribución por rango de edad",
          data: Object.values(ageCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
            "rgba(205, 92, 92, 0.5)",
            "rgba(0, 128, 128, 0.5)",
            "rgba(128, 0, 128, 0.5)",
            "rgba(0, 128, 0, 0.5)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(205, 92, 92, 1)",
            "rgba(0, 128, 128, 1)",
            "rgba(128, 0, 128, 1)",
            "rgba(0, 128, 0, 1)"
          ],
          borderWidth: 1,
        },
      ],
    };

    const ctxAge = (
      chartRefAge.current as HTMLCanvasElement | null
    )?.getContext("2d");
    if (!ctxAge) return;

    const configAge: ChartConfiguration<typeof chartType, number[], string> = {
      type: chartType,
      data: dataAge,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const myChartAge = new Chart(ctxAge, configAge);

    // Limpieza al desmontar el componente
    return () => {
      myChartAge.destroy();
    };
  }, [clients, chartType]);

  return <canvas ref={chartRefAge}></canvas>;
};

export default AgeChart;
