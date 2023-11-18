import { Game } from "@/types/Game";
import {
  Modal,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Stack,
  CardActions,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

type GameCardDetailsProps = {
  open: boolean;
  handleClose: () => void;
  game: Game;
};

function GameCardDetails({ open, handleClose, game }: GameCardDetailsProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={`${game.title} Details`}
      aria-describedby={`Details of ${game.title} game`}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={game.img}
          alt={game.title}
        />
        <CardContent sx={{ justifyContent: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            {game.title}
          </Typography>
          <Grid container spacing={1}>
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
                {game.releaseDate}
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
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-evenly" }}>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              size="small"
              endIcon={<AddShoppingCartIcon />}
            >
              Add
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Modal>
  );
}

export default GameCardDetails;
