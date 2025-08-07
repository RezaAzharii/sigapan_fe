import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useDaftarHargaBP } from "../../hooks/useDaftarHargaBP";
import { useStokBapok } from "../../hooks/useStokBapok";
import { useFilter } from "../../hooks/useFilter";
import { usePagination } from "../../hooks/usePagination";
import {
	ArrowDown,
	ArrowRightLeft,
	ArrowUp,
	CalendarDays,
	ChevronDown,
	FolderOutput,
	Frown,
	Minus,
	Zap,
} from "lucide-react";
import ProductCard from "./BahanPokokCard";

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
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [showTableView, setShowTableView] = useState(false);
	const dropdownRef = useRef(null);

	const {
		data: daftarHargaBpk,
		isLoading: isHargaBpkLoading,
		isError: isHargaBpkError,
		error: hargaBpkError,
	} = useDaftarHargaBP();
	const {
		data: dataStokBpk,
		isLoading: isStokBpkLoading,
		isError: isStokBpkError,
		error: stokBpkError,
	} = useStokBapok();

	const summarizedData = useMemo(
		() => daftarHargaBpk?.data || [],
		[daftarHargaBpk]
	);

	const detailedTableData = useMemo(() => {
		const rawData = dataStokBpk || [];

		return rawData.map((item) => ({
			id: item.id,
			name: item.bahan_pokok?.nama ?? "Nama tidak ditemukan",
			marketName: item.pasar?.nama ?? "Pasar tidak ditemukan",
			price: item.harga ?? 0,
			stock: item.stok ?? 0,
			status:
				Number(item.stok) > Number(item.bahan_pokok?.stok_wajib ?? 0)
					? "Tersedia"
					: "Terbatas",
			change_percent: "+1.86%",
			change_status: "up",
			category: item.bahan_pokok?.category ?? "Tanpa Kategori",
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
		if (!dataStokBpk || dataStokBpk.length === 0)
			return ["Semua Pasar"];
		const uniqueMarkets = Array.from(
			new Set(dataStokBpk.map((item) => item.pasar?.nama))
		).filter(Boolean);
		return ["Semua Pasar", ...uniqueMarkets.sort()];
	}, [dataStokBpk]);

	const exportToExcel = useCallback(() => {
		const dataToExport = filteredData.map((item, index) => ({
			No: index + 1,
			Komoditas: item.name,
			Kategori: item.category || "N/A",
			"Nama Pasar": item.marketName || "Rata-rata Semua Pasar",
			Status: item.status || "N/A",
			Stok: item.stock || "N/A",
			"Harga (Rp)": item.price.toLocaleString("id-ID"),
			"Perubahan (%)": item.change_percent || "N/A",
		}));

		const headers = Object.keys(dataToExport[0]);
		const csvContent = [
			headers.join(","),
			...dataToExport.map((row) =>
				headers
					.map((header) => `"${String(row[header]).replace(/"/g, '""')}"`)
					.join(",")
			),
		].join("\n");

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const link = document.createElement("a");
		const url = URL.createObjectURL(blob);
		link.setAttribute("href", url);
		link.setAttribute(
			"download",
			`Data_Harga_Pangan_Bantul_${
				daftarHargaBpk?.tanggal_update || new Date().toISOString().split("T")[0]
			}.csv`
		);
		link.style.visibility = "hidden";
		document.body.appendChild(link);
		document.body.removeChild(link);
	}, [filteredData, daftarHargaBpk]);

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
	}, []);

	const getCurrentDateFormatted = useMemo(() => {
		const date = showTableView
			? dataStokBpk?.tanggal
			: daftarHargaBpk?.tanggal_update;
		if (!date) return "";
		const formattedDate = new Date(date);
		const options = {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
		};
		const time = new Date(date).toLocaleTimeString("id-ID", {
			hour: "2-digit",
			minute: "2-digit",
		});
		return `${formattedDate.toLocaleDateString("id-ID", options)} ${time} WIB`;
	}, [showTableView, daftarHargaBpk, dataStokBpk]);

	if (isHargaBpkLoading || isStokBpkLoading) {
		return (
			<div className="text-center py-10 text-gray-600">Loading data...</div>
		);
	}

	if (isHargaBpkError || isStokBpkError) {
		return (
			<div className="text-center py-10 text-red-600">
				Error: {hargaBpkError?.message || stokBpkError?.message}
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-gray-50 min-h-screen">
			<div className="rounded-3xl p-6 sm:p-10 mb-8 sm:mb-12 relative overflow-hidden">
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-50 to-white opacity-50 pointer-events-none"></div>
				<div className="relative z-10 text-center">
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
			</div>

			<div className="rounded-xl p-4 mb-6">
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
					<div className="flex flex-col sm:flex-row items-center justify-start sm:justify-between gap-3 sm:gap-4 w-full">
						<div className="flex flex-col sm:flex-row flex-wrap gap-3 items-center w-full sm:w-auto">
							<div className="relative w-full sm:w-48" ref={dropdownRef}>
								<button
									type="button"
									className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-left flex items-center justify-between shadow-sm hover:border-green-500 transition-colors"
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
									<span className="truncate">
										{showTableView
											? marketFilter || "Semua Pasar"
											: activeCategory}
									</span>
									<ChevronDown
										className="w-4 h-4 text-gray-500 ml-2 transform transition-transform duration-200"
										style={{
											transform: isDropdownOpen
												? "rotate(180deg)"
												: "rotate(0deg)",
										}}
									/>
								</button>
								{isDropdownOpen && (
									<div className="scr absolute z-20 mt-1 w-full sm:w-48 max-h-64 overflow-y-auto rounded-lg bg-white shadow-xl border border-gray-200">
										<ul className="py-1 text-sm text-gray-700">
											{(showTableView
												? allMarketsFromApi
												: categoriesFromApi
											).map((option) => (
												<li
													key={option}
													onClick={() => {
														if (showTableView) {
															setMarketFilter(
																option === "Semua Pasar" ? "" : option
															);
														} else {
															setActiveCategory(option);
														}
														setIsDropdownOpen(false);
														setPage(1);
													}}
													className={`px-4 py-2 cursor-pointer hover:bg-green-50 transition-colors ${
														(showTableView &&
															marketFilter ===
																(option === "Semua Pasar" ? "" : option)) ||
														(!showTableView && activeCategory === option)
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
									setPriceFilter("");
									setMarketFilter("");
									setActiveCategory("Semua");
									setPage(1);
								}}
								className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg shadow-md text-sm flex items-center justify-center gap-2 transition-all">
								<ArrowRightLeft className="w-4 h-4" />
								{showTableView ? "Daftar Harga" : "Stok Bahan Pokok"}
							</button>
						</div>

						<div className="flex flex-col sm:flex-row flex-wrap gap-3 items-center w-full sm:w-auto justify-center sm:justify-end">
							<div className="flex items-center gap-2 text-sm text-gray-700 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
								<CalendarDays className="w-4 h-4 text-blue-600" />
								<span className="font-medium">
									Update: {getCurrentDateFormatted}
								</span>
							</div>

							{showTableView && (
								<button
									onClick={exportToExcel}
									className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg shadow-md text-sm flex items-center justify-center gap-2 transition-all">
									<FolderOutput className="w-4 h-4" />
									Export Data
								</button>
							)}
						</div>
					</div>

					{!showTableView && (
						<div className="flex flex-wrap justify-center sm:justify-start gap-2 text-sm mt-3 sm:mt-0 w-full sm:w-auto">
							{["Semua", "Harga Naik", "Harga Turun", "Harga Tetap"].map(
								(filter) => (
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
											<ArrowUp className="w-4 h-4 text-red-500" />
										)}
										{filter === "Harga Turun" && (
											<ArrowDown className="w-4 h-4 text-green-500" />
										)}
										{filter === "Harga Tetap" && (
											<Minus className="w-4 h-4 text-gray-500" />
										)}
										{filter}
									</button>
								)
							)}
						</div>
					)}
				</div>
			</div>

			{!showTableView ? (
				filteredData.length > 0 ? (
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 mb-8">
						{paginatedData.map((item) => (
							<ProductCard key={item.id} item={item} />
						))}
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
									setActiveCategory("Semua");
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
			) : filteredData.length > 0 ? (
				<div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden mb-8">
					<div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
						<h3 className="text-lg font-bold text-gray-800">Data Stok Pasar</h3>
						<p className="text-sm text-gray-600">
							{marketFilter
								? `Menampilkan data dari ${marketFilter}`
								: "Menampilkan data dari semua pasar"}
							{" - Total "}
							<span className="font-bold text-green-700">
								{filteredData.length}
							</span>{" "}
							komoditas
						</p>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead className="bg-gradient-to-r from-green-600 to-green-700 text-white uppercase text-xs">
								<tr>
									<th className="p-3 text-center w-10 sm:w-12">#</th>
									<th className="p-3 text-left min-w-[120px]">Komoditas</th>
									<th className="p-3 text-left min-w-[120px]">Pasar</th>
									<th className="p-3 text-center">Status</th>
									<th className="p-3 text-right">Stok</th>
									<th className="p-3 text-right pr-4 min-w-[100px]">Harga</th>
									<th className="p-3 text-right pr-4 min-w-[100px]">
										Perubahan
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{paginatedData.map((item, index) => {
									const changeIndicatorStyle =
										item.change_status === "up"
											? "bg-red-50 text-red-600 border-red-200"
											: item.change_status === "down"
											? "bg-green-50 text-green-600 border-green-200"
											: "bg-blue-50 text-blue-600 border-blue-200";
									const changeIcon =
										item.change_status === "up" ? (
											<ArrowUp className="w-3 h-3 text-red-500" />
										) : item.change_status === "down" ? (
											<ArrowDown className="w-3 h-3 text-green-500" />
										) : (
											<Minus className="w-3 h-3 text-blue-500" />
										);

									return (
										<tr
											key={item.id}
											className="hover:bg-green-50 transition-colors">
											<td className="p-3 text-center text-gray-500 font-medium">
												{(page - 1) * 12 + index + 1}
											</td>
											<td className="p-3 font-semibold text-gray-800">
												{item.name}
											</td>
											<td className="p-3 text-gray-700">{item.marketName}</td>
											<td className="p-3 text-center">
												<span
													className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
														item.status === "Tersedia"
															? "text-green-700 bg-green-100"
															: "text-amber-700 bg-amber-100"
													}`}>
													{item.status}
												</span>
											</td>
											<td className="p-3 text-right font-semibold text-gray-700 whitespace-nowrap">
												{item.stock} Kg
											</td>
											<td className="p-3 pr-4 text-right font-bold text-green-700 whitespace-nowrap">
												Rp{" "}
												{item.price.toLocaleString("id-ID", {
													minimumFractionDigits: 0,
													maximumFractionDigits: 0,
												})}
											</td>
											<td className="p-3 pr-4 text-right">
												<div className="flex items-center justify-end text-xs font-medium gap-1.5">
													<span
														className={`px-2.5 py-1 w-[85px] rounded-full flex items-center gap-1 border ${changeIndicatorStyle}`}>
														{changeIcon}
														{item.change_percent}
													</span>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
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
								setActiveCategory("Semua");
								setPriceFilter("");
								setMarketFilter("");
								setPage(1);
							}}
							className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-colors">
							Reset Filter
						</button>
					</div>
				</div>
			)}

			{filteredData.length > 0 && (
				<div className="flex flex-wrap justify-center gap-2 mt-8">
					<button
						onClick={() => setPage((p) => Math.max(p - 1, 1))}
						className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition"
						disabled={page === totalPages}>
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
										className={`px-3 py-1.5 sm:px-4 sm:py-2 border rounded-lg text-sm font-medium transition ${
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
										className="px-3 py-1.5 sm:py-2 text-gray-50">
										...
									</span>
								);
							}
							return null;
						}).filter(Boolean)}{" "}
					</div>

					<button
						onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
						className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition"
						disabled={page === totalPages}>
						{"Selanjutnya >"}
					</button>
				</div>
			)}
		</div>
	);
};

export default BahanPokokGrid;
