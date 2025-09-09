import { useState } from "react";
import {
	MapPin,
	Clock,
	Users,
	X,
	Home,
	Landmark,
	Scan,
	Building,
	Trash2,
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import MapPriview from "./MapPriview";
import { useDaftarPasar } from "../hooks/useDaftarPasar";

const DaftarPasar = () => {
	const { data } = useDaftarPasar();
	const [selectedMarket, setSelectedMarket] = useState(null);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.2,
				staggerChildren: 0.1,
			},
		},
	};

	const cardVariants = {
		hidden: {
			opacity: 0,
			y: 50,
			scale: 0.9,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 25,
			},
		},
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<Motion.h1
						initial={{ opacity: 0, y: -30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 25,
							delay: 0.1,
						}}
						className="text-4xl font-bold text-gray-800 mb-4 drop-shadow-sm">
						Jelajahi <span className="text-green-700">Pasar Tradisional</span>{" "}
						Kami
					</Motion.h1>
					<Motion.p
						initial={{ opacity: 0, y: -30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 25,
							delay: 0.1,
						}}
						className="text-lg text-gray-700 max-w-3xl mx-auto">
						Temukan informasi lengkap mengenai pasar-pasar tradisional di
						Yogyakarta — mulai dari lokasi, jam buka, hingga fasilitas yang
						tersedia.
					</Motion.p>
				</div>

				<Motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-8">
					{data?.map((pasar) => (
						<Motion.div
							key={pasar.id}
							layoutId={`card-container-${pasar.id}`}
							variants={cardVariants}
							whileHover={{
								y: -8,
								scale: 1.02,
								transition: {
									type: "spring",
									stiffness: 400,
									damping: 25,
								},
							}}
							whileTap={{ scale: 0.98 }}
							className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
							onClick={() => setSelectedMarket(pasar)}>
							<Motion.div
								layoutId={`card-image-${pasar.id}`}
								className="relative h-48 md:h-56 bg-gray-200 overflow-hidden">
								<Motion.img
									src={`http://127.0.0.1:8000${pasar.foto}`}
									alt={pasar.nama}
									className="w-full h-full object-cover"
									whileHover={{ scale: 1.1 }}
									transition={{ duration: 0.3 }}
								/>
								<Motion.div
									className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
									initial={{ opacity: 0 }}
									whileHover={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								/>
							</Motion.div>

							<Motion.div layoutId={`card-content-${pasar.id}`} className="p-3">
								<div className="flex justify-between items-start mb-4">
									<Motion.h2
										layoutId={`card-title-${pasar.id}`}
										className="text-xl font-bold text-gray-800 mb-1">
										{pasar.nama}
									</Motion.h2>
									{/* <Motion.span
										layoutId={`card-category-${pasar.id}`}
										className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-xs md:text-sm font-medium shadow-md"
										whileHover={{ scale: 1.1 }}>
										Tradisional
									</Motion.span> */}
								</div>
								<div className="flex flex-col gap-1">
									<Motion.div className="flex items-center gap-1.5 text-gray-500">
										<Clock className="w-4 h-4 text-green-700 flex-shrink-0" />
										<span className="text-sm">{pasar.keterangan}</span>
									</Motion.div>
									<Motion.div className="flex items-start gap-1.5 text-gray-500">
										<MapPin className="w-4 h-4 text-green-700 flex-shrink-0" />
										<p className="text-[14px]">
											{pasar.alamat.split(",").slice(0, 2).join()}
										</p>
									</Motion.div>
								</div>
							</Motion.div>
						</Motion.div>
					))}
				</Motion.div>
			</div>

			<AnimatePresence>
				{selectedMarket && (
					<>
						<Motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="fixed inset-0 z-50 bg-[rgba(0, 0, 0, 0.4)] backdrop-blur-[8px]"
							onClick={() => setSelectedMarket(null)}
						/>
						<Motion.div
							layoutId={`card-container-${selectedMarket.id}`}
							className="fixed w-[375px] inset-x-2 inset-y-10 md:inset-8 lg:inset-16 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl md:w-full mx-auto max-h-[90vh] flex flex-col">
							<div className="h-full flex flex-col">
								<Motion.div
									layoutId={`card-image-${selectedMarket.id}`}
									className="relative h-65 md:h-75 bg-gray-200 overflow-hidden flex-shrink-0">
									<MapPriview
										latitude={selectedMarket.latitude}
										longitude={selectedMarket.longitude}
										nama={selectedMarket.nama}
										pedagang={selectedMarket.jumlah_pedagang}
										bango={selectedMarket.jumlah_bango}
										kantor={selectedMarket.jumlah_kantor}
										kios={selectedMarket.jumlah_kios}
										tps={selectedMarket.jumlah_tps}
										wc={selectedMarket.jumlah_mck}
									/>
									<Motion.div
										className="flex-1 overflow-y-auto p-6 space-y-4 absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.2 }}
									/>
									<Motion.button
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											type: "spring",
											stiffness: 500,
											delay: 0.6,
										}}
										onClick={() => setSelectedMarket(null)}
										className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg z-400">
										<X className="w-6 h-6 text-gray-800" />
									</Motion.button>
								</Motion.div>
								<div className="scr flex-1 overflow-y-auto">
									<Motion.div
										layoutId={`card-content-${selectedMarket.id}`}
										className="p-6 md:p-6">
										<Motion.h1
											layoutId={`card-title-${selectedMarket.id}`}
											className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
											{selectedMarket.nama}
										</Motion.h1>
										<Motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.3, duration: 0.4 }}>
											<div className="flex flex-col gap-4 mb-4 border-gray-200">
												<Motion.div
													className="flex items-center p-4 bg-gray-50 rounded-lg"
													initial={{ x: -20, opacity: 0 }}
													animate={{ x: 0, opacity: 1 }}
													transition={{ delay: 0.4 }}>
													<MapPin className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-green-600" />
													<div>
														<p className="font-semibold text-gray-800">
															Alamat
														</p>
														<p className="text-gray-600 text-sm">
															{selectedMarket.alamat}
														</p>
													</div>
												</Motion.div>

												<Motion.div
													className="flex items-center p-4 bg-gray-50 rounded-lg"
													initial={{ x: -20, opacity: 0 }}
													animate={{ x: 0, opacity: 1 }}
													transition={{ delay: 0.5 }}>
													<Clock className="w-6 h-6 mr-3 flex-shrink-0 text-green-600" />
													<div>
														<p className="font-semibold text-gray-800">
															Jam Operasional
														</p>
														<p className="text-gray-600 text-sm font-medium">
															{selectedMarket.keterangan}
														</p>
													</div>
												</Motion.div>
											</div>
											<Motion.div
												className="mb-8"
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.6 }}>
												<h3 className="text-2xl font-semibold text-gray-800 mb-6">
													Statistik Pasar
												</h3>
												<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
													<Motion.div
														className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-center flex flex-col items-center"
														initial={{ scale: 0, opacity: 0 }}
														animate={{ scale: 1, opacity: 1 }}
														transition={{
															type: "spring",
															stiffness: 400,
															damping: 25,
														}}>
														<Users className="w-7 h-7 text-green-700 mb-2" />
														<p className="text-2xl font-bold text-gray-800">
															{selectedMarket.jumlah_pedagang}
														</p>
														<p className="text-sm font-medium text-gray-500 capitalize">
															Pedagang
														</p>
													</Motion.div>
													<Motion.div
														className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-center flex flex-col items-center"
														initial={{ scale: 0, opacity: 0 }}
														animate={{ scale: 1, opacity: 1 }}
														transition={{
															type: "spring",
															stiffness: 400,
															damping: 25,
														}}>
														<Home className="w-7 h-7 text-green-700 mb-2" />
														<p className="text-2xl font-bold text-gray-800">
															{selectedMarket.jumlah_kios}
														</p>
														<p className="text-sm font-medium text-gray-500 capitalize">
															Kios
														</p>
													</Motion.div>
													<Motion.div
														className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-center flex flex-col items-center"
														initial={{ scale: 0, opacity: 0 }}
														animate={{ scale: 1, opacity: 1 }}
														transition={{
															type: "spring",
															stiffness: 400,
															damping: 25,
														}}>
														<Landmark className="w-7 h-7 text-green-700 mb-2" />
														<p className="text-2xl font-bold text-gray-800">
															{selectedMarket.jumlah_kantor}
														</p>
														<p className="text-sm font-medium text-gray-500 capitalize">
															Kantor
														</p>
													</Motion.div>
													<Motion.div
														className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-center flex flex-col items-center"
														initial={{ scale: 0, opacity: 0 }}
														animate={{ scale: 1, opacity: 1 }}
														transition={{
															type: "spring",
															stiffness: 400,
															damping: 25,
														}}>
														<Building className="w-7 h-7 text-green-700 mb-2" />
														<p className="text-2xl font-bold text-gray-800">
															{selectedMarket.jumlah_bango}
														</p>
														<p className="text-sm font-medium text-gray-500 capitalize">
															Bango
														</p>
													</Motion.div>
													<Motion.div
														className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-center flex flex-col items-center"
														initial={{ scale: 0, opacity: 0 }}
														animate={{ scale: 1, opacity: 1 }}
														transition={{
															type: "spring",
															stiffness: 400,
															damping: 25,
														}}>
														<Scan className="w-7 h-7 text-green-700 mb-2" />
														<p className="text-2xl font-bold text-gray-800">
															{selectedMarket.jumlah_mck}
														</p>
														<p className="text-sm font-medium text-gray-500 capitalize">
															Kamar Mandi/WC
														</p>
													</Motion.div>
													<Motion.div
														className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-center flex flex-col items-center"
														initial={{ scale: 0, opacity: 0 }}
														animate={{ scale: 1, opacity: 1 }}
														transition={{
															type: "spring",
															stiffness: 400,
															damping: 25,
														}}>
														<Trash2 className="w-7 h-7 text-green-700 mb-2" />
														<p className="text-2xl font-bold text-gray-800">
															{selectedMarket.tps}
														</p>
														<p className="text-sm font-medium text-gray-500 capitalize">
															Tempat Sampah
														</p>
													</Motion.div>
												</div>
											</Motion.div>
										</Motion.div>
									</Motion.div>
								</div>
							</div>
						</Motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

export default DaftarPasar;
