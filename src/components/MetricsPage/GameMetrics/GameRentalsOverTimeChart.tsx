// pages/game-metrics/GameRentalsOverTimeChart.tsx
import React, { useEffect, useRef } from "react";
import Chart, { ChartTypeRegistry } from "chart.js/auto";
import { ChartConfiguration } from "chart.js/auto";
import { Game } from "@/types/Game";
import { Rental } from "@/types/Rental";

type GameRentalsOverTimeChartProps = {
  chartType: keyof ChartTypeRegistry;
  selectedGame: string | null;
  games: Game[];
  rentals: Rental[];
};

const GameRentalsOverTimeChart = ({
  chartType,
  selectedGame,
  games,
  rentals,
}: GameRentalsOverTimeChartProps) => {

  const chartRef = useRef(null);

  useEffect(() => {
    if (!selectedGame || games.length === 0 || rentals.length === 0) return;

    const rentalsForSelectedGame = rentals.filter((rental) =>
      rental.games.some((game) => game.title === selectedGame)
    );

    const rentalsCountByMonth: { [key: string]: number } = {};

    rentalsForSelectedGame.forEach((rental) => {
      const monthYear = `${new Date(rental.rental_date).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "numeric",
        }
      )}`;
      rentalsCountByMonth[monthYear] =
        (rentalsCountByMonth[monthYear] || 0) + 1;
    });

    const data = {
      labels: Object.keys(rentalsCountByMonth),
      datasets: [
        {
          label: `Rents of "${selectedGame}" across time`,
          data: Object.values(rentalsCountByMonth),
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

    return () => {
      myChart.destroy();
    };
  }, [selectedGame, games, rentals, chartType]);

  return <canvas ref={chartRef} />;
};

export default GameRentalsOverTimeChart;
