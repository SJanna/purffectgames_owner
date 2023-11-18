import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { MRT_Row, MRT_TableInstance } from "material-react-table";
import { Game } from "@/types/Game";

type RowActionsProps = {
  table: MRT_TableInstance<Game>;
  row: MRT_Row<Game>;
  openDeleteConfirmModal: (row: MRT_Row<Game>) => void;
};

const RowActions = ({ table, row, openDeleteConfirmModal }: RowActionsProps ) => (
  <Box sx={{ display: "flex", gap: "1rem" }}>
    <Tooltip title="Edit">
      <IconButton onClick={() => table.setEditingRow(row)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Delete">
      <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  </Box>
);

export default RowActions;