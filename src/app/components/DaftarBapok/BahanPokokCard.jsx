import { ArrowDown, ArrowUp, Minus } from "lucide-react";

const BahanPokokCard = ({ item }) => {
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
		<div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group hover:border-emerald-200 transform hover:-translate-y-0.5">
			<div className="bg-white px-3 py-4 flex justify-center items-center h-36 sm:h-40 overflow-hidden">
				<img
					src={`http://127.0.0.1:8000${item.image_url}`}
					alt={item.name}
					className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
				/>
			</div>
			<div className="px-3 pb-3 pt-2 text-center flex flex-col justify-between flex-grow">
				<h3 className="text-sm font-semibold text-gray-800 mb-1 leading-tight line-clamp-2">
					{item.name}
				</h3>
				<p className="text-emerald-700 text-xl font-bold mb-2">
					Rp{" "}
					{item.price.toLocaleString("id-ID", {
						minimumFractionDigits: 0,
						maximumFractionDigits: 0,
					})}
					<span className="text-xs text-gray-500 font-medium">
						/{item.unit}
					</span>
				</p>
				<div className="text-xs font-medium flex justify-center gap-1.5">
					<span
						className={`px-2.5 py-1 rounded-full flex items-center gap-1 border ${changeIndicatorStyle}`}>
						{changeIcon}
						{item.change_percent}
					</span>
				</div>
			</div>
		</div>
	);
};

export default BahanPokokCard;