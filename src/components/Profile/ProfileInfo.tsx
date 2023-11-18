"use client";
import { UserInfo } from "@/types/UserInfo";
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
  userInfo: UserInfo;
};

export default function ProfileInfo({ userInfo }: ProfileInfoProps) {
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
          {/* If edit true change typograby for texfield */}
          {!edit ? (
            <Typography gutterBottom variant="h5" component="div">
              {userInfo.name}
            </Typography>
          ) : (
            <TextField
              id="name"
              label=""
              variant="standard"
              value={userInfo.name}
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
                value={userInfo.email}
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
                value={userInfo.phone}
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
                value={userInfo.address}
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
                value={userInfo.age}
                disabled={!edit}
              />
            </Grid>
          </Grid>
          {/* Edit button and save button (Disabled if edit = false) */}
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
