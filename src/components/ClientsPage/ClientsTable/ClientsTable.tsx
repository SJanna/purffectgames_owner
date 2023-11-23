import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_Row,
  MRT_TableOptions,
} from "material-react-table";
import { Client } from "@/types/Client";
import { useGetClients } from "@/hooks/useGetClients";
import { Alert, Box, Chip, IconButton, Tooltip } from "@mui/material";
import React from "react";
import useDeleteClient from "@/components/ClientsPage/hooks/useDeleteClient";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useUpdateClient from "@/components/ClientsPage/hooks/useUpdateClient";

const ClientsTable = () => {
  const data = useGetClients();
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Client>[]>(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "ID",
        muiEditTextFieldProps: {
          // variant: "standard",
          disabled: true,
        },
        size: 100,
      },
      {
        accessorKey: "first_name", //access nested data with dot notation
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "identification_type",
        header: "Identification Type",
        size: 150,
      },
      {
        accessorKey: "identification_number",
        header: "Identification Number",
        size: 150,
      },
      {
        accessorKey: "birth_date",
        header: "Birth Date",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 150,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 150,
      },
      {
        accessorKey: "zip",
        header: "Zip",
        size: 150,
      },
      {
        accessorKey: "rental_ids",
        header: "Rentals ID",
        Cell: ({ row }) => {
          return row.original.rental_ids?.map((rental_id) => (
            <Chip
              key={rental_id}
              label={rental_id}
              variant="outlined"
              sx={{ m: 0.5 }}
            />
          ));
        },
      },
      {
        header: "Total Rentals",
        Cell: ({ row }) => {
          return row.original.rental_ids?.length;
        },
      },
    ],
    []
  );

  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteClient();

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<Client>) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original.id);
    }
  };

  // call UPDATE hook
  const { mutateAsync: updateClient, isPending: isUpdatingGame } =
    useUpdateClient();

  //UPDATE action
  const handleSaveClient: MRT_TableOptions<Client>["onEditingRowSave"] =
    async ({ values, table }) => {
      updateClient(values);
      table.setEditingRow(null);
    };

  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: true,
    editDisplayMode: "row",
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onEditingRowSave: handleSaveClient,
    renderRowActions: ({ row, table }) => (
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
    ),
  });

  return (
    <React.Fragment>
      {/* {data.length == 0 && <Alert severity="error">Error loading data</Alert>} */}
      <MaterialReactTable table={table} />
    </React.Fragment>
  );
};

export default ClientsTable;
