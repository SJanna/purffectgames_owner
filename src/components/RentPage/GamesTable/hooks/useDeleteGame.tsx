import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game } from "@/types/Game";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/games/"

function useDeleteGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (gameId: number) => {
      //send api update request here
      await fetch(`${apiUrl+gameId}/`, {
        method: "DELETE",
      });
    },
    //client side optimistic update
    onMutate: (gameId: number) => {
      queryClient.setQueryData(["games"], (prevGames: any) =>
        prevGames?.filter((game: Game) => game.id !== gameId)
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["games"] }), //refetch users after mutation, disabled for demo
  });
}

export default useDeleteGame;