import { useState, useRef, useEffect, useMemo } from "react";
import { useDaftarHargaBP } from "../../hooks/useDaftarHargaBP";
import { useStokBapok } from "../../hooks/useStokBapok";
import { useFilter } from "../../hooks/useFilter";
import { usePagination } from "../../hooks/usePagination";
import {
	AlignLeft,
	ChevronDown,
	FolderOutput,
	Frown,
	LayoutGrid,
	LoaderCircle,
	Minus,
	TrendingDown,
	TrendingUp,
	Zap,
} from "lucide-react";
import ProductCard from "./BahanPokokCard";
import TabelBapok from "./TabelBapok";
import DetailModal from "./DetailModal";
import { useExportData } from "../../hooks/useExportData";

const getFilterStyle = (filter, isActive) => {
	const base = "border font-medium";
	if (!isActive)
		return `${base} border-gray-300 text-gray-600 hover:bg-gray-50`;

	switch (filter) {
		case "Harga Naik":
			return `${base} border-red-300 bg-red-100 text-red-700 hover:bg-red-50`;
		case "Harga Turun":
			return `${base} border-green-300 bg-green-100 text-green-700 hover:bg-green-50`;
		case "Harga Tetap":
			return `${base} border-blue-300 bg-blue-100 text-blue-700 hover:bg-blue-50`;
		default:
			return `${base} border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-50`;
	}
};

