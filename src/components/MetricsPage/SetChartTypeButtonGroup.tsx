import { useMediaQuery, ButtonGroup, Button, Theme } from "@mui/material";
import { ChartTypeRegistry } from "chart.js/auto";
import React, { useState } from "react";

type SetChartTypeButtonGroupProps = {
  chartType: keyof ChartTypeRegistry;
  setChartType: React.Dispatch<React.SetStateAction<keyof ChartTypeRegistry>>;
};
export default function SetChartTypeButtonGroup({chartType, setChartType}: SetChartTypeButtonGroupProps) {
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <ButtonGroup
      variant="outlined"
      orientation={isSm ? "horizontal" : "vertical"}
      color="primary"
      size="small"
      // fullWidth
    >
      <Button
        onClick={() => setChartType("bar")}
        disabled={chartType === "bar"}
      >
        Bar
      </Button>
      <Button
        onClick={() => setChartType("line")}
        disabled={chartType === "line"}
      >
        Line
      </Button>
      <Button
        onClick={() => setChartType("pie")}
        disabled={chartType === "pie"}
      >
        Pie
      </Button>
      <Button
        onClick={() => setChartType("doughnut")}
        disabled={chartType === "doughnut"}
      >
        Doughnut
      </Button>
      <Button
        onClick={() => setChartType("polarArea")}
        disabled={chartType === "polarArea"}
      >
        Polar Area
      </Button>
      <Button
        onClick={() => setChartType("radar")}
        disabled={chartType === "radar"}
      >
        Radar
      </Button>
    </ButtonGroup>
  );
}
