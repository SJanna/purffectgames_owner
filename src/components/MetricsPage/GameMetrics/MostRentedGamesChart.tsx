import React, { useEffect, useRef } from "react";
import Chart, { ChartTypeRegistry } from "chart.js/auto";
import { ChartConfiguration } from "chart.js/auto";
import { Game } from "@/types/Game";


// CORREGIR LÓGICA DE FILTRADO DE JUEGOS MÁS RENTADOS
type PopularGamesChartProps = {
  chartType: keyof ChartTypeRegistry;
  topGamesCount: number;
  games: Game[];
};

const MostRentedGamesChart = ({
  chartType,
  topGamesCount,
  games
}: PopularGamesChartProps) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (games.length === 0) return;
    // Get the most rented games using game.rented_times
    const topGames = games
      .map((game) => game.rented_times)
      .sort((a, b) => b - a)
      .slice(0, topGamesCount);

    const gamesCounts: { [key: string]: number } = topGames.reduce(
      (acc, curr) => {
        const game = games.find(
          (game) => game.rented_times === curr && game.rented_times > 0
        );
        if (!game) return acc;

        return {
          ...acc,
          [game.title]: curr,
        };
      },
      {} as { [key: string]: number }
    );

    const data = {
      //Show count of games and the game name
      labels: Object.keys(gamesCounts),
      datasets: [
        {
          label: `Top ${topGamesCount} most rented games`,
          data: Object.values(gamesCounts),
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
  }, [games, chartType, topGamesCount]);

  return <canvas ref={chartRef}></canvas>;
};

export default MostRentedGamesChart;