const BahanPokokGrid = () => {
	const [selectedItem, setSelectedItem] = useState(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [showTableView, setShowTableView] = useState(false);
	const dropdownRef = useRef(null);

	const {
		data: daftarHargaBpk,
		isLoading: isHargaBpkLoading,
		isError: isHargaBpkError,
	} = useDaftarHargaBP();
	const {
		data: dataStokBpk,
		isLoading: isStokBpkLoading,
		isError: isStokBpkError,
	} = useStokBapok(showTableView);

	const summarizedData = useMemo(() => daftarHargaBpk || [], [daftarHargaBpk]);

	const detailedTableData = useMemo(() => {
		const rawData = dataStokBpk?.data ?? [];

		return rawData.map((item) => ({
			id: item.id,
			name: item.bahan_pokok?.nama ?? "Nama tidak ditemukan",
			marketName: item.pasar?.nama ?? "Pasar tidak ditemukan",
			price: item.harga ?? "-",
			stock: item.stok ?? "-",
			tanggal: item.tanggal,
			satuan: item.bahan_pokok?.satuan,
		}));
	}, [dataStokBpk]);

	const {
		activeCategory,
		priceFilter,
		marketFilter,
		filteredData,
		setActiveCategory,
		setPriceFilter,
		setMarketFilter,
	} = useFilter(summarizedData, detailedTableData, showTableView);
	const { page, totalPages, paginatedData, setPage } = usePagination(
		filteredData,
		12
	);

	const categoriesFromApi = useMemo(() => {
		if (!summarizedData || summarizedData.length === 0) return ["Semua"];
		const uniqueCategories = Array.from(
			new Set(summarizedData.map((item) => item.name))
		).filter(Boolean);
		return ["Semua", ...uniqueCategories.sort()];
	}, [summarizedData]);

	const allMarketsFromApi = useMemo(() => {
		const rawData = dataStokBpk?.data ?? [];

		if (rawData.length === 0) return ["Semua Pasar"];
		const uniqueMarkets = Array.from(
			new Set(rawData.map((item) => item.pasar?.nama))
		).filter(Boolean);

		return ["Semua Pasar", ...uniqueMarkets.sort()];
	}, [dataStokBpk]);

	const dataToExport = useMemo(() => {
		if (!filteredData || filteredData.length === 0) return [];
		return showTableView
			? filteredData.map((item) => ({
					No: item.id,
					Komoditas: item.name,
					"Nama Pasar": item.marketName,
					Harga: item.price,
					Stok: item.stock,
					Satuan: item.satuan,
					Tanggal: item.tanggal,
			  }))
			: filteredData.map((item, index) => ({
					No: index + 1,
					Komoditas: item.name,
					"Harga Rata-rata": item.price,
					Status: item.status || "N/A",
					"Perubahan (%)": item.change_percent || "N/A",
					Satuan: item.satuan || "N/A",
			  }));
	}, [filteredData, showTableView]);

	const fileName = `Data_Bahan_Pokok_Bantul_${
		new Date().toISOString().split("T")[0]
	}.xlsx`;

	const { exportToExcel, isExporting } = useExportData(dataToExport, fileName);
	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [daftarHargaBpk, dataStokBpk]);

	return (
		<div className="px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
			<div className="max-w-7xl mx-auto">
				<div className="relative z-10 py-6 text-center">
					<span className="inline-flex items-center px-3 py-1 text-sm font-semibold text-emerald-700 bg-emerald-100 rounded-full mb-3 shadow-sm transform hover:scale-105 transition duration-300 ease-in-out">
						<Zap className="w-4 h-4 mr-2" />
						UPDATE TERKINI
					</span>
					<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3 leading-tight drop-shadow-sm">
						<span className="text-green-700">Harga Pangan</span> Pokok Bantul
					</h2>
					<p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto">
						Pantau ketersediaan stok dan perubahan harga terkini di pasar
						tradisional Bantul.
					</p>
				</div>

				{(isHargaBpkLoading || isStokBpkLoading) && (
					<div className="flex flex-col text-center mt-35 py-10 text-green-600">
						<div className="max-w-md mx-auto">
							<LoaderCircle className="animate-spin h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
						</div>
						<div className="text-sm sm:text-base text-gray-500">
							Loading data...
						</div>
					</div>
				)}

				{(isHargaBpkError || isStokBpkError) && (
					<div className="bg-white rounded-xl mt-2 h-[400px] border-2 border-dashed border-gray-200 p-6 sm:p-8 flex justify-center items-center text-center">
						<div className="max-w-md mx-auto">
							<div className="text-emerald-500 mb-4">
								<Frown className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
							</div>
							<h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">
								Data gagal dimuat
							</h3>
							<p className="text-sm sm:text-base text-gray-500">
								Terjadi kesalahan
							</p>
						</div>
					</div>
				)}

				{!(isHargaBpkLoading || isStokBpkLoading) &&
					!(isHargaBpkError || isStokBpkError) && (
						<>
							<div className=" py-4 mb-2">
								<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
									<div className="flex flex-col sm:flex-row items-center justify-start sm:justify-between gap-3 sm:gap-4 w-full">
										<div className="flex flex-row sm:flex-row gap-3 items-center w-full sm:w-auto">
											<div
												className="relative w-full sm:w-48"
												ref={dropdownRef}>
												<input
													type="text"
													value={showTableView ? marketFilter : activeCategory}
													onChange={(e) => {
														const value = e.target.value;
														if (showTableView) {
															setMarketFilter(value);
														} else {
															setActiveCategory(value);
														}
														setIsDropdownOpen(true);
													}}
													onClick={() => setIsDropdownOpen(!isDropdownOpen)}
													placeholder={
														showTableView ? "Cari pasar..." : "Cari kategori..."
													}
													className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-left flex items-center justify-between shadow-sm hover:border-green-500 focus:outline-none focus:border-green-600 transition-colors"
												/>
												<ChevronDown
													className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none transform transition-transform duration-200"
													style={{
														transform: isDropdownOpen
															? "rotate(180deg)"
															: "rotate(0deg)",
													}}
												/>
												{isDropdownOpen && (
													<div className="scr absolute z-20 mt-0.5 w-full sm:w-48 max-h-64 overflow-y-auto rounded-lg bg-white shadow-xl border border-gray-200">
														<ul className="items-center text-sm text-gray-700">
															{(showTableView
																? allMarketsFromApi
																: categoriesFromApi
															)
																.filter((option) =>
																	option
																		.toLowerCase()
																		.includes(
																			(showTableView
																				? marketFilter
																				: activeCategory
																			).toLowerCase()
																		)
																)
																.map((option) => (
																	<li
																		key={option}
																		onClick={() => {
																			if (showTableView) {
																				setMarketFilter(
																					option === "Semua Pasar" ? "" : option
																				);
																			} else {
																				setActiveCategory(
																					option === "Semua" ? "" : option
																				);
																			}
																			setIsDropdownOpen(false);
																			setPage(1);
																		}}
																		className={`px-4 py-2 cursor-pointer hover:bg-green-50 transition-colors ${
																			(showTableView &&
																				marketFilter ===
																					(option === "Semua Pasar"
																						? ""
																						: option)) ||
																			(!showTableView &&
																				activeCategory ===
																					(option === "Semua" ? "" : option))
																				? "bg-green-100 text-green-700 font-medium"
																				: ""
																		}`}>
																		{option}
																	</li>
																))}
														</ul>
													</div>
												)}
											</div>

											<button
												onClick={() => {
													setShowTableView(!showTableView);
													setActiveCategory("");
													setPriceFilter("");
													setMarketFilter("");
													setPage(1);
												}}
												className="w-10 h-9.5 sm:h-9 sm:w-9 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-2 py-2 rounded-lg shadow-md text-sm flex items-center justify-center gap-2 transition-all">
												{showTableView ? (
													<AlignLeft className="w-5 h-5" />
												) : (
													<LayoutGrid className="w-5 h-5" />
												)}
											</button>
										</div>

										<div className="flex flex-col sm:flex-row flex-wrap gap-3 items-center w-full sm:w-auto justify-center sm:justify-end">
											{/* <div className="flex items-center gap-2 text-sm text-gray-700 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
								<CalendarDays className="w-4 h-4 text-blue-600" />
								<span className="font-medium">
									Update: {getCurrentDateFormatted}
								</span>
							</div> */}

											{showTableView && (
												<button
													onClick={exportToExcel}
													disabled={isExporting}
													className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg shadow-md text-sm flex items-center justify-center gap-2 transition-all">
													<FolderOutput className="w-4 h-4" />
													{isExporting ? "Mengekspor..." : "Export Data"}
												</button>
											)}
										</div>
									</div>

									{!showTableView && (
										<div className="flex flex-wrap justify-center sm:justify-end gap-2 text-sm w-full sm:w-full">
											{[
												"Semua",
												"Harga Naik",
												"Harga Turun",
												"Harga Tetap",
											].map((filter) => (
												<button
													key={filter}
													onClick={() => {
														setPriceFilter(filter === "Semua" ? "" : filter);
														setPage(1);
													}}
													className={`px-3 py-1 rounded-lg flex items-center gap-1 transition ${
														(filter === "Semua" && !priceFilter) ||
														priceFilter === filter
															? getFilterStyle(filter, true)
															: getFilterStyle(filter, false)
													}`}>
													{filter === "Harga Naik" && (
														<TrendingUp className="w-4 h-4 text-red-500" />
													)}
													{filter === "Harga Turun" && (
														<TrendingDown className="w-4 h-4 text-green-500" />
													)}
													{filter === "Harga Tetap" && (
														<Minus className="w-4 h-4 text-gray-500" />
													)}
													{filter}
												</button>
											))}
										</div>
									)}
								</div>
							</div>

							{!showTableView ? (
								filteredData.length > 0 ? (
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 mb-8">
										{paginatedData.map((item) => (
											<ProductCard
												key={item.id}
												item={item}
												onClick={() => setSelectedItem(item)}
											/>
										))}
										{selectedItem && (
											<DetailModal
												item={selectedItem}
												onClose={() => setSelectedItem(null)}
											/>
										)}
									</div>
								) : (
									<div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-6 sm:p-8 text-center">
										<div className="max-w-md mx-auto">
											<div className="text-gray-300 mb-4">
												<Frown className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
											</div>
											<h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">
												Data tidak ditemukan
											</h3>
											<p className="text-sm sm:text-base text-gray-500">
												Tidak ada data yang sesuai dengan filter yang Anda pilih
											</p>
											<button
												onClick={() => {
													setActiveCategory("");
													setPriceFilter("");
													setMarketFilter("");
													setPage(1);
												}}
												className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-colors">
												Reset Filter
											</button>
										</div>
									</div>
								)
							) : (
								<TabelBapok
									filteredData={filteredData}
									paginatedData={paginatedData}
									page={page}
									marketFilter={marketFilter}
									setActiveCategory={setActiveCategory}
									setPriceFilter={setPriceFilter}
									setMarketFilter={setMarketFilter}
									setPage={setPage}
								/>
							)}

							{filteredData.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-8 justify-center w-full">
									<button
										onClick={() => setPage((p) => Math.max(p - 1, 1))}
										className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition"
										disabled={page === 1}>
										{"< Sebelumnya"}
									</button>

									<div className="flex gap-1">
										{Array.from({ length: totalPages }, (_, i) => {
											if (
												totalPages <= 5 ||
												i === 0 ||
												i === totalPages - 1 ||
												Math.abs(page - (i + 1)) <= 1
											) {
												return (
													<button
														key={i + 1}
														onClick={() => setPage(i + 1)}
														className={`px-2.5 py-1 sm:px-4 sm:py-2 border rounded-lg text-sm font-medium transition ${
															page === i + 1
																? "bg-green-600 border-green-600 text-white"
																: "border-gray-300 hover:bg-gray-50"
														}`}>
														{i + 1}
													</button>
												);
											}
											if (
												(i === 1 && page > 3 && totalPages > 5) ||
												(i === totalPages - 2 &&
													page < totalPages - 2 &&
													totalPages > 5)
											) {
												return (
													<span
														key={`ellipsis-${i + 1}`}
														className="px-2 py-1 sm:py-2 sm:px-3 text-gray-50">
														...
													</span>
												);
											}
											return null;
										}).filter(Boolean)}{" "}
									</div>

									<button
										onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
										className="px-2 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition"
										disabled={page === totalPages}>
										{"Selanjutnya >"}
									</button>
								</div>
							)}
						</>
					)}
			</div>
		</div>
	);
};

export default BahanPokokGrid;
