"use client";
import React, { use, useEffect, useRef, useState } from "react";
import RentMetrics from "@/components/MetricsPage/RentMetrics/RentMetrics";
import ClientMetrics from "@/components/MetricsPage/ClientMetrics/ClientMetrics";
import GameMetrics from "@/components/MetricsPage/GameMetrics/GameMetrics";
import { ButtonGroup, Button, Grid } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { useGetClients } from "@/hooks/useGetClients";
import { useGetGames } from "@/hooks/useGetGames";
import { useGetRentals } from "@/hooks/useGetRentals";
import { ChartTypeRegistry } from "chart.js/auto";

export default function Metrics() {
  const [metric, setMetric] = React.useState("client_metrics");
  const games = useGetGames();
  const rentals = useGetRentals();
  const clients = useGetClients();
  const [chartType, setChartType] =
    React.useState<keyof ChartTypeRegistry>("bar");

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const [renderCount, setRenderCount] = useState(0);
  const prevWindowWidth = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const currentWindowWidth = window.innerWidth;
      // Verificar si el tamaño de la pantalla ha aumentado
      if (currentWindowWidth > prevWindowWidth.current) {
        // Incrementar el contador para forzar un nuevo renderizado
        setRenderCount((prevCount) => prevCount + 1);
      }
      // Actualizar el tamaño anterior de la ventana
      prevWindowWidth.current = currentWindowWidth;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          {metric === "rent_metrics" && (
            <RentMetrics
              games={games}
              rentals={rentals}
              chartType={chartType}
              setChartType={setChartType}
              renderCount={renderCount}
            />
          )}
          {metric === "client_metrics" && (
            <ClientMetrics
              clients={clients}
              rentals={rentals}
              chartType={chartType}
              setChartType={setChartType}
              renderCount={renderCount}
            />
          )}
          {metric === "game_metrics" && (
            <GameMetrics
              games={games}
              rentals={rentals}
              chartType={chartType}
              setChartType={setChartType}
              renderCount={renderCount}
            />
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
