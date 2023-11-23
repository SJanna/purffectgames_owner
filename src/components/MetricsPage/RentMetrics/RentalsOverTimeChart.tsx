// components/MetricsPage/GameMetrics/RentalsOverTimeChart.tsx
import React, { useEffect, useRef } from "react";
import Chart, { ChartTypeRegistry } from "chart.js/auto";
import { useGetRentals } from "@/hooks/useGetRentals";
import { ChartConfiguration } from "chart.js/auto";

type RentalsOverTimeChartProps = {
  chartType: keyof ChartTypeRegistry;
};

const RentalsOverTimeChart = ({ chartType }: RentalsOverTimeChartProps) => {
  const rentals = useGetRentals();
  const chartRef = useRef(null);

  useEffect(() => {
    if (rentals.length === 0) return;

    // Ordenar las fechas de forma ascendente
    const sortedRentals = [...rentals].sort(
      (a, b) =>
        new Date(a.rental_date).getTime() - new Date(b.rental_date).getTime()
    );

    const rentalsOverTime = sortedRentals.reduce((acc, curr) => {
      const rentalDate = new Date(curr.rental_date);
      const monthYear = `${
        rentalDate.getMonth() + 1
      }/${rentalDate.getFullYear()}`;

      return {
        ...acc,
        [monthYear]: (acc[monthYear] || 0) + 1,
      };
    }, {} as { [key: string]: number });

    const data = {
      labels: Object.keys(rentalsOverTime),
      datasets: [
        {
          label: "Rentals Over Time",
          data: Object.values(rentalsOverTime),
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
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
            beginAtZero: false,
          },
        },
      },
    };

    const myChart = new Chart(ctx, config);

    // Limpiar al desmontar el componente
    return () => {
      myChart.destroy();
    };
  }, [rentals, chartType]);

  return <canvas ref={chartRef}></canvas>;
};

export default RentalsOverTimeChart;
