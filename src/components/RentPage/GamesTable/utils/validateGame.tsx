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
  if (!game.release_date) {
    errors.year = "Year is required";
  } else if (isNaN(Date.parse(game.release_date))) {
    errors.year = "Year must be a valid date";
  }
  if (!game.popularity) {
    errors.popularity = "Popularity is required";
  }
  if (!game.image) {
    errors.image = "Image is required";
  }
  if (!game.price) {
    errors.price = "Price is required";
  } else if (isNaN(game.price)) {
    errors.price = "Price must be a number";
  }
  if (!game.stock) {
    errors.stock = "Stock is required";
  } else if (isNaN(game.stock)) {
    errors.stock = "Stock must be a number";
  }
  return errors;
}


