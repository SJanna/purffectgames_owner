import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game } from "@/types/Game";

function useCreateGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (game: Game) => {
      console.log(game);
      //send api update request here
      await fetch("http://localhost:8000/api/games/", {
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