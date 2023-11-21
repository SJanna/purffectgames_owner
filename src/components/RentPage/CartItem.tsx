"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  Tooltip,
  Divider,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Game } from "@/types/Game";
import GameCardDetails from "@/components/GameCard/GameCardDetails";
import Image from "next/image";

type CartItemProps = {
  cartItem: Game;
};

export default function CartItem(cartItem: CartItemProps) {
  const today = dayjs();
  const maxQuantity = cartItem.cartItem.stock;

  return (
    <React.Fragment>
      {/* Center contend Horizontal */}
      <Grid container spacing={2} sx={{ textAlign: "right" }}>
        <Grid item xs={4} sm={4} md={3} lg={5} textAlign={"left"}>
          <Item cartItem={cartItem.cartItem} />
        </Grid>
        <Grid item xs={2} sm={2} md={3} lg={2}>
          <Typography variant="body2">${cartItem.cartItem.price}.00</Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={3}>
          <DatePicker
            sx={{ maxWidth: "150px" }}
            value={today}
            minDate={today}
            slotProps={{ textField: { size: "small", variant: "standard" } }}
          />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <Select
            // value={1}
            defaultValue={1}
            label="Quantity"
            variant="standard"
          >
            {[...Array(maxQuantity)].map((_, index) => (
              <MenuItem key={index} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const Item = ({ cartItem }: CartItemProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Tooltip title={cartItem.title} placement="top">
      <Image
        src={cartItem.image}
        alt={cartItem.title}
        width={40}
        height={40}
        style={{marginRight: 10, borderRadius: 5, objectFit: "cover", cursor: "pointer" }}
        onClick={handleOpen}
      />
      </Tooltip>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {/* Cut the title to max 10 characters */}

        <Typography variant="body2">
          {cartItem.title}
        </Typography>
      </Box>
      <GameCardDetails open={open} handleClose={handleClose} game={cartItem} />
    </Box>
  );
};
