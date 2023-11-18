"use client";
import React from "react";
import { Grid } from "@mui/material";
import RentInfo from "@/components/RentPage/RentInfo";
import GamesTable from "@/components/RentPage/GamesTable/GamesTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Rent() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <GamesTable />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <RentInfo />
        </Grid>
      </Grid>
    </QueryClientProvider>
  );
}
