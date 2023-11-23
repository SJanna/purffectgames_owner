import React, { useState } from "react";
import CartDetails from "@/components/RentPage/CartDetails";
import ClientForm from "@/components/RentPage/ClientForm";
import { Box, Grid, Button } from "@mui/material";
import { Game } from "@/types/Game";
import usePostRent from "@/hooks/usePostRent";
import { Client } from "@/types/Client";
import dayjs from "dayjs";

type RentInfoProps = {
  cartItems: Game[];
};

const RentInfo = React.memo(({ cartItems }: RentInfoProps) => {
  const { mutateAsync: postRent, isPending: isPostingRent } = usePostRent();
  // console.log(cartItems);
  const [clientInfo, setClientInfo] = useState({
    first_name: "",
    last_name: "",
    identification_type: "",
    identification_number: "",
    phone: "",
    email: "",
    birth_date:  dayjs(),
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [total, setTotal] = useState(0);
  const [deadline, setDeadline] = useState(dayjs()); // Declare the 'deadline' variable

  const handleCreateRent = async () => {
    await postRent({
      client: {
        ...clientInfo,//Convert into DateField Django format
        birth_date: clientInfo.birth_date.format("YYYY-MM-DD"),
      },
      games: cartItems.map((cartItem) => cartItem.id),
      rental_date: new Date(),
      rental_deadline: deadline.toDate(),
      price: total,
    });
  };
  return (
    <Grid container spacing={2} direction="column" justifyContent="center">
      <Grid item xs={12}>
        <CartDetails cartItems={cartItems} total={total} setTotal={setTotal} deadline={deadline} setDeadline={setDeadline} />
      </Grid>
      <Grid item xs={12}>
        <ClientForm clientInfo={clientInfo} setClientInfo={setClientInfo} />
      </Grid>
      <Box sx={{ my: 2 }} />
      <Grid item xs={12}>
        <Button variant="contained" size="large" color="primary" onClick={handleCreateRent} disabled={isPostingRent} fullWidth>
          Rent Games
        </Button>
      </Grid>
    </Grid>
  );
});

RentInfo.displayName = "RentInfo";
export default RentInfo;
