import { useMemo, useState } from "react";
import { Game } from "@/types/Game";
import { Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";

type columnsProps = {
  validationErrors: Record<string, string | undefined>;
  setValidationErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
};

const setColumns = ({
  validationErrors,
  setValidationErrors,
}: columnsProps) => {
  const columns = useMemo<MRT_ColumnDef<Game>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        size: 100,
        enableEditing: false,
        muiEditTextFieldProps: {
          variant: "outlined",
          disabled: true,
        },
      },
      {
        header: "Title",
        accessorKey: "title",
        maxSize: 250,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          variant: "outlined",
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <img alt={row.original.title} height={60} src={row.original.img} />
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        header:"Price",
        accessorKey:"price",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.price,
          helperText: validationErrors?.price,
          variant: "outlined",
        },
      },
      {
        header: "Image Url",
        enableClickToCopy: true,
        maxSize: 250,
        accessorKey: "img",
        enableGlobalFilter: false,
        enableColumnActions: false,
        enableSorting: false,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.image,
          helperText: validationErrors?.image,
          variant: "outlined",
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              image: undefined,
            }),
          type: "url",
        },
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {renderedCellValue}
          </Box>
        ),
      },
      {
        header: "release Date",
        accessorKey: "releaseDate",
        maxSize: 100,
        filterVariant: "range",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.year,
          helperText: validationErrors?.year,
          variant: "outlined",
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              year: undefined,
            }),
          type: "number",
        },
      },
      {
        header: "Protagonist",
        accessorKey: "protagonist",
        maxSize: 150,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.protagonist,
          helperText: validationErrors?.protagonist,
          variant: "outlined",
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              protagonist: undefined,
            }),
        },
      },
      {
        header: "Director",
        accessorKey: "director",
        maxSize: 200,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.director,
          helperText: validationErrors?.director,
          variant: "outlined",
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              director: undefined,
            }),
        },
      },
      {
        header: "Productor",
        accessorKey: "productor",
        maxSize: 200,
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.productor,
          helperText: validationErrors?.productor,
          variant: "outlined",
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              productor: undefined,
            }),
        },
      },
      {
        header: "Platform",
        maxSize: 250,
        accessorKey: "platform",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.platform,
          helperText: validationErrors?.platform,
          variant: "outlined",
        },
        columnFilterModeOptions: ["fuzzy"],
        filterVariant: "multi-select",
        filterSelectOptions: [
          { value: "PlayStation 4 | PS4", label: "PS4" },
          { value: "PS5", label: "PS5" },
          { value: "Xbox One", label: "XBOX" },
          {
            value: "PC",
            label: "PC",
          },
          { value: "NINTENDO", label: "NINTENDO" },
        ],
      },
      {
        header: "Popularity",
        accessorKey: "popularity",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.popularity,
          helperText: validationErrors?.popularity,
          variant: "outlined",
        },
      }
    ],
    [validationErrors]
  );

  return columns;
};

export default setColumns;
