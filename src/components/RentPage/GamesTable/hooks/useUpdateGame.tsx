import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game } from "@/types/Game";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/games/";

function useUpdateGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (game: Game) => {
      // console.log(game);
      //send api update request here
      await fetch(`${apiUrl+game.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      });
    },
    //client side optimistic update
    onMutate: (newGameInfo: Game) => {
      // console.log("onMutate", newGameInfo);
      queryClient.setQueryData(["games"], (prevGames: any) =>
        prevGames?.map((prevGame: Game) =>
          prevGame.id === newGameInfo.id ? newGameInfo : prevGame
        )
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["games"] }), //refetch users after mutation, disabled for demo
  });
}

export default useUpdateGame;