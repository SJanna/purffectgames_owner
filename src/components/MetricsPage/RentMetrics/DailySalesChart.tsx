// components/MetricsPage/SaleMetrics/SalesTodayChart.tsx
import React, { useEffect, useRef } from "react";
import Chart, { ChartTypeRegistry } from "chart.js/auto";
import { ChartConfiguration } from "chart.js/auto";
import { Rental } from "@/types/Rental";

type DailySalesChartProps = {
  chartType: keyof ChartTypeRegistry;
  rentals: Rental[];
};

const DailySalesChart = ({ chartType, rentals }: DailySalesChartProps) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (rentals.length === 0) return;

    // Lógica para procesar las rentas y calcular las ventas diarias
    const sortedRentals = [...rentals].sort((a, b) => {
      return (
        new Date(a.rental_date).getTime() - new Date(b.rental_date).getTime()
      );
    });

    const salesData = sortedRentals.reduce((acc, rental) => {
      const date = new Date(rental.rental_date).toLocaleDateString();

      if (!acc[date]) {
        acc[date] = 0;
      }

      acc[date] += rental.price;

      return acc;
    }, {} as { [key: string]: number });

    const data = {
      labels: Object.keys(salesData),
      datasets: [
        {
          label: "Daily Sales",
          data: Object.values(salesData),
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
  }, [rentals, chartType]);

  return <canvas ref={chartRef}></canvas>;
};

export default DailySalesChart;
