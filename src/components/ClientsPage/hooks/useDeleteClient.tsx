import { Client } from "@/types/Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/clients/";

//DELETE hook (delete user in api)
export default function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (clinetId: number) => {
      //send api update request here
      const response = await fetch(`${apiUrl + clinetId}/`, {
        method: 'DELETE',
      });
    },
    //client side optimistic update
    onMutate: (clinetId: number) => {
      queryClient.setQueryData(
        ['clinets'],
        (prevUsers: any) =>
          prevUsers?.filter((client: Client) => client.id !== clinetId),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  });
}