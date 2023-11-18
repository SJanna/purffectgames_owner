import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import CartItem from "@/components/RentPage/CartItem";
import { Game } from "@/types/Game";

type CartDetailsProps = {
  cartItems: Game[];
};

export default function CartDetails(cartItems: CartDetailsProps) {
  //<CartItem/>
  return (
    <>
      <Divider />
      <Grid container spacing={2} textAlign={"right"}>
        <Grid item xs={4} sm={4} md={3} lg={5} textAlign={"left"}>
          <Typography variant="body2">Item</Typography>
        </Grid>

        <Grid item xs={2} sm={2} md={3} lg={2}>
          <Typography variant="body2">Price</Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={3}> 
          <Typography variant="body2">Deadline</Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <Typography variant="body2">Quantity</Typography>
        </Grid>
      </Grid>
      <Divider />
      <Box sx={{ mt: 4 }}>
        {cartItems.cartItems.map((cartItem) => (
          <>
            <CartItem key={cartItem.id} cartItem={cartItem} />
            <Box sx={{ mt: 4 }} />
          </>
        ))}
      </Box>
      <Divider />
      <Divider sx={{ my: 1 }} />
      <Grid container spacing={1}>
        <Grid item xs={4} sm={4} md={3} lg={5}>
          <Typography variant="body2">Total</Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={3} lg={2} textAlign={'right'}>
          <Typography variant="body2">$110.00</Typography>
        </Grid>
      </Grid>
    </>
  );
}
