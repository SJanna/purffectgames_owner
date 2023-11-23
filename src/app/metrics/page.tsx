"use client";
import React from "react";
import RentMetrics from "@/components/MetricsPage/RentMetrics/RentMetrics";
import ClientMetrics from "@/components/MetricsPage/ClientMetrics/ClientMetrics";
import GameMetrics from "@/components/MetricsPage/GameMetrics/GameMetrics";
import { ButtonGroup, Button, Grid } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

export default function Metrics() {
  const [metric, setMetric] = React.useState("");
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={1} justifyContent="center" textAlign="center">
        <Grid item xs={12}>
          <ButtonGroup variant="outlined" fullWidth>
            <Button
              onClick={() => setMetric("rent_metrics")}
              disabled={metric === "rent_metrics"}
            >
              Rent Metrics
            </Button>
            <Button
              onClick={() => setMetric("game_metrics")}
              disabled={metric === "game_metrics"}
            >
              Game Metrics
            </Button>
            <Button
              onClick={() => setMetric("client_metrics")}
              disabled={metric === "client_metrics"}
            >
              Client Metrics
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          {metric === "rent_metrics" && <RentMetrics />}
          {metric === "client_metrics" && <ClientMetrics />}
          {metric === "game_metrics" && <GameMetrics />}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
