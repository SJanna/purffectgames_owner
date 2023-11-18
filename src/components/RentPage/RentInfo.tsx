import React from "react";
import CartDetails from "@/components/RentPage/CartDetails";
import ClientForm from "@/components/RentPage/ClientForm";
import { Box, Grid, Button } from "@mui/material";
import { cartItems } from "@/data/cartItems";

export default function RentInfo() {
  return (
    <Grid container spacing={2} direction="column" justifyContent="center">
      <Grid item xs={12}>
        <CartDetails cartItems={cartItems} />
      </Grid>
      <Grid item xs={12}>
        <ClientForm />
      </Grid>
      <Box sx={{ my: 2 }} />
      <Grid item xs={12}>
        <Button variant="contained" size="large" color="primary" fullWidth>
          Book Games
        </Button>
      </Grid>
    </Grid>
  );
}
