import React, { useState } from "react";
import CityStateChart from "@/components/MetricsPage/ClientMetrics/CityStateChart";
import IdTypeChart from "@/components/MetricsPage/ClientMetrics/IdTypeChart";
import AgeChart from "@/components/MetricsPage/ClientMetrics/AgeChart";
import MostRentedClientChart from "./MostRentedClientChart";
import { ChartTypeRegistry } from "chart.js/auto";
import { Grid, ButtonGroup, Button, Box, TextField } from "@mui/material";
import SetChartTypeButtonGroup from "@/components/MetricsPage/SetChartTypeButtonGroup";
import { Client } from "@/types/Client";
import { Rental } from "@/types/Rental";

type ClientMetricsProps = {
  clients: Client[];
  rentals: Rental[];
  chartType: keyof ChartTypeRegistry;
  setChartType: React.Dispatch<React.SetStateAction<keyof ChartTypeRegistry>>;
  renderCount: number;
};

export default function ClientMetrics({
  clients,
  rentals,
  chartType,
  setChartType,
  renderCount,
}: ClientMetricsProps) {
  const [metric, setMetric] = useState("age");
  const [topClientsCount, setTopClientsCount] = useState<number>(5);

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
            <Button
              onClick={() => setMetric("most_rented")}
              disabled={metric === "most_rented"}
            >
              Most Rented
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
          {metric === "age" && (
            <AgeChart
              key={renderCount}
              chartType={chartType}
              clients={clients}
            />
          )}
          {metric === "city_state" && (
            <CityStateChart
              key={renderCount}
              chartType={chartType}
              clients={clients}
            />
          )}
          {metric === "id_type" && (
            <IdTypeChart
              key={renderCount}
              chartType={chartType}
              clients={clients}
            />
          )}
          {metric === "most_rented" && (
            <React.Fragment>
              <TextField
                label="Top Clientes"
                type="number"
                value={topClientsCount}
                size="small"
                onChange={(e) => setTopClientsCount(Number(e.target.value))}
                InputProps={{ inputProps: { min: 1 } }}
              />
              <MostRentedClientChart
                key={renderCount}
                chartType={chartType}
                clients={clients}
                rentals={rentals}
                topClientsCount={topClientsCount}
              />
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
