import React from "react";
import { Typography } from "@mui/material";
import { userInfo } from "@/data/userInfo";

export default function WelcomeMessage() {
  return (
    <div>
      <Typography variant="h3">Hello {userInfo.name}!</Typography>
      <Typography variant="body2">What would you like to do today?</Typography>
    </div>
  );
}
