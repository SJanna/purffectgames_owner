import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import {
  MRT_EditActionButtons,
  MRT_Row,
  MRT_TableInstance,
} from "material-react-table";
import { Game } from "@/types/Game";
import React from "react";

type CreateModalProps = {
  table: MRT_TableInstance<Game>;
  row: MRT_Row<Game>;
  internalEditComponents: React.ReactNode;
};

const CreateModal = ({
  table,
  row,
  internalEditComponents,
}: CreateModalProps) => (
  <React.Fragment>
    <DialogTitle variant="h5" sx={{ textAlign: "center" }}>
      Add game
    </DialogTitle>
    <Divider variant="middle" />
    <DialogContent
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        p: "1",
      }}
    >
      {internalEditComponents}
    </DialogContent>
    <DialogActions>
      <MRT_EditActionButtons variant="text" table={table} row={row} />
    </DialogActions>
  </React.Fragment>
);

export default CreateModal;
