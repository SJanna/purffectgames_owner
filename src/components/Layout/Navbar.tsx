import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  ButtonGroup,
  Button,
  Grid,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import Image from "next/image";

const LogoName = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Link href="/">
        <Image
          alt="Logo"
          src="/static/images/PurrfectGamesAdim_Logo.png"
          width={50}
          height={50}
          priority={true}
          placeholder="blur"
          blurDataURL="/static/images/placeholder.png"
        />
      </Link>
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ color: "primary.contrastText" }}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          &nbsp;Purrfect Games

        </Typography>
      </Link>
    </Box>
  );
};

const NavbarIcons = () => {
  return (
    <Link href="/profile">
      <IconButton aria-label="Profile" sx={{ color: "white" }}>
        <AccountCircle fontSize="large" />
      </IconButton>
    </Link>
  );
};

const NavbarButtons = () => {
  return (
    <ButtonGroup variant="text" color="inherit">
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
      <Button>Home</Button>
      </Link>
      <Link href="/rent" style={{ textDecoration: "none", color: "inherit" }}>
      <Button>Rent</Button>
      </Link>
      <Link href="/clients" style={{ textDecoration: "none", color: "inherit" }}>
      <Button>Clients</Button>
      </Link>
      <Link href="/rentals" style={{ textDecoration: "none", color: "inherit" }}>
      <Button>Rentals</Button>
      </Link>
      <Link href="/metrics" style={{ textDecoration: "none", color: "inherit" }}>
      <Button>Metrics</Button>
      </Link>
    </ButtonGroup>
  );
};

function Navbar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar>
        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid item xs={3} sm={3} md={4} lg={4} textAlign={"left"}>
            <LogoName />
          </Grid>
          <Grid item xs={5} sm={5} md={4} lg={4} textAlign={"center"}>
            <NavbarButtons />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} textAlign={"right"}>
            <NavbarIcons />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
