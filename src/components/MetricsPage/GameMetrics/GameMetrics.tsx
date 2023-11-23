// pages/game-metrics.tsx
import React, { useEffect, useRef, useState } from "react";
import GameRentalsOverTimeChart from "@/components/MetricsPage/GameMetrics/GameRentalsOverTimeChart";
import MostRentedGamesChart from "@/components/MetricsPage/GameMetrics/MostRentedGamesChart";
import MostRentedGameByAge from "./MostRentedGameByAge";
import { ChartTypeRegistry } from "chart.js/auto";
import {
  Grid,
  ButtonGroup,
  Button,
  Box,
} from "@mui/material";
import SetChartTypeButtonGroup from "@/components/MetricsPage/SetChartTypeButtonGroup";


export default function GameMetrics() {
  //bar, line, scatter, bubble, pie, doughnut, polarArea, radar
  const [chartType, setChartType] = useState<keyof ChartTypeRegistry>("bar");
  const [metric, setMetric] = useState("rents_over_time");

  const [renderCount, setRenderCount] = useState(0);
  const prevWindowWidth = useRef(window.innerWidth);

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
      <Box sx={{height: '5%'}} />

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
              <GameRentalsOverTimeChart
                key={renderCount}
                chartType={chartType}
              />
            )}
            {metric === "top_rented" && (
              <MostRentedGamesChart key={renderCount} chartType={chartType} />
            )}
          </Grid>
        </Grid>
      ) : (
        <MostRentedGameByAge />
      )}
    </React.Fragment>
  );
}
