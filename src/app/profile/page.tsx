"use client";
import ProfileInfo from "@/components/ProfilePage/ProfileInfo";
import { Grid, Box } from "@mui/material";
import { useGetClient } from "@/hooks/useGetClient";
import { Client } from "@/types/Client";

export default function Profile() {
  const client = useGetClient() as Client;
  return (
    <Grid container spacing={2} direction="row" justifyContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <ProfileInfo client={client} />
        <Box sx={{ my: 4 }} />
      </Grid>
    </Grid>
  );
}
