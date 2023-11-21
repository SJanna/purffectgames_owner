"use client";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Client } from "@/types/Client";
import { useGetClients } from "@/hooks/useGetClients";
import { Chip } from "@mui/material";

const ClientsTable = () => {
  const data = useGetClients();
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Client>[]>(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "ID",
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

  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: true,
    editDisplayMode: 'row',
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    muiToolbarAlertBannerProps: data?.length === 0 
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default ClientsTable;
