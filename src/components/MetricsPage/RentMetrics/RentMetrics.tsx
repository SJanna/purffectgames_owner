// pages/game-metrics.tsx
import React, { useEffect, useRef, useState } from "react";
import RentalsByPlatformChart from "@/components/MetricsPage/RentMetrics/RentalsByPlatformChart";
import RentalsByGenreChart from "./RentalsByGenreChart";
import RentalsOverTimeChart from "./RentalsOverTimeChart";
import { ChartTypeRegistry } from "chart.js/auto";
import { Grid, ButtonGroup, Button, Box } from "@mui/material";
import SetChartTypeButtonGroup from "@/components/MetricsPage/SetChartTypeButtonGroup";

export default function GameMetrics() {
  //bar, line, scatter, bubble, pie, doughnut, polarArea, radar
  const [chartType, setChartType] = useState<keyof ChartTypeRegistry>("bar");
  const [metric, setMetric] = useState("over_time");

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
            <RentalsOverTimeChart key={renderCount} chartType={chartType} />
          )}
          {metric === "by_platform" && (
            <RentalsByPlatformChart key={renderCount} chartType={chartType} />
          )}
          {metric === "by_gendre" && (
            <RentalsByGenreChart key={renderCount} chartType={chartType} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
