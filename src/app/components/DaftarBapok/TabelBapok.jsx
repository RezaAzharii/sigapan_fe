import { Frown } from "lucide-react";

const TabelBapok = ({
	filteredData,
	paginatedData,
	page,
	marketFilter,
	setActiveCategory,
	setPriceFilter,
	setMarketFilter,
	setPage,
}) => {
	return filteredData.length > 0 ? (
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
				<table className="min-w-full text-sm">
					<thead className="bg-gradient-to-r from-green-600 to-green-700 text-white uppercase text-xs">
						<tr className="h-12 text-center">
							<th className="px-4 py-2">NO</th>
							<th className="px-4 py-2 text-left">Komoditas</th>
							<th className="px-4 py-2 text-left">Pasar</th>
							<th className="px-4 py-2 text-left">Harga</th>
							<th className="px-4 py-2 text-left">Stok</th>
							<th className="px-4 py-2 text-center">Tanggal</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{paginatedData.map((item, index) => (
							<tr
								key={item.id || index}
								className="hover:bg-green-50 transition-colors">
								<td className="px-4 py-3 text-center text-gray-500 font-medium">
									{(page - 1) * 12 + index + 1}
								</td>
								<td className="px-4 py-3 font-semibold text-gray-800">
									{item.name}
								</td>
								<td className="px-4 py-3 text-gray-700">{item.marketName}</td>
								<td className="px-4 py-3 text-left font-bold text-green-700 whitespace-nowrap">
									Rp{" "}
									{item.price.toLocaleString("id-ID", {
										minimumFractionDigits: 0,
										maximumFractionDigits: 0,
									})}
								</td>
								<td className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
									{item.stock} {item.satuan}
								</td>
								<td className="px-4 py-3 text-center font-semibold text-gray-700 whitespace-nowrap">
									{item.tanggal}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	) : (
		<div className="flex justify-center items-center text-center h-[400px] bg-white rounded-xl border-2 border-dashed border-gray-200 p-6 sm:p-8">
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
	);
};

export default TabelBapok;
