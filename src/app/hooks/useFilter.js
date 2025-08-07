import { useState, useMemo } from "react";

export const useFilter = (summarizedData, detailedTableData, showTableView) => {
	const [activeCategory, setActiveCategory] = useState("Semua");
	const [priceFilter, setPriceFilter] = useState("");
	const [marketFilter, setMarketFilter] = useState("");

	const filteredData = useMemo(() => {
		const dataToFilter = showTableView ? detailedTableData : summarizedData;

		return dataToFilter.filter((item) => {
			const matchCategory =
				activeCategory === "Semua" || item.name === activeCategory;

			const matchPrice =
				!priceFilter ||
				(priceFilter === "Harga Naik" && item.change_status === "up") ||
				(priceFilter === "Harga Turun" && item.change_status === "down") ||
				(priceFilter === "Harga Tetap" && item.change_status === "same");

			const matchMarket = !marketFilter || item.marketName === marketFilter;

			if (showTableView) {
				return matchCategory && matchMarket;
			} else {
				return matchCategory && matchPrice;
			}
		});
	}, [
		activeCategory,
		priceFilter,
		marketFilter,
		showTableView,
		summarizedData,
		detailedTableData,
	]);

	return {
		activeCategory,
		priceFilter,
		marketFilter,
		filteredData,
		setActiveCategory,
		setPriceFilter,
		setMarketFilter,
	};
};
