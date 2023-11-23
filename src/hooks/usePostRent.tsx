import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Rental } from "@/types/Rental";
import dayjs from "dayjs";

type NewRental = {
  client: {
    first_name: string;
    last_name: string;
    identification_type: string;
    identification_number: string;
    phone: string;
    email: string;
    birth_date: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  games: Array<number>;
  rental_date: Date;
  rental_deadline: Date;
  price: number;
};

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/create_rental/"; // Ajustar la ruta de la API para crear rentas

function useCreateRental() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (rental: NewRental) => {
      // console.log(rental);
      // Enviar la solicitud de actualización de la API aquí
      await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rental),
      });
      // console.log("renta creada", rental);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["rentals"] }), // Volver a cargar las rentas después de la mutación
  });
}

export default useCreateRental;
