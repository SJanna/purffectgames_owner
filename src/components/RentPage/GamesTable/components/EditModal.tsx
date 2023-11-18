import { DialogTitle, DialogContent, DialogActions, Box, Divider } from "@mui/material";
import {
  MRT_EditActionButtons,
  MRT_Row,
  MRT_TableInstance,
} from "material-react-table";
import { Game } from "@/types/Game";

type EditModalProps = {
  table: MRT_TableInstance<Game>;
  row: MRT_Row<Game>;
  internalEditComponents: React.ReactNode;
};

const EditModal = ({ table, row, internalEditComponents }: EditModalProps) => {
  const modal = (
    <>
      <DialogTitle variant="h5" sx={{ textAlign: "center" }}>Edit Game</DialogTitle>
      <Divider variant="middle"/>
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
      </>
  );

  return modal;
};

export default EditModal;
