import { X, CalendarDays, TrendingUp, TrendingDown, LoaderCircle } from "lucide-react";
import HargaChart from "../Charts/HargaChart";
import HargaPerPasarChart from "../Charts/HargaPerPasar";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useGrafikBapok } from "../../hooks/useGrafikBapok";
import {  useState } from "react";
import DateRangePicker from "./DateRangePicker";
import dayjs from "dayjs";

export default function DetailModal({ item, onClose }) {
	const [startDate, setStartDate] = useState(
		dayjs().subtract(6, "day").format("YYYY-MM-DD")
	);
	const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));

	const { data, isLoading } = useGrafikBapok(item?.id, startDate, endDate);


	const handleDateChange = (range) => {
		if (range && range.length === 2) {
			setStartDate(range[0]);
			setEndDate(range[1]);
		}
	};

	const hargaRataData = data?.harga_rata;
	const hargaPerPasarData = data?.harga_per_pasar;
	const hargaEkstrem = data?.harga_ekstrem_terbaru;

	if (!item) return null;

	return (
		<AnimatePresence>
			{item && (
				<Motion.div
					className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}>
					<div
						className="absolute inset-0 bg-[rgba(0,0,0,0.4)] backdrop-blur-[8px]"
						onClick={onClose}
					/>
					<Motion.div
						initial={{ y: 50, opacity: 0, scale: 0.95 }}
						animate={{ y: 0, opacity: 1, scale: 1 }}
						exit={{ y: 50, opacity: 0, scale: 0.95 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 25,
						}}
						onClick={(e) => e.stopPropagation()}
						className="scr relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
						<div className="sticky top-0 z-10 bg-white border-b border-gray-100 rounded-t-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-start sm:items-center justify-between">
							<div className="flex-1 min-w-0">
								<h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
									{item.name}
								</h2>
								<p className="text-base sm:text-xl font-semibold text-emerald-600 mt-1">
									Rp {item.price.toLocaleString("id-ID")} / {item.unit}
								</p>
							</div>
							<button
								onClick={onClose}
								className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 ml-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-105 shrink-0"
								aria-label="Tutup modal">
								<X className="w-4 h-4 sm:w-5 sm:h-5" />
							</button>
						</div>
						<div className="p-3 sm:p-6 space-y-4 sm:space-y-8">
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="bg-green-50 p-4 rounded-lg flex-1">
									<div className="flex justify-between">
										<h4 className="text-sm font-semibold text-green-700 mb-1">
											Harga Terendah
										</h4>
										<p className="text-sm font-semibold text-green-700">
											{hargaEkstrem?.tanggal}
										</p>
									</div>
									<div className="flex items-center text-green-600">
										<TrendingDown className="w-4 h-4 mr-2" />
										{hargaEkstrem ? (
											<p className="text-sm font-medium">
												Rp {hargaEkstrem.harga_terendah.toLocaleString("id-ID")}{" "}
												({hargaEkstrem.nama_pasar_terendah})
											</p>
										) : (
											<p className="text-sm font-medium">-</p>
										)}
									</div>
								</div>
								<div className="bg-red-50 p-4 rounded-lg flex-1">
									<div className="flex justify-between">
										<h4 className="text-sm font-semibold text-red-700 mb-1">
											Harga Tertinggi
										</h4>
										<p className="text-sm font-semibold text-red-700">
											{hargaEkstrem?.tanggal}
										</p>
									</div>
									<div className="flex items-center text-red-600">
										<TrendingUp className="w-4 h-4 mr-2" />
										{hargaEkstrem ? (
											<p className="text-sm font-medium">
												Rp{" "}
												{hargaEkstrem.harga_tertinggi.toLocaleString("id-ID")} (
												{hargaEkstrem.nama_pasar_tertinggi})
											</p>
										) : (
											<p className="text-sm font-medium">-</p>
										)}
									</div>
								</div>
								<DateRangePicker
									initialStartDate={data?.start_date}
									initialEndDate={data?.end_date}
									onDateChange={handleDateChange}
								/>
							</div>
							{isLoading ? (
                                <div className="flex flex-col h-90 justify-center items-center text-center py-10 text-green-600">
                                    <div className="max-w-md mx-auto">
                                        <LoaderCircle className="animate-spin h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
                                    </div>
                                    <div className="text-sm sm:text-base text-gray-500 mt-2">
                                        Loading data...
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-6">
                                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                                            <h3 className="text-base sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                                                <div className="w-1 h-4 sm:h-6 bg-blue-500 rounded-full"></div>
                                                <span className="text-sm sm:text-base">
                                                    Harga Rata-rata
                                                </span>
                                            </h3>
                                        </div>
                                        <div className="w-full h-[250px] sm:h-[300px] md:h-[400px]">
                                            <HargaChart items={hargaRataData} />
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 sm:p-6">
                                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                                            <h3 className="text-base sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                                                <div className="w-1 h-4 sm:h-6 bg-emerald-500 rounded-full"></div>
                                                <span className="text-sm sm:text-base">Harga Pasar</span>
                                            </h3>
                                        </div>
                                        <div className="w-full h-[250px] sm:h-[300px] md:h-[400px]">
                                            <HargaPerPasarChart items={hargaPerPasarData} />
                                        </div>
                                    </div>
                                </>
                            )}
						</div>
					</Motion.div>
				</Motion.div>
			)}
		</AnimatePresence>
	);
}
