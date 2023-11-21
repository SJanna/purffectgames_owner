import { Client } from "@/types/Client";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import React from "react";

type ProfileInfoProps = {
  client: Client;
};

export default function ProfileInfo({ client }: ProfileInfoProps) {
  const [edit, setEdit] = React.useState(false);

  return (
    <Box>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image="https://source.unsplash.com/random?cat landscape"
          alt="Profile Picture"
        />
        <CardContent sx={{ justifyContent: "center", textAlign:"center" }}>
          {!edit ? (
            <Typography gutterBottom variant="h5" component="div">
              {client.first_name} {client.last_name}
            </Typography>
          ) : (
            <TextField
              id="name"
              label=""
              variant="standard"
              value={client.first_name + " " + client.last_name}
            />
          )}
          <Box sx={{ my: 4 }} />
            {/* Center  */}
          <Grid container spacing={1} justifyContent="center" alignItems="center" textAlign="center">
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Email:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="email"
                label=""
                variant="standard"
                value={client.email}
                disabled={!edit}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Phone:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="phone"
                label=""
                variant="standard"
                value={client.phone}
                disabled={!edit}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Address:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="address"
                label=""
                variant="standard"
                value={client.address}
                disabled={!edit}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Age:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="age"
                label=""
                variant="standard"
                value={client.birth_date}
                disabled={!edit}
              />
            </Grid>
          </Grid>
          <Box sx={{ my: 4 }} />
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setEdit(!edit)}
              >
                {!edit ? "Edit" : "Save"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
