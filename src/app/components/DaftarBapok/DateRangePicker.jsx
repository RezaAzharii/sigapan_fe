import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

const DateRangePicker = ({
	initialStartDate,
	initialEndDate,
	onDateChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [startDate, setStartDate] = useState(
		initialStartDate ? dayjs(initialStartDate) : null
	);
	const [endDate, setEndDate] = useState(
		initialEndDate ? dayjs(initialEndDate) : null
	);
	const [tempStartDate, setTempStartDate] = useState(startDate);
	const [tempEndDate, setTempEndDate] = useState(endDate);

	const [currentMonth, setCurrentMonth] = useState(dayjs());
	const pickerRef = useRef(null);
	const triggerRef = useRef(null);
	const [popupStyle, setPopupStyle] = useState({});

	const formatDate = (date) => {
		if (!date) return "";
		return dayjs(date).format("DD-MM-YYYY");
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				pickerRef.current &&
				!pickerRef.current.contains(event.target) &&
				triggerRef.current &&
				!triggerRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (isOpen && triggerRef.current) {
			setPopupStyle({
				position: "absolute",
				top: "100%",
				right: 0,
				marginTop: "8px",
				zIndex: 50,
			});
		}
	}, [isOpen]);

	const generateCalendarDays = (date) => {
		const year = date.year();
		const month = date.month();
		const firstDayOfMonth = dayjs().year(year).month(month).date(1);
		const startDay = firstDayOfMonth.day();

		const days = [];
		let dayCounter = firstDayOfMonth.subtract(startDay, "day");

		for (let i = 0; i < 42; i++) {
			days.push(dayCounter.toDate());
			dayCounter = dayCounter.add(1, "day");
		}
		return days;
	};

	const handleDateClick = (date) => {
		if (!tempStartDate || dayjs(tempEndDate).isSame(tempStartDate, "day")) {
			setTempStartDate(dayjs(date));
			setTempEndDate(null);
		} else if (dayjs(date).isBefore(tempStartDate)) {
			setTempEndDate(tempStartDate);
			setTempStartDate(dayjs(date));
		} else {
			setTempEndDate(dayjs(date));
		}
	};

	const handleApply = () => {
		if (tempStartDate && tempEndDate) {
			setStartDate(tempStartDate);
			setEndDate(tempEndDate);
			onDateChange([
				tempStartDate.format("YYYY-MM-DD"),
				tempEndDate.format("YYYY-MM-DD"),
			]);

			setIsOpen(false);
		}
	};

	const handleCancel = () => {
		setTempStartDate(startDate);
		setTempEndDate(endDate);
		setIsOpen(false);
	};

	const isDateInRange = (date) => {
		if (!tempStartDate || !tempEndDate) return false;
		const normalizedDate = dayjs(date).startOf("day");
		const start = dayjs(tempStartDate).startOf("day");
		const end = dayjs(tempEndDate).startOf("day");
		return normalizedDate.isBetween(start, end, null, "[]");
	};

	const isDateSelected = (date) => {
		const normalizedDate = dayjs(date).startOf("day");
		return (
			(tempStartDate && normalizedDate.isSame(tempStartDate, "day")) ||
			(tempEndDate && normalizedDate.isSame(tempEndDate, "day"))
		);
	};

	const days = generateCalendarDays(currentMonth);
	const monthNames = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];
	const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

	return (
		<div className="relative">
			<div
				ref={triggerRef}
				className="bg-gray-100 p-4 rounded-lg flex-1 cursor-pointer hover:bg-gray-200 transition-colors"
				onClick={() => {
					setTempStartDate(startDate);
					setTempEndDate(endDate);
					setIsOpen(!isOpen);
				}}>
				<h4 className="text-sm font-semibold text-gray-700 mb-1">
					Rentang Tanggal
				</h4>
				<div className="flex items-center text-gray-600">
					<CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
					<p className="text-sm font-medium">
						{startDate && endDate
							? `${formatDate(startDate)} - ${formatDate(endDate)}`
							: "Pilih rentang tanggal"}
					</p>
				</div>
			</div>
			{isOpen && (
				<div
					ref={pickerRef}
					style={popupStyle}
					className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80">
					<div className="flex items-center justify-between mb-4">
						<button
							onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
							className="p-1 hover:bg-gray-100 rounded">
							<ChevronLeft className="w-4 h-4" />
						</button>
						<h3 className="font-semibold text-gray-900">
							{monthNames[currentMonth.month()]} {currentMonth.year()}
						</h3>
						<button
							onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
							className="p-1 hover:bg-gray-100 rounded">
							<ChevronRight className="w-4 h-4" />
						</button>
					</div>

					<div className="grid grid-cols-7 gap-1 mb-2">
						{dayNames.map((day) => (
							<div
								key={day}
								className="text-center text-xs font-medium text-gray-500 p-2">
								{day}
							</div>
						))}
					</div>

					<div className="grid grid-cols-7 gap-1 mb-4">
						{days.map((day, index) => {
							const dayjsDate = dayjs(day);
							const isCurrentMonth = dayjsDate.month() === currentMonth.month();
							const isToday = dayjsDate.isSame(dayjs(), "day");
							const selected = isDateSelected(day);
							const inRange = isDateInRange(day);

							return (
								<button
									key={index}
									onClick={() => isCurrentMonth && handleDateClick(day)}
									disabled={!isCurrentMonth}
									className={` p-2 text-sm rounded transition-colors
                                            	${
																								!isCurrentMonth
																									? "text-gray-300 cursor-not-allowed"
																									: "text-gray-900 hover:bg-blue-50 cursor-pointer"
																							}
                                            	${isToday ? "font-bold" : ""}
                                            	${
																								selected
																									? "bg-blue-500 text-white hover:bg-blue-600"
																									: ""
																							}
                                            	${
																								inRange && !selected
																									? "bg-blue-100 text-blue-900"
																									: ""
																							} 
											`}>
									{dayjsDate.date()}
								</button>
							);
						})}
					</div>
					<div className="mb-4 text-sm text-gray-600">
						{tempStartDate && (
							<p>
								Mulai:{" "}
								<span className="font-medium">{formatDate(tempStartDate)}</span>
							</p>
						)}
						{tempEndDate && (
							<p>
								Berakhir:{" "}
								<span className="font-medium">{formatDate(tempEndDate)}</span>
							</p>
						)}
					</div>
					<div className="flex justify-end space-x-2">
						<button
							onClick={handleCancel}
							className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
							Batal
						</button>
						<button
							onClick={handleApply}
							disabled={!tempStartDate || !tempEndDate}
							className={`
                                    px-3 py-1 text-sm rounded transition-colors
                                    ${
																			tempStartDate && tempEndDate
																				? "bg-blue-500 text-white hover:bg-blue-600"
																				: "bg-gray-300 text-gray-500 cursor-not-allowed"
																		}
                                `}>
							Terapkan
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DateRangePicker;
