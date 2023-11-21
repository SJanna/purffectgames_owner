"use client";
import { Client } from "@/types/Client";
import React, { useEffect, useState } from "react";

// un numero entre 1 y 50
const id = Math.floor(Math.random() * 20) + 1;

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/clients/" + id + "/";

export const getUser = async () => {
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

export const useGetClient = () => {
  const [user, setUser] = useState<Client>();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await getUser();
        setUser(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, []);

  return user;
};
