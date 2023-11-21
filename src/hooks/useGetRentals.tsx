import { Rental } from "@/types/Rental";
import React, { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/rentals/";

export const getRentals = async () => {
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

export const useGetRentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await getRentals();
        setRentals(result);
        // console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, []);

  return rentals;
};
