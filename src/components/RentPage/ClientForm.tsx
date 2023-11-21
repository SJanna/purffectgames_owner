import React from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";

const ClientForm = React.memo(()=> {
  return (
    <Box sx={{ bgcolor: "background.paper"}}>
      <Box sx={{ my: 2 }}>
        <Grid container spacing={2} direction="row" alignItems="baseline">
          <Grid item xs={12}>
            <Typography variant="h5">Customer Information</Typography>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 2, bgcolor: "background.paper", height: "2px" }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            fullWidth
            id="firstName"
            label="First Name"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            fullWidth
            id="lastName"
            label="Last Name"
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
      <Box sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
      <Box sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Select
            fullWidth
            id="idType"
            label="ID Type"
            variant="outlined"
            size="small"
            value="stateId"
          > 
            <MenuItem key='passport' value="passport">Passport</MenuItem>
            <MenuItem key='driversLicense' value="driversLicense">Driver License</MenuItem>
            <MenuItem key='stateId' value="stateId">State ID</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={7} md={7} lg={7}>
          <TextField
            fullWidth
            id="idNumber"
            label="ID Number"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={2} md={2} lg={2}>
          <TextField
            fullWidth
            id="age"
            label="Age"
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 2, bgcolor: "background.paper", height: "2px" }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <TextField
            fullWidth
            id="address"
            label="Address"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <TextField
            fullWidth
            id="apt"
            label="Apt (optional)"
            variant="outlined"
            size="small"
            helperText="Apt, suite, etc."
          />
        </Grid>
      </Grid>
      <Box sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            fullWidth
            id="city"
            label="City"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <TextField
            fullWidth
            id="state"
            label="State"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <TextField
            fullWidth
            id="zip"
            label="Zip"
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
    </Box>
  );
});

ClientForm.displayName = "ClientForm";
export default ClientForm;
