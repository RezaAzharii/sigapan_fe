import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../services/api";

export function useGrafikBapok(idBahanPokok, startDate, endDate) {
	return useQuery({
		queryKey: ["grafik-bapok", idBahanPokok, startDate, endDate],
		queryFn: () =>
			fetchApi(
				`bahan-pokok/grafik/${idBahanPokok}?start_date=${startDate}&end_date=${endDate}`
			),
		enabled: !!idBahanPokok,
		select: (data) => data,
	});
}
