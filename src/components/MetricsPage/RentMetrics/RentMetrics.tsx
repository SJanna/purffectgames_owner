import React, { useState } from "react";
import RentalsByPlatformChart from "@/components/MetricsPage/RentMetrics/RentalsByPlatformChart";
import RentalsByGenreChart from "./RentalsByGenreChart";
import RentalsOverTimeChart from "./RentalsOverTimeChart";
import DailySalesChart from "./DailySalesChart";
import { ChartTypeRegistry } from "chart.js/auto";
import { Grid, ButtonGroup, Button, Box } from "@mui/material";
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
  const [metric, setMetric] = useState("over_time");

  return (
    <React.Fragment>
      <Grid container spacing={2} justifyContent="center" textAlign="center">
        <Grid item xs={12}>
          <ButtonGroup variant="outlined" color="secondary">
            <Button
              onClick={() => {
                setMetric("over_time");
              }}
              disabled={metric === "over_time"}
            >
              Over Time
            </Button>
            <Button
              onClick={() => {
                setMetric("by_platform");
              }}
              disabled={metric === "by_platform"}
            >
              Platform
            </Button>
            <Button
              onClick={() => {
                setMetric("by_gendre");
              }}
              disabled={metric === "by_gendre"}
            >
              Genre
            </Button>
            <Button
              onClick={() => setMetric("daily_sales")}
              disabled={metric === "daily_sales"}
            >
              Daily Sales
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Box sx={{ height: "5%" }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={2} sx={{ marginTop: 4 }}>
          <SetChartTypeButtonGroup
            chartType={chartType}
            setChartType={setChartType}
          />
        </Grid>
        <Grid item xs={12} md={10} maxHeight={500} sx={{ overflow: "auto" }}>
          {metric === "over_time" && (
            <RentalsOverTimeChart
              key={renderCount}
              chartType={chartType}
              rentals={rentals}
            />
          )}
          {metric === "by_platform" && (
            <RentalsByPlatformChart
              key={renderCount}
              chartType={chartType}
              games={games}
            />
          )}
          {metric === "by_gendre" && (
            <RentalsByGenreChart
              key={renderCount}
              chartType={chartType}
              games={games}
            />
          )}
          {metric === "daily_sales" && (
            <DailySalesChart
              key={renderCount}
              chartType={chartType}
              rentals={rentals}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
