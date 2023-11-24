"use client";
import React from "react";
import { Typography } from "@mui/material";
import { useGetClient } from "@/hooks/useGetClient";

export default function WelcomeMessage() {
  const client  = useGetClient(0);

  return (
    <div>
      {client && <Typography variant="h3">Hello {client?.first_name}!</Typography>}
      {!client && <Typography variant="h3">Hello!</Typography>}
      <Typography variant="body2">What would you like to do today?</Typography>
    </div>
  );
}
