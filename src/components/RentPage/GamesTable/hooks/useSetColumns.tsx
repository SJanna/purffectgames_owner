import { useMemo, useState } from "react";
import { Game } from "@/types/Game";
import { Box, Tooltip, Typography } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import Image from "next/image";
// import { platforms } from "@/data/platforms";
// import { genres } from "@/data/genres";

type columnsProps = {
  validationErrors: Record<string, string | undefined>;
  setValidationErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
};

const useSetColumns = ({
  validationErrors,
  setValidationErrors,
}: columnsProps) => {
  const Columns = useMemo<MRT_ColumnDef<Game>[]>(
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
        filterVariant: "autocomplete",
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Tooltip title={row.original.title} placement="top">
              <Image
                src={row.original?.image || "/static/images/placeholder.png"}
                alt={row.original?.title || "placeholder"}
                width={40}
                height={40}
                style={{
                  marginRight: 10,
                  borderRadius: 5,
                  objectFit: "cover",
                }}
                placeholder="blur"
                blurDataURL="/static/images/placeholder.png"
              />
            </Tooltip>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <Typography variant="body2">{row.original.title}</Typography>
            </Box>
          </Box>
        ),
      },
      {
        header: "Genre",
        accessorKey: "genre",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.genre,
          helperText: validationErrors?.genre,
          variant: "outlined",
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              genre: undefined,
            }),
        },
        columnFilterModeOptions: ["fuzzy"],
        filterVariant: "multi-select",
        // filterSelectOptions: genres.map((genre) => ({
        //   value: genre,
        //   label: genre,
        // })),
      },
      {
        header: "Price",
        accessorKey: "price",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.price,
          helperText: validationErrors?.price,
          variant: "outlined",
        },
        filterVariant: "range",
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            ${renderedCellValue}.00
          </Box>
        ),
      },
      {
        header: "Stock",
        accessorKey: "stock",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.stock,
          helperText: validationErrors?.stock,
          variant: "outlined",
        },
        filterVariant: "range",
      },
      {
        header: "Rented times",
        accessorKey: "rented_times",
        muiEditTextFieldProps: {
          variant: "outlined",
          disabled: true,
        },
        filterVariant: "range",
      },
      {
        header: "Image Url",
        enableClickToCopy: true,
        maxSize: 250,
        accessorKey: "image",
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
        // accessorFn: (originalRow) => new Date(originalRow.release_date),
        header: "release Date",
        accessorKey: "release_date",
        maxSize: 100,
        filterVariant: "date-range",
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
          type: "date",
        },
        // Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
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
        filterVariant: "autocomplete",
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
        filterVariant: "autocomplete",
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
        filterVariant: "autocomplete",
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

        // filterSelectOptions: platforms.map((platform) => ({
        //   value: platform,
        //   label: platform,
        // })),
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
        filterVariant: "range",
      },
    ],
    [validationErrors, setValidationErrors]
  );

  return Columns;
};

export default useSetColumns;
