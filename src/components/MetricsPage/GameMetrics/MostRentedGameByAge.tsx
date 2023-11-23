import React from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { Game } from "@/types/Game";
import GameCardDetail from "@/components/GameCard/GameCardDetail";

type AgeRange = {
  age_range: {
    min_age: number | string;
    max_age: number | string;
  };
};

const apiUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL + "/api/most_rented_game_by_age/";
export default function MostRentedGameByAge() {
  const [ageRange, setAgeRange] = React.useState<AgeRange>({
    age_range: {
      min_age: "",
      max_age: "",
    },
  });

  const [mostRentedGameByAge, setMostRentedGameByAge] = React.useState<Game>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const getMostRentedGameByAge = async (ageRange: AgeRange) => {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ageRange),
        });

        if (!response.ok) {
          throw new Error(
            `Error al realizar la solicitud: ${response.statusText}`
          );
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    const fetchDataAsync = async () => {
      try {
        const result = await getMostRentedGameByAge(ageRange);
        setMostRentedGameByAge(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        textAlign="center"
      >
        <Grid item xs={3} sm={2}>
          <Box sx={{ mt: 5 }} />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="min_age"
                  name="min_age"
                  label="Min Age"
                  fullWidth
                  value={ageRange.age_range.min_age || ""}
                  onChange={(e) => {
                    const value = e.target.value.trim();
                    setAgeRange({
                      ...ageRange,
                      age_range: {
                        ...ageRange.age_range,
                        min_age: value === "" ? "" : parseInt(value, 10),
                      },
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="max_age"
                  name="max_age"
                  label="Max Age"
                  fullWidth
                  value={ageRange.age_range.max_age || ""}
                  onChange={(e) => {
                    const value = e.target.value.trim();
                    setAgeRange({
                      ...ageRange,
                      age_range: {
                        ...ageRange.age_range,
                        max_age: value === "" ? "" : parseInt(value, 10),
                      },
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ height: 10 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Show
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={9} sm={10} sx={{ boxShadow: 30 }}>
          {mostRentedGameByAge?.id ? (
            <React.Fragment>
              <GameCardDetail game={mostRentedGameByAge} />
            </React.Fragment>
          ) : ageRange.age_range.min_age && ageRange.age_range.max_age ? (
            mostRentedGameByAge ? (
              <Typography variant="h6">No game found</Typography>
            ) : (
              <Typography variant="h6">Press show to see the game</Typography>
            )
          ) : (
            <Typography variant="h6">Select a range of ages</Typography>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
