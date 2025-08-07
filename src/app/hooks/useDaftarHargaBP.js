import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../services/api";

export const useDaftarHargaBP = () => {
	return useQuery({
		queryKey: ["bahan-pokoks"],
		queryFn: () => fetchApi("bahan-pokoks"),
	});
};
