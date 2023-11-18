import ProfileInfo from "@/components/ProfilePage/ProfileInfo";
import { Grid, Box } from "@mui/material";
import { userInfo } from "@/data/userInfo";

export default function profile() {
  return (
    <Grid container spacing={2} direction="row" justifyContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <ProfileInfo userInfo={userInfo} />
        <Box sx={{ my: 4 }} />
      </Grid>
    </Grid>
  );
}
