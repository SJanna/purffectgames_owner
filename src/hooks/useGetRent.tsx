import { Rental } from "@/types/Rental";
import React, { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/rentals/";

export const getRent = async (rentId:number) => {
  try {
    const response = await fetch(`${apiUrl+rentId}/`);

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

export const useGetRent = (rentId:number) => {
  const [rentals, setRentals] = useState<Rental>();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await getRent(rentId);
        setRentals(result);
        // console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [rentId]);

  return rentals;
};
