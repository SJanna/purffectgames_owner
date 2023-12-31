import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game } from "@/types/Game";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/games/"

function useCreateGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (game: Game) => {
      // console.log(game);
      //send api update request here
      await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["games"] }), //refetch users after mutation, disabled for demo
  });
}

export default useCreateGame;