import { Game } from "@/types/Game";
import { useEffect, useState } from "react";

type AgeRange = {
  min_age: number;
  max_age: number;
};

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/most_rented_game_by_age/"; 
//Get the api response and set the NEXT_PUBLIC_API_BASE_URL + "/api/most_rented_game_by_age/"; 
//Get the api response and set the state

export const getMostRentedGameByAge = async (ageRange: AgeRange) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ageRange),
    });

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

//Get the api response and set the state

export const useGetMostRentedGameByAge = (ageRange: AgeRange) => {
  const [mostRentedGameByAge, setMostRentedGameByAge] = useState<Game>();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await getMostRentedGameByAge(ageRange);
        setMostRentedGameByAge(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [ageRange]);

  return mostRentedGameByAge;
};