import React, { useState } from "react";
import CartDetails from "@/components/RentPage/CartDetails";
import ClientForm from "@/components/RentPage/ClientForm";
import { Box, Grid, Button } from "@mui/material";
import { Game } from "@/types/Game";
import usePostRent from "@/hooks/usePostRent";
import dayjs from "dayjs";
import validator from "@/components/RentPage/utils/validateClientForm";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from 'next/navigation'


type RentInfoProps = {
  cartItems: Game[];
};

const RentInfo = React.memo(({ cartItems }: RentInfoProps) => {
  const {
    mutateAsync: postRent,
    isPending: isPostingRent,
    isError: isPostRentError,
    status: postRentStatus,
    error: postRentError,
    data: postRentData, // Accede a la respuesta del servidor
  } = usePostRent();

  const [clientInfo, setClientInfo] = useState({
    first_name: "",
    last_name: "",
    identification_type: "",
    identification_number: "",
    phone: "",
    email: "",
    birth_date: dayjs(),
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [total, setTotal] = useState(0);
  const [deadline, setDeadline] = useState(dayjs()); // Declare the 'deadline' variable

  const { validate, errors } = validator({ clientInfo });
  const router = useRouter();

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const response = await postRent({
        client: {
          ...clientInfo,
          birth_date: clientInfo.birth_date.format("YYYY-MM-DD"),
        },
        games: cartItems.map((cartItem) => cartItem.id),
        rental_date: new Date(),
        rental_deadline: deadline.toDate(),
        price: total,
      });

      if (response) {
        // To get the last item of the array, I use the length of the array minus one
        console.log("Rent created:", response.client.rental_ids.length - 1);
        const rent_id = response.client.id;
        console.log(rent_id);
        //I want to send the data to the next page
        router.push(`/rent/purchase_proof?rentId=${rent_id}`)
      } else {
        // La respuesta indica un error
        alert("Error creating rent. Please try again.");
      }
    } catch (error) {
      // Error de red u otro error
      console.error("Error creating rent:", error);
      alert(
        "Error creating rent. Check your internet connection and try again."
      );
    }
  };

  return (
    <Grid container spacing={2} direction="column" justifyContent="center">
      <Grid item xs={12}>
        <CartDetails
          cartItems={cartItems}
          total={total}
          setTotal={setTotal}
          deadline={deadline}
          setDeadline={setDeadline}
        />
      </Grid>
      <Grid item xs={12}>
        <ClientForm
          clientInfo={clientInfo}
          setClientInfo={setClientInfo}
          errors={errors}
        />
      </Grid>
      <Box sx={{ my: 2 }} />
      <Grid item xs={12}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleSubmit}
          disabled={isPostingRent}
          fullWidth
        >
          Rent Games
        </Button>
      </Grid>
    </Grid>
  );
});

RentInfo.displayName = "RentInfo";
export default RentInfo;
