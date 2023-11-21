import { Game } from "@/types/Game";

export type Rental = {
  id: number;
  games: Game[];
  rental_date: Date;
  rental_deadline: Date;
  price: number;
  client: number;
};