import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Client } from "@/types/Client";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/clients/";

function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (client: Client) => {
      // console.log(client);
      //send api update request here
      await fetch(`${apiUrl+client.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });
    },
    //client side optimistic update
    onMutate: (newClientInfo: Client) => {
      // console.log("onMutate", newClientInfo);
      queryClient.setQueryData(["clients"], (prevClients: any) =>
        prevClients?.map((prevClient: Client) =>
          prevClient.id === newClientInfo.id ? newClientInfo : prevClient
        )
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["clients"] }), //refetch users after mutation, disabled for demo
  });
}

export default useUpdateClient;