// components/MetricsPage/GameMetrics/RentalsByPlatformChart.tsx
import React, { useEffect, useRef } from "react";
import Chart, { ChartOptions, ChartTypeRegistry } from "chart.js/auto";
import { useGetGames } from "@/hooks/useGetGames";
import { ChartConfiguration } from "chart.js/auto";

type RentalsByPlatformChartProps = {
  chartType: keyof ChartTypeRegistry;
};

const RentalsByPlatformChart = ({ chartType }: RentalsByPlatformChartProps) => {
  const games = useGetGames();
  const chartRef = useRef(null);

  useEffect(() => {
    if (games.length === 0) return;

    const rentalsByPlatform = games.reduce((acc, curr) => {
      if (!curr.platform) return acc;

      return {
        ...acc,
        [curr.platform]: (acc[curr.platform] || 0) + curr.rented_times,
      };
    }, {} as { [key: string]: number });

    const data = {
      labels: Object.keys(rentalsByPlatform),
      datasets: [
        {
          label: "Rentas por Plataforma",
          data: Object.values(rentalsByPlatform),
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
            "rgba(0, 128, 0, 0.5)",
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
            "rgba(0, 128, 0, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const ctx = (chartRef.current as HTMLCanvasElement | null)?.getContext("2d");
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
        plugins: {
          legend: {
            labels: {
              maxWidth: 50,
            },
          },
        } as ChartOptions["plugins"]
      },
    };

    const myChart = new Chart(ctx, config);

    // Limpiar al desmontar el componente
    return () => {
      myChart.destroy();
    };
  }, [games, chartType]);

  return <canvas ref={chartRef}></canvas>;
};

export default RentalsByPlatformChart;
