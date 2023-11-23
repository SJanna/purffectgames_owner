import React, { useState } from "react";
import GameRentalsOverTimeChart from "@/components/MetricsPage/GameMetrics/GameRentalsOverTimeChart";
import MostRentedGamesChart from "@/components/MetricsPage/GameMetrics/MostRentedGamesChart";
import MostRentedGameByAge from "./MostRentedGameByAge";
import { ChartTypeRegistry } from "chart.js/auto";
import {
  Grid,
  ButtonGroup,
  Button,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import SetChartTypeButtonGroup from "@/components/MetricsPage/SetChartTypeButtonGroup";
import { Game } from "@/types/Game";
import { Rental } from "@/types/Rental";

type GameMetricsProps = {
  games: Game[];
  rentals: Rental[];
  chartType: keyof ChartTypeRegistry;
  setChartType: React.Dispatch<React.SetStateAction<keyof ChartTypeRegistry>>;
  renderCount: number;
};

export default function GameMetrics({
  games,
  rentals,
  chartType,
  setChartType,
  renderCount,
}: GameMetricsProps) {
  //bar, line, scatter, bubble, pie, doughnut, polarArea, radar
  const [metric, setMetric] = useState("rents_over_time");
  const [selectedGame, setSelectedGame] = useState<string | null>(null); // for rents_over_time
  const [topGamesCount, setTopGamesCount] = useState(10); // for most_rented
  const gameOptions = games.map((game) => game.title);

  return (
    <React.Fragment>
      <Grid container spacing={2} justifyContent="center" textAlign="center">
        <Grid item xs={12}>
          <ButtonGroup variant="outlined" color="secondary">
            <Button
              onClick={() => {
                setMetric("rents_over_time");
                // setChartType("bar");
              }}
              disabled={metric === "rents_over_time"}
            >
              Rents Over Time
            </Button>
            <Button
              onClick={() => {
                setMetric("top_rented");
                // setChartType("scatter");
              }}
              disabled={metric === "top_rented"}
            >
              TOP Rented
            </Button>
            <Button
              onClick={() => setMetric("most_rented_by_age")}
              disabled={metric === "most_rented_by_age"}
            >
              Most Rented By Age
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      <Box sx={{ height: "5%" }} />

      {metric !== "most_rented_by_age" ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={2} sx={{ marginTop: 4 }}>
            <SetChartTypeButtonGroup
              chartType={chartType}
              setChartType={setChartType}
            />
          </Grid>
          <Grid item xs={12} md={10} maxHeight={500} sx={{ overflow: "auto" }}>
            {metric === "rents_over_time" && (
              <React.Fragment>
                <Autocomplete
                  options={gameOptions}
                  fullWidth
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a Game"
                      variant="outlined"
                    />
                  )}
                  onChange={(e, value) => {
                    setSelectedGame(value);
                  }}
                />
                <GameRentalsOverTimeChart
                  key={renderCount}
                  chartType={chartType}
                  selectedGame={selectedGame}
                  games={games}
                  rentals={rentals}
                />
              </React.Fragment>
            )}
            {metric === "top_rented" && (
              <React.Fragment>
                <TextField
                  label="Top Games Count"
                  type="number"
                  value={topGamesCount}
                  size="small"
                  onChange={(e) => setTopGamesCount(Number(e.target.value))}
                  InputProps={{ inputProps: { min: 1 } }}
                />
                <MostRentedGamesChart
                  key={renderCount}
                  chartType={chartType}
                  topGamesCount={topGamesCount}
                  games={games}
                />
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      ) : (
        <MostRentedGameByAge />
      )}
    </React.Fragment>
  );
}
