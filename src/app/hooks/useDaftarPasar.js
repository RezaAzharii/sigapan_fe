import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../services/api";

export const useDaftarPasar = () => {
	return useQuery({
		queryKey: ["pasar"],
		queryFn: () => fetchApi("pasar"),
	});
};
