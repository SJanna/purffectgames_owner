import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type ClientFormProps = {
  clientInfo: {
    first_name: string;
    last_name: string;
    identification_type: string;
    identification_number: string;
    phone: string;
    email: string;
    birth_date: dayjs.Dayjs;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  setClientInfo: React.Dispatch<
    React.SetStateAction<{
      first_name: string;
      last_name: string;
      identification_type: string;
      identification_number: string;
      phone: string;
      email: string;
      birth_date: dayjs.Dayjs;
      address: string;
      city: string;
      state: string;
      zip: string;
    }>
  >;
  errors: {
    first_name: string;
    last_name: string;
    identification_type: string;
    identification_number: string;
    phone: string;
    email: string;
    birth_date: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
};

const ClientForm = React.memo(
  ({ clientInfo, setClientInfo, errors }: ClientFormProps) => {
    

    return (
      <Box sx={{ bgcolor: "background.paper" }}>
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
              value={clientInfo.email}
              onChange={(e) =>
                setClientInfo({ ...clientInfo, email: e.target.value })
              }
              error={errors.email ? true : false}
              helperText={errors.email}
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
              value={clientInfo.first_name}
              onChange={(e) =>
                setClientInfo({ ...clientInfo, first_name: e.target.value })
              }
              error={errors.first_name ? true : false}
              helperText={errors.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              variant="outlined"
              size="small"
              value={clientInfo.last_name}
              onChange={(e) =>
                setClientInfo({ ...clientInfo, last_name: e.target.value })
              }
              error={errors.last_name ? true : false}
              helperText={errors.last_name}
            />
          </Grid>
        </Grid>
        <Box sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8} lg={8}>
            <TextField
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              variant="outlined"
              size="small"
              value={clientInfo.phone}
              onChange={(e) =>
                setClientInfo({ ...clientInfo, phone: e.target.value })
              }
              error={errors.phone ? true : false}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={2} lg={4}>
            <DatePicker
              label="Birth Date"
              value={clientInfo.birth_date}
              slotProps={{
                textField: {
                  size: "small",
                  variant: "standard",
                  error: errors.birth_date ? true : false,
                },
              }}
              onChange={(newValue) => {
                if (newValue) {
                  setClientInfo({ ...clientInfo, birth_date: newValue });
                }
              }}
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
              value={clientInfo.identification_type}
              onChange={(e) =>
                setClientInfo({
                  ...clientInfo,
                  identification_type: e.target.value,
                })
              }
              error={errors.identification_type ? true : false}
            >
              <MenuItem key="Passport" value="Passport">
                Passport
              </MenuItem>
              <MenuItem key="DNI" value="DNI">
                Driver License
              </MenuItem>
              <MenuItem key="NEI" value="NEI">
                State ID
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={9}>
            <TextField
              fullWidth
              id="idNumber"
              label="ID Number"
              variant="outlined"
              size="small"
              value={clientInfo.identification_number}
              onChange={(e) =>
                setClientInfo({
                  ...clientInfo,
                  identification_number: e.target.value,
                })
              }
              error={errors.identification_number ? true : false}
              helperText={errors.identification_number}
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
              value={clientInfo.address}
              onChange={(e) =>
                setClientInfo({ ...clientInfo, address: e.target.value })
              }
              error={errors.address ? true : false}
              helperText={errors.address}
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
              value={clientInfo.city}
              onChange={(e) =>
                setClientInfo({ ...clientInfo, city: e.target.value })
              }
              error={errors.city ? true : false}
              helperText={errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <TextField
              fullWidth
              id="state"
              label="State"
              variant="outlined"
              size="small"
              value={clientInfo.state}
              onChange={(e) =>
                setClientInfo({ ...clientInfo, state: e.target.value })
              }
              error={errors.state ? true : false}
              helperText={errors.state}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <TextField
              fullWidth
              id="zip"
              label="Zip"
              variant="outlined"
              size="small"
              value={clientInfo.zip}
              onChange={(e) =>
                setClientInfo({ ...clientInfo, zip: e.target.value })
              }
              error={errors.zip ? true : false}
              helperText={errors.zip}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
);

ClientForm.displayName = "ClientForm";
export default ClientForm;
