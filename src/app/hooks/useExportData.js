import { useState, useCallback } from "react";
import * as ExcelJS from "exceljs";

export const useExportData = (data, fileName) => {
	const [isExporting, setIsExporting] = useState(false);

	const exportToExcel = useCallback(async () => {
		if (isExporting) return;

		setIsExporting(true);

		try {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet("Data");

			const headers = Object.keys(data[0]);
			worksheet.addRow(headers);

			data.forEach((row) => {
				const values = headers.map((header) => row[header] || "");
				worksheet.addRow(values);
			});

			// 3. Terapkan pemformatan dasar
			worksheet.columns.forEach((column) => {
				column.width = 15;
			});
			worksheet.getRow(1).font = { bold: true };

			const priceColumnIndex = headers.indexOf("Harga");
			if (priceColumnIndex !== -1) {
				worksheet.getColumn(priceColumnIndex + 1).numFmt = '"Rp"#,##0.00';
			}

			const avgPriceColumnIndex = headers.indexOf("Harga Rata-rata");
			if (avgPriceColumnIndex !== -1) {
				worksheet.getColumn(avgPriceColumnIndex + 1).numFmt = '"Rp"#,##0.00';
			}

			const buffer = await workbook.xlsx.writeBuffer();
			const blob = new Blob([buffer], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", fileName);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Failed to export data:", error);
			alert("Maaf, terjadi kesalahan saat mengekspor data.");
		} finally {
			setIsExporting(false);
		}
	}, [data, fileName, isExporting]);

	return { exportToExcel, isExporting };
};