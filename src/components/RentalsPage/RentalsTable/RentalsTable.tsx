"use client";
import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useGetRentals } from "@/hooks/useGetRentals";
import { Chip } from "@mui/material";
import { Rental } from "@/types/Rental";
import React from "react";
import GameCardDetails from "@/components/GameCard/GameCardDetails";
import { Game } from "@/types/Game";

const RentalsTable = () => {
  const data = useGetRentals();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [game, setGame] = useState<Game>({} as Game);
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Rental>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "client",
        header: "Client ID",
      },
      {
        header: "Rent Date",
        accessorKey: "rental_date",
        size: 10,
        // Chage the format of the date
        Cell: ({ row }) => {
          return new Date(row.original.rental_date).toLocaleDateString();
        },
      },
      {
        header: "Return Date",
        accessorKey: "rental_deadline",
        size: 10,
        // Chage the format of the date
        Cell: ({ row }) => {
          return new Date(row.original.rental_deadline).toLocaleDateString();
        },
      },
      {
        header: "Total",
        accessorKey: "price",
        size: 10,
        Cell: ({ row }) => {
          return "$" + row.original.price + ".00";
        },
      },
      {
        accessorKey: "games",
        header: "Games",
        Cell: ({ row }) => {
          return row.original.games.map((game) => {
            return (
              <React.Fragment key={game.id}>
                <Chip
                  key={game.id}
                  label={game.title}
                  variant="outlined"
                  sx={{ m: 0.5 }}
                  onClick={() => {
                    setGame(game);
                    handleOpen();
                  }}
                />
              </React.Fragment>
            );
          });
        },
      },
      {
        header: "Active",
        size: 10,
        Cell: ({ row }) => {
          const today = new Date();
          const deadline = new Date(row.original.rental_deadline);
          return (
            <Chip
              label={today < deadline ? "On Time" : "Late"}
              color={today < deadline ? "success" : "error"}
              variant="filled"
              sx={{ m: 0.5 }}
            />
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  return (
    <React.Fragment>
      <MaterialReactTable table={table} />
      <GameCardDetails open={open} handleClose={handleClose} game={game} />
    </React.Fragment>
  );
};

export default RentalsTable;
