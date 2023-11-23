import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { use, useEffect, useState } from "react";
import CartItem from "@/components/RentPage/CartItem";
import { Game } from "@/types/Game";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type CartDetailsProps = {
  cartItems: Game[];
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  deadline: dayjs.Dayjs;
  setDeadline: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
};

const CartDetails = React.memo(
  ({ cartItems, total, setTotal, deadline, setDeadline }: CartDetailsProps) => {
    const today = dayjs();
    const [newCartItems, setNewCartItems] = useState(cartItems);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
      //Add a quantity to cartItems
      setNewCartItems(
        cartItems.map((cartItem) => {
          return { ...cartItem, quantity };
        })
      );
    }
    , [quantity, cartItems]);

    useEffect(() => {
      //Calculate the total price
      setTotal(
        newCartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0)
      );
    }, [newCartItems]);

    return (
      <React.Fragment>
        <Divider />
        <Grid container spacing={2} textAlign={"right"}>
          <Grid item xs={8} sm={8} md={8} lg={7} textAlign={"left"}>
            <Typography variant="body2">Item</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={3}>
            <Typography variant="body2">Price</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Typography variant="body2">Quantity</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Box sx={{ mt: 4 }}>
          {newCartItems?.map((cartItem) => (
            <React.Fragment key={cartItem.id}>
              <CartItem key={cartItem?.id} cartItem={cartItem} setNewCartItems={setNewCartItems} />
              <Box sx={{ mt: 4 }} />
            </React.Fragment>
          ))}
        </Box>
        <Divider />
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={1}>
          <Grid item xs={8} sm={8} md={8} lg={7}>
            <Typography variant="body2">Total</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={3} textAlign={"right"}>
            <Typography variant="body2">${total.toFixed(2)}</Typography>
          </Grid>
        </Grid>
        {/* Deadline */}
        <Grid container spacing={1}>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Typography variant="body2">Deadline</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} textAlign={"right"}>
            <DatePicker
              sx={{ maxWidth: "120px" }}
              value={deadline}
              minDate={today}
              onChange={(newValue) => {
                if (newValue) {
                  setDeadline(newValue);
                }
              }}
              slotProps={{ textField: { size: "small", variant: "standard" } }}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
);

CartDetails.displayName = "CartDetails";
export default CartDetails;
