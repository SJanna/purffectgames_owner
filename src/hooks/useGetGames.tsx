import { Game } from "@/types/Game";
import React, { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/games/";

export const getGames = async () => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error al realizar la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const useGetGames = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await getGames();
        setGames(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, []);

  return games;
};
