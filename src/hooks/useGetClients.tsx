import { Client } from "@/types/Client";
import React, { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/clients/";

export const getClients = async () => {
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

export const useGetClients = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await getClients();
        setClients(result);
        // console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, []);

  return clients;
};
