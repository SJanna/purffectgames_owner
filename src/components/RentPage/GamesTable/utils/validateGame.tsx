import { Game } from "@/types/Game";


export function validateGame(game: Game) {
  const errors: { [key: string]: string } = {};

  if (!game.id) {
    errors.id = "ID is required";
  }
  if (!game.title) {
    errors.name = "Name is required";
  }
  if (!game.platform) {
    errors.platform = "Platform is required";
  }
  if (!game.genre) {
    errors.genre = "Genre is required";
  }
  if (!game.director) {
    errors.director = "Director is required";
  }
  if (!game.protagonist) {
    errors.protagonist = "Protagonist is required";
  }
  if (!game.productor) {
    errors.productor = "Productor is required";
  }
  if (!game.releaseDate) {
    errors.year = "Year is required";
  } else if (isNaN(Date.parse(game.releaseDate))) {
    errors.year = "Year must be a valid date";
  }
  if (!game.popularity) {
    errors.popularity = "Popularity is required";
  }
  if (!game.img) {
    errors.image = "Image is required";
  }
  if (!game.price) {
    errors.price = "Price is required";
  }

  return errors;
}


