import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../services/api";

export const useStokBapok = () => {
	return useQuery({
		queryKey: ["harga-bapok"],
		queryFn: () => fetchApi("harga-bapok"),
	});
};
