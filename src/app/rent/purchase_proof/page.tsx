"use client";
import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Button, Typography, Grid, Divider, Avatar } from "@mui/material";
import Image from "next/image";
import { useGetRent } from "@/hooks/useGetRent";
import { useGetClient } from "@/hooks/useGetClient";
import { Rental } from "@/types/Rental";

const PurchaseProof = () => {
  const searchParams = useSearchParams();
  const rentId = searchParams.get("rentId");
  const rent = rentId ? useGetRent(Number(rentId)) : null;

  const clientId = rent?.client;
  const client = useGetClient(clientId || 10);

  const handlePrint = () => {
    // Print only the element with id="purchase-proof" center the content and print it
    const printContents = document.getElementById("purchase-proof")?.innerHTML;
    const originalContents = document.body.innerHTML;
    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  };

  if (!rent || !client) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "2rem",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
          Purchase Proof
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
          No rent found
        </Typography>
      </Box>
    );
  }
  // Create a Beautifull  Receipt (purchase proof) using Material UI components;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "50%",
          padding: "2rem",
          border: "1px solid black",
          ":hover": {
            boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.5)",
          },
          borderRadius: "1rem",
        }}
        id="purchase-proof"
      >
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
              Purchase Proof - Rent #{rent.id}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Customer Information</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              {client.first_name} {client.last_name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{client.email}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2, height: "2px" }} />
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5">Rental Information</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Purchase Date: {rent.rental_date.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Rent Dateline: {rent.rental_deadline.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2, height: "2px" }} />
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5">Rented Games</Typography>
          </Grid>
          <Grid container spacing={2} direction="row" alignItems="center">
            {rent.games.map((game) => (
              <>
                <Grid item xs={5} justifyContent="right" display="flex">
                  <Avatar variant="rounded">
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill={true}
                      sizes="100%"
                    />
                  </Avatar>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1">{game.title}</Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </Grid>
        <Divider sx={{ my: 2, height: "2px" }} />
        <Grid container spacing={2} direction="row" textAlign="right">
          <Grid item xs={12}>
            <Typography variant="body1">
              Total: ${rent.price.toFixed(2)}
            </Typography>
          </Grid>
          <Box sx={{ my: 2 }} />
        </Grid>
      </Box>
      <Button
        variant="text"
        size="large"
        color="primary"
        onClick={handlePrint}
        sx={{ marginTop: "2rem", width: "50%" }}
      >
        Print
      </Button>
    </Box>
  );
};
export default PurchaseProof;
