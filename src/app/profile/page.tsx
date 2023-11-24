"use client";
import ProfileInfo from "@/components/ProfilePage/ProfileInfo";
import { Grid, Box, Typography } from "@mui/material";
import { useGetClient } from "@/hooks/useGetClient";
import { Client } from "@/types/Client";

export default function Profile() {
  const client = useGetClient(0) as Client;
  if (!client) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "2rem",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
          Profile
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
          No client found
        </Typography>
      </Box>
    );
  }
  return (
    <Grid container spacing={2} direction="row" justifyContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <ProfileInfo client={client} />
        <Box sx={{ my: 4 }} />
      </Grid>
    </Grid>
  );
}
