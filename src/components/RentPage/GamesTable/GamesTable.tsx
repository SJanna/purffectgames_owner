import React, { useState } from "react";
import {
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_TablePagination,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToolbarAlertBanner,
} from "material-react-table";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Game } from "@/types/Game";
import EditModal from "@/components/RentPage/GamesTable/components/EditModal";
import CreateModal from "@/components/RentPage/GamesTable/components/CreateModal";
import RowActions from "@/components/RentPage/GamesTable/components/RowActions";
import useSetColumns from "@/components/RentPage/GamesTable/utils/useSetColumns";
import useCreateGame from "@/components/RentPage/GamesTable/hooks/useCreateGame";
import useDeleteGame from "@/components/RentPage/GamesTable/hooks/useDeleteGame";
import useGetGames from "@/components/RentPage/GamesTable/hooks/useGetGames";
import useUpdateGame from "@/components/RentPage/GamesTable/hooks/useUpdateGame";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { validateGame } from "./utils/validateGame";

type GamesTableProps = {
  setSelectedGames: React.Dispatch<React.SetStateAction<Game[]>>;
};

const GamesTable = React.memo(({ setSelectedGames }: GamesTableProps) => {
  // Validation errors
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  // Table columns
  const columns = useSetColumns({ validationErrors, setValidationErrors });

  //call CREATE hook
  const { mutateAsync: createGame, isPending: isCreatingGame } =
    useCreateGame();

  //call READ hook
  const {
    data: fetchedGames = [],
    isError: isLoadingGamesError,
    isFetching: isFetchingGames,
    isLoading: isLoadingGames,
    refetch,
  } = useGetGames();

  //call UPDATE hook
  const { mutateAsync: updateGame, isPending: isUpdatingGame } =
    useUpdateGame();
  //call DELETE hook
  const { mutateAsync: deleteGame, isPending: isDeletingGame } =
    useDeleteGame();

  //CREATE action
  const handleCreateGame: MRT_TableOptions<Game>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateGame(values);
    console.log("newValidationErrors", newValidationErrors);
    console.log("values", values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createGame(values);
    table.setCreatingRow(null);
  };

  //UPDATE action
  const handleSaveGame: MRT_TableOptions<Game>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateGame(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateGame(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<Game>) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${row.original.title}? \nThis game will be deleted permanently.`
      )
    ) {
      deleteGame(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedGames,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    positionActionsColumn: "last",
    enableSelectAll: false,
    enableRowSelection: true,
    enableFacetedValues: true,
    muiCircularProgressProps: {
      thickness: 5,
      size: 55,
      color: "secondary",
    },

    // To get the selected rows to write down the table
    muiSelectCheckboxProps: ({ table }) => ({
      onInput: () => {
        const selectedRows = table
          .getSelectedRowModel()
          .rows.map((row) => row.original);
        setSelectedGames(selectedRows);
      },
    }),
    initialState: {
      showGlobalFilter: true,
      showSkeletons: false,
      columnVisibility: {
        image: false,
      },
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    // getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingGamesError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateGame,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveGame,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) =>
      CreateModal({ table, row, internalEditComponents }),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) =>
      EditModal({ table, row, internalEditComponents }),
    renderRowActions: ({ row, table }) =>
      RowActions({ row, table, openDeleteConfirmModal }),
    state: {
      isLoading: isLoadingGames,
      isSaving: isCreatingGame || isUpdatingGame || isDeletingGame,
      showAlertBanner: isLoadingGamesError,
      showProgressBars: isFetchingGames,
    },
  });

  return (
    <Box
     sx={{ border: "gray 2px solid", borderRadius:'10px', boxShadow: 1, "&:hover": { boxShadow: 5 }, padding: 2 }}
     >
      {/* Our Custom External Top Toolbar */}
      <Box
        sx={(theme) => ({
          display: "flex",
          backgroundColor: "inherit",
          borderRadius: "4px",
          flexDirection: "row",
          gap: "16px",
          justifyContent: "space-between",
          padding: "24px 16px",
          "@media max-width: 768px": {
            flexDirection: "column",
          },
        })}
      >
        <Box>
          <Tooltip arrow title="Refresh Data">
            <IconButton onClick={() => refetch()}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <MRT_GlobalFilterTextField table={table} />
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MRT_ToggleFiltersButton table={table} />
          <MRT_ShowHideColumnsButton table={table} />
          <MRT_ToggleDensePaddingButton table={table} />
          <Tooltip title="New Game">
            <IconButton onClick={() => table.setCreatingRow(true)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {/* Some Page Content */}
      <Typography p="16px 4px">
        {
          // "Hey I'm some page content. I'm just one of your normal components between your custom toolbar and the MRT Table below"
        }
      </Typography>
      <Box sx={{ display: "grid", width: "100%" }}>
        <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
      </Box>
      {/* The MRT Table with no toolbars built-in */}
      <MRT_TableContainer table={table} />
      {/* Our Custom Bottom Toolbar */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Tooltip arrow title="Reset Default">
            <IconButton
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to set table Defaults? \nThis will reset all table settings to default.`
                  )
                ) {
                  table.resetColumnFilters(), table.resetColumnVisibility();
                  table.resetGlobalFilter();
                  table.resetPagination();
                  table.resetSorting();
                  table.setShowColumnFilters(false);
                  table.resetPageSize();
                  table.resetPageIndex();
                }
              }}
            >
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <MRT_TablePagination table={table} />
        </Box>
      </Box>
    </Box>
  );
});

GamesTable.displayName = "GamesTable";
export default GamesTable;
