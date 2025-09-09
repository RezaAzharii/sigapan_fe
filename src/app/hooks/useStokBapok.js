import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../services/api";

export const useStokBapok = (enabled) => {
	return useQuery({
		queryKey: ["harga-bapok-stok"],
		queryFn: () => fetchApi("harga-bapok-stok"),
		enabled,
		staleTime: 1000 * 60,
	});
};
