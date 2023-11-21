import React from "react";
import PageTitle from "@/components/RentalsPage/PageTitle";
import RentalsTable from "@/components/RentalsPage/RentalsTable/RentalsTable";
import { Box } from "@mui/material";

export default function Rentals() {
  return (
    <Box>
      <PageTitle />
      <RentalsTable />
    </Box>
  );
}
