import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Game } from "@/types/Game";
import GameCardDetailsModal from "@/components/GameCard/GameCardDetailsModal";
import Image from "next/image";

type CartItemProps = {
  cartItem: Game;
  setNewCartItems: React.Dispatch<React.SetStateAction<Game[]>>;
};

export default function CartItem({ cartItem, setNewCartItems }: CartItemProps) {
  const maxQuantity = cartItem.stock;

  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{ textAlign: "right" }}>
        <Grid item xs={8} sm={8} md={8} lg={7} textAlign={"left"}>
          <Item game={cartItem} />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={3}>
          <Typography variant="body2">
            ${(cartItem.price * (cartItem.quantity)).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <Select
            value={cartItem.quantity}
            label="Quantity"
            variant="standard"
            fullWidth
            onChange={(e) => {
              setNewCartItems((prev) =>
                prev.map((item) =>
                  item.id === cartItem.id
                    ? { ...item, quantity: parseInt(e.target.value.toString(), 10) }
                    : item
                )
              );
            }}
          >
            {[...Array(maxQuantity)].map((_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
type ItemProps = {
  game: Game;
};
const Item = ({ game }: ItemProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Tooltip title={game.title} placement="top">
        <Image
          src={game.image}
          alt={game.title}
          width={40}
          height={40}
          style={{
            marginRight: 10,
            borderRadius: 5,
            objectFit: "cover",
            cursor: "pointer",
          }}
          onClick={handleOpen}
          placeholder="blur"
          blurDataURL="/static/images/placeholder.png"
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
        <Typography variant="body2">{game.title}</Typography>
      </Box>
      <GameCardDetailsModal open={open} handleClose={handleClose} game={game} />
    </Box>
  );
};
