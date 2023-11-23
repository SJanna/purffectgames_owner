// pages/game-metrics/GameRentalsOverTimeChart.tsx
import React, { useEffect, useRef, useState } from "react";
import { useGetGames } from "@/hooks/useGetGames";
import { useGetRentals } from "@/hooks/useGetRentals";
import Chart, { ChartTypeRegistry } from "chart.js/auto";
import { ChartConfiguration } from "chart.js/auto";
import {
  ButtonGroup,
  Button,
  Box,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";

type GameRentalsOverTimeChartProps = {
  chartType: keyof ChartTypeRegistry;
};

const GameRentalsOverTimeChart = ({
  chartType,
}: GameRentalsOverTimeChartProps) => {
  const games = useGetGames();
  const rentals = useGetRentals();
  const chartRef = useRef(null);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

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

  const gameOptions = games.map((game) => game.title);

  const rentalsForSelectedGame = rentals.filter((rental) =>
    rental.games.some((game) => game.title === selectedGame)
  );

  return (
    <Box>
      <Autocomplete
        options={gameOptions}
        fullWidth
        size="small"
        renderInput={(params) => (
          <TextField {...params} label="Select a Game" variant="outlined" />
        )}
        onChange={(e, value) => {
          setSelectedGame(value);
        }}
      />
      <Box sx={{ height: "5%" }} />
      <canvas ref={chartRef} />
    </Box>
  );
};

export default GameRentalsOverTimeChart;
