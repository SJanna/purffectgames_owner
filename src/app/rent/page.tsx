"use client";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import RentInfo from "@/components/RentPage/RentInfo";
import GamesTable from "@/components/RentPage/GamesTable/GamesTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Game } from "@/types/Game";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Rent() {
  const queryClient = new QueryClient();
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  if (!selectedGames) {
    return <div>Loading...</div>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <GamesTable setSelectedGames={setSelectedGames} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <RentInfo cartItems={selectedGames} />
          </Grid>
        </Grid>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}
