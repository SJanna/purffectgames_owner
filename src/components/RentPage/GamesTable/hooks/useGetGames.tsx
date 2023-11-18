import { useQuery } from "@tanstack/react-query";
import { Game } from "@/types/Game";

function useGetGames() {
  return useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: async () => {
      //send api request here
      const response = await fetch("http://localhost:8000/api/games/");
      const json = (await response.json()) as Game[];
      return json;
    },
    refetchOnWindowFocus: false,
  });
}

export default useGetGames;