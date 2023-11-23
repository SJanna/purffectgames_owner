import { Game } from "@/types/Game";
import { Box, Modal } from "@mui/material";
import React from "react";
import GameCardDetail from "@/components/GameCard/GameCardDetail";

type GameCardDetailsProps = {
  open: boolean;
  handleClose: () => void;
  game: Game;
};

const GameCardDetailsModal = React.memo(
  ({ open, handleClose, game }: GameCardDetailsProps) => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={`${game.title} Details`}
        aria-describedby={`Details of ${game.title} game`}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // maxWidth: 345,
        }}
      >
        <Box sx={{ maxWidth: 345 }}>
          <GameCardDetail game={game} />
        </Box>
      </Modal>
    );
  }
);

GameCardDetailsModal.displayName = "GameCardDetails";
export default GameCardDetailsModal;
