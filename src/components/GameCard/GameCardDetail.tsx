import { Game } from "@/types/Game";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  CardActionArea,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import Image from "next/image";
type GameCardDetailsProps = {
  game: Game;
};

const GameCardDetail = React.memo(({game}: GameCardDetailsProps) => {
  return (
    <Card>
      <CardActionArea sx={{ height: 150 }}>
        <Image
          src={game.image}
          alt={game.title}
          fill={true}
          style={{ objectFit: "cover" }}
          placeholder="blur"
          blurDataURL="/static/images/placeholder.png"
        />
      </CardActionArea>
      <CardContent sx={{ justifyContent: "center"}}>
        <Typography gutterBottom variant="h5" component="div" textAlign="left" >
          {game.title}
        </Typography>
        <Grid container spacing={1} justifyContent="center" textAlign="left">
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Platform:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {game.platform}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Genre:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {game.genre}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Director:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {game.director}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Protagonist:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {game.protagonist}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Productor:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {game.productor}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Release date:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {game.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Popularity:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                {game.popularity}
              </Typography>
              <StarIcon fontSize="small" color="warning" />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Price:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              ${game.price}.00
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Stock:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {game.stock}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});

export default GameCardDetail;