import React, { useEffect, useRef, useState } from "react";
import CityStateChart from "@/components/MetricsPage/ClientMetrics/CityStateChart";
import IdTypeChart from "@/components/MetricsPage/ClientMetrics/IdTypeChart";
import AgeChart from "@/components/MetricsPage/ClientMetrics/AgeChart";
import { ChartTypeRegistry } from "chart.js/auto";
import { Grid, ButtonGroup, Button, Box } from "@mui/material";
import SetChartTypeButtonGroup from "@/components/MetricsPage/SetChartTypeButtonGroup";

export default function ClientMetrics() {
  //bar, line, scatter, bubble, pie, doughnut, polarArea, radar
  const [chartType, setChartType] = useState<keyof ChartTypeRegistry>("bar");
  const [metric, setMetric] = useState("age");

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
                setMetric("age");
                // setChartType("bar");
              }}
              disabled={metric === "age"}
            >
              Age
            </Button>
            <Button
              onClick={() => {
                setMetric("city_state");
                // setChartType("bar");
              }}
              disabled={metric === "city_state"}
            >
              City/State
            </Button>
            <Button
              onClick={() => {
                setMetric("id_type");
                // setChartType("bar");
              }}
              disabled={metric === "id_type"}
            >
              ID Type
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Box sx={{height: '5%'}} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={2} sx={{marginTop: 4}} >
          <SetChartTypeButtonGroup
            chartType={chartType}
            setChartType={setChartType}
          />
        </Grid>
        <Grid item xs={12} md={10} maxHeight={500} sx={{overflow: 'auto'}}>
          {metric === "age" && (
            <AgeChart key={renderCount} chartType={chartType} />
          )}
          {metric === "city_state" && (
            <CityStateChart key={renderCount} chartType={chartType} />
          )}
          {metric === "id_type" && (
            <IdTypeChart key={renderCount} chartType={chartType} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
