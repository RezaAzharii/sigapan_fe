import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function HargaChart({ items }) {
	if (!items || !Array.isArray(items) || items.length === 0) {
		return (
			<div className="w-full h-full flex justify-center items-center bg-white rounded-xl border border-gray-100 p-2 sm:p-4 shadow-sm">
				<div className="text-center text-gray-500">
					Data harga rata-rata tidak ditemukan.
				</div>
			</div>
		);
	}

	const labels = items.map((d) => d.tanggal);
	const dataValues = items.map((d) => parseFloat(d.harga_rata));

	const data = {
		labels: labels,
		datasets: [
			{
				label: "Harga Rata-rata",
				data: dataValues,
				borderColor: "#3b82f6",
				backgroundColor: "rgba(59, 130, 246, 0.1)",
				fill: true,
				tension: 0.4,
				borderWidth: window.innerWidth < 640 ? 2 : 3,
				pointBackgroundColor: "#3b82f6",
				pointBorderColor: "#ffffff",
				pointBorderWidth: 2,
				pointRadius: window.innerWidth < 640 ? 4 : 6,
				pointHoverRadius: window.innerWidth < 640 ? 6 : 8,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
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
						weight: "600",
					},
					color: "#5D688A",
				},
			},
			tooltip: {
				enabled: true,
				mode: "index",
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
					label: function (context) {
						const value = context.parsed.y.toLocaleString("id-ID");
						return window.innerWidth < 640
							? `Rp ${value}`
							: `${context.dataset.label}: Rp ${value}`;
					},
				},
			},
		},
		scales: {
			x: {
				ticks: {
					maxRotation: window.innerWidth < 640 ? 45 : 0,
					minRotation: 0,
					font: {
						size: window.innerWidth < 640 ? 9 : 11,
					},
					color: "#6b7280",
					maxTicksLimit: window.innerWidth < 640 ? 4 : undefined,
				},
				grid: {
					display: false,
				},
				border: {
					color: "#e5e7eb",
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
