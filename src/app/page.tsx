import React from "react";
import LinkCard from "@/components/HomePage/LinkCard";
import WelcomeMessage from "@/components/HomePage/WelcomeMessage";
import { Grid, Box } from "@mui/material";

const linkCards = [
  {
    title: "Profile",
    image: "https://source.unsplash.com/random?cat videogames profile",
    link: "/profile",
  },
  {
    title: "Rent",
    image: "https://source.unsplash.com/random?cat videogames rent",
    link: "/rent",
  },
  {
    title: "Clients",
    image: "https://source.unsplash.com/random?cat videogames clients",
    link: "/clients",
  },
  {
    title: "Metrics",
    image: "https://source.unsplash.com/random?cat videogames metrics",
    link: "/metrics",
  },
];

export default function Home() {
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      alignItems="center"
      textAlign={"center"}
    >
      <Grid item xs={12} sm={12} md={3} lg={3}>
        <WelcomeMessage />
        <Box sx={{ my: 5 }} />
      </Grid>

      <Grid item xs={12} sm={12} md={9} lg={9}>
        <Grid container spacing={2} direction="row" justifyContent="center">
          {linkCards.map((linkCard, index) => (
            <Grid item xs={12} sm={8} md={6} lg={6} key={index}>
              <LinkCard {...linkCard} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
