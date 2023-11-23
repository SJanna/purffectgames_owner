"use client";
import { Typography, Box } from "@mui/material";
import { useState } from "react";
import { Game } from "@/types/Game";
import GameCardDetailsModal from "@/components/GameCard/GameCardDetailsModal";
import React from "react";

type GameCardProps = {
  game: Game;
};

const GameCard = React.memo(({ game }: GameCardProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={gameCardStyle(game.image)} onClick={handleOpen}>
        <Typography
          variant="body1"
          component="p"
          align="center"
          sx={{
            color: "primary.contrastText",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: 0.5,
            borderRadius: 1,
            marginBottom: 2,
          }}
        >
          {game.title}
        </Typography>
      </Box>
      <GameCardDetailsModal open={open} handleClose={handleClose} game={game} />
    </>
  );
});

GameCard.displayName = "GameCard";

export default GameCard;

const gameCardStyle = (imgUrl: string) => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "end",
    backgroundImage: `url('${imgUrl}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    textShadow: "10 10 10 black",
    minHeight: 200,
    cursor: "pointer",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
    "&:hover": {
      opacity: 0.8,
    },
  };
};
