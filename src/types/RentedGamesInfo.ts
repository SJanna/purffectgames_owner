import { Game } from "@/types/Game";

export type RentedGamesInfo = {
  game: Game;
  rentDate: String;
  returnDate: String;
  active: boolean;
};