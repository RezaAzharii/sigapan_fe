import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function HargaPerPasarChart({ items }) {
	if (!items || items.length === 0) {
		return (
			<div className="w-full h-full flex justify-center items-center bg-white rounded-xl border border-gray-100 p-2 sm:p-4 shadow-sm">
				<div className="text-center text-gray-500">
					Data harga pasar tidak ditemukan.
				</div>
			</div>
		);
	}

	const uniqueDates = [...new Set(items.map((d) => d.tanggal))].sort();
	const uniqueMarkets = [...new Set(items.map((d) => d.nama_pasar))];
	const colors = [
		"#ef4444",
		"#f97316",
		"#10b981",
		"#3b82f6",
		"#8b5cf6",
		"#a855f7",
		"#ec4899",
		"#fcd34d",
	];

	const datasets = uniqueMarkets.map((namaPasar, index) => {
		const pasarData = items.filter((item) => item.nama_pasar === namaPasar);
		const dataMap = new Map(
			pasarData.map((item) => [item.tanggal, item.harga])
		);
		const dataPoints = uniqueDates.map((date) => dataMap.get(date) || null);
		const chartColor = colors[index % colors.length];

		return {
			label: namaPasar,
			data: dataPoints,
			borderColor: chartColor,
			backgroundColor: `${chartColor}20`,
			tension: 0.3,
			fill: false,
			pointStyle: "circle",
			pointRadius: window.innerWidth < 640 ? 4 : 6,
			pointHoverRadius: window.innerWidth < 640 ? 7 : 10,
			pointBackgroundColor: chartColor,
			pointBorderColor: "white",
			pointBorderWidth: 2,
			borderWidth: window.innerWidth < 640 ? 2 : 3,
		};
	});

	const data = {
		labels: uniqueDates,
		datasets: datasets,
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: { mode: "nearest", intersect: true },
		plugins: {
			legend: {
				display: true,
				position: window.innerWidth < 640 ? "bottom" : "top",
				labels: {
					usePointStyle: true,
					pointStyle: "circle",
					boxWidth: window.innerWidth < 640 ? 8 : 12,
					padding: window.innerWidth < 640 ? 8 : 15,
					font: {
						size: window.innerWidth < 640 ? 10 : 12,
						weight: "200",
					},
					color: "#5D688A",
				},
			},
			tooltip: {
				enabled: true,
				mode: "nearest",
				intersect: false,
				backgroundColor: "rgba(255, 255, 255, 0.95)",
				titleColor: "#1f2937",
				bodyColor: "#374151",
				borderColor: "#e5e7eb",
				borderWidth: 1,
				cornerRadius: 8,
				padding: window.innerWidth < 640 ? 8 : 12,
				displayColors: true,
				titleFont: {
					size: window.innerWidth < 640 ? 11 : 13,
				},
				bodyFont: {
					size: window.innerWidth < 640 ? 10 : 12,
				},
				callbacks: {
					label: (context) => {
						const datasetLabel = context.dataset.label || "";
						const value = context.parsed.y?.toLocaleString("id-ID");
						return `${datasetLabel}: Rp ${value}`;
					},
					title: (tooltipItems) => {
						return tooltipItems[0].label;
					},
				},
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
				ticks: {
					autoSkip: true,
					maxTicksLimit: window.innerWidth < 640 ? 5 : 10,
				},
			},
			y: {
				beginAtZero: false,
				ticks: {
					font: {
						size: window.innerWidth < 640 ? 9 : 11,
					},
					color: "#6b7280",
					maxTicksLimit: window.innerWidth < 640 ? 5 : 8,
					callback: function (value) {
						if (window.innerWidth < 640) {
							return (value / 1000).toFixed(0) + "K";
						}
						return "Rp " + value.toLocaleString("id-ID");
					},
				},
				grid: {
					color: "#f3f4f6",
					drawBorder: false,
				},
				border: {
					display: false,
				},
			},
		},
		elements: {
			point: {
				radius: window.innerWidth < 640 ? 4 : 6,
				hoverRadius: window.innerWidth < 640 ? 6 : 8,
				hoverBorderWidth: 3,
			},
			line: {
				borderWidth: window.innerWidth < 640 ? 2 : 3,
			},
		},
	};

	return (
		<div className="w-full h-full bg-white rounded-xl border border-gray-100 p-2 sm:p-4 shadow-sm">
			<div className="w-full h-full relative">
				<Line data={data} options={options} />
			</div>
		</div>
	);
}
