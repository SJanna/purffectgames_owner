// components/MetricsPage/SaleMetrics/SalesTodayChart.tsx
import React, { useEffect, useRef, useState } from "react";
import Chart, { ChartTypeRegistry } from "chart.js/auto";
import { ChartConfiguration } from "chart.js/auto";
import { Rental } from "@/types/Rental";
import { Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type DailySalesChartProps = {
  chartType: keyof ChartTypeRegistry;
  rentals: Rental[];
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
};

const DailySalesChart = ({
  chartType,
  rentals,
  startDate,
  endDate,
}: DailySalesChartProps) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (rentals.length === 0) return;

    // Lógica para procesar las rentas y calcular las ventas diarias
    const filteredRentals = rentals.filter((rental) => {
      if (!startDate || !endDate) return true;
      const rentalDate = dayjs(rental.rental_date);

      return rentalDate >= startDate && rentalDate <= endDate;
    });

    const sortedRentals = [...filteredRentals].sort((a, b) => {
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
  }, [rentals, chartType, startDate, endDate]);

  return <canvas ref={chartRef}></canvas>;
};

export default DailySalesChart;
