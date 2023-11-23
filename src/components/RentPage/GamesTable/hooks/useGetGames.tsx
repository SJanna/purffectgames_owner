import { useQuery } from "@tanstack/react-query";
import { Game } from "@/types/Game";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/games/"

function useGetGames() {
  return useQuery<Game[], Error>({
    queryKey: ["games"],
    queryFn: async () => {
      const response = await fetch(apiUrl);
      const json = (await response.json()) as Game[];
      return json;
    },
  });
}

export default useGetGames;