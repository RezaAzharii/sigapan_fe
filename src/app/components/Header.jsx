import { useState, useEffect } from "react";
import logo from "../../assets/logo/nav-log.png";
import { Menu, X } from "lucide-react"; // Import ikon dari Lucide React

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			if (scrollTop > 10) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleSmoothScroll = (e, targetId) => {
		e.preventDefault();
		setIsMenuOpen(false);
		const targetElement = document.querySelector(targetId);
		if (targetElement) {
			window.scrollTo({
				top: targetElement.offsetTop - 50,
				behavior: "smooth",
			});
		}
	};

	return (
		<>
			<nav
				className={`border-gray-200 transition-all duration-300 fixed top-0 left-0 w-full z-50 ${
					isScrolled
						? "bg-[#3E5F44] shadow-lg py-0"
						: "bg-[#93DA97] bg-opacity-95 "
				}`}>
				<div className="w-full flex items-center justify-between px-3 sm:px-6 py-2 sm:py-4">
					<a
						href="#"
						className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse min-w-0 flex-1 mr-2 sm:mr-4"
						onClick={(e) => {
							e.preventDefault();
							window.scrollTo({ top: 0, behavior: "smooth" });
							setIsMenuOpen(false);
						}}>
						<img
							src={logo}
							className={`transition-all duration-300 flex-shrink-0 ${
								isScrolled ? "h-8 sm:h-10" : "h-10 sm:h-12 md:h-16"
							}`}
							alt="Bantul Logo"
						/>
						<div className="flex flex-col min-w-0 flex-1">
							<span
								className={`text-xs sm:text-sm md:text-lg font-medium transition-colors duration-300 leading-tight ${
									isScrolled ? "text-[#E8FFD7]" : "text-gray-800"
								}`}>
								<span className="sm:block">Pemerintah Kabupaten Bantul</span>
							</span>
							<span
								className={`transition-all duration-300 leading-tight ${
									isScrolled
										? "text-xs sm:text-base font-semibold text-white"
										: "text-xs sm:text-base md:text-lg font-semibold text-gray-800"
								}`}>
								<span className="lg:whitespace-nowrap">
									DINAS KOPERASI, UKM, PERINDUSTRIAN DAN PERDAGANGAN
								</span>
							</span>
						</div>
					</a>

					{/* Tombol Hamburger dengan ikon dinamis */}
					<button
						onClick={toggleMenu}
						type="button"
						className={`hidden max-md:flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg hover:bg-[#E8FFD7] hover:bg-opacity-20 flex-shrink-0 transition-colors duration-300 ${
							isScrolled ? "text-[#E8FFD7]" : "text-gray-700"
						}`}
						aria-controls="navbar-solid-bg"
						aria-expanded={isMenuOpen}>
						<span className="sr-only">Open main menu</span>
						{isMenuOpen ? (
							<X className="w-10 h-10" />
						) : (
							<Menu className="w-10 h-10" />
						)}
					</button>

					<div className="hidden md:block md:w-auto" id="navbar-solid-bg">
						<ul className="flex flex-row font-medium space-x-8 rtl:space-x-reverse">
							<li>
								<a
									href="#"
									className={`nvb block p-0 bg-transparent transition-all duration-500 ease-in-out transform hover:scale-105 font-bold decoration-2 ${
										isScrolled
											? "text-[#E8FFD7] decoration-[#E8FFD7] hover:bg-transparent hover:text-[#93DA97]"
											: "text-[#3E5F44] decoration-[#3E5F44] hover:bg-transparent hover:text-[#5E936C]"
									}`}
									aria-current="page"
									onClick={(e) => {
										e.preventDefault();
										window.scrollTo({ top: 0, behavior: "smooth" });
										setIsMenuOpen(false);
									}}>
									Home
								</a>
							</li>
							<li>
								<a
									href="#harga-pangan"
									className={`nvb block p-0 whitespace-nowrap border-0 transition-all duration-500 ease-in-out transform hover:scale-105 font-medium ${
										isScrolled
											? "text-[#E8FFD7] hover:bg-transparent hover:text-[#93DA97]"
											: "text-gray-800 hover:bg-transparent hover:text-[#3E5F44]"
									}`}
									onClick={(e) => handleSmoothScroll(e, "#harga-pangan")}>
									Bahan Pokok
								</a>
							</li>
							<li>
								<a
									href="#daftar-pasar"
									className={`nvb block p-0 border-0 transition-all duration-500 ease-in-out transform hover:scale-105 font-medium ${
										isScrolled
											? "text-[#E8FFD7] hover:bg-transparent hover:text-[#93DA97]"
											: "text-gray-800 hover:bg-transparent hover:text-[#3E5F44]"
									}`}
									onClick={(e) => handleSmoothScroll(e, "#daftar-pasar")}>
									Pasar
								</a>
							</li>
							<li>
								<a
									href="#kontak"
									className={`nvb block p-0 whitespace-nowrap border-0 transition-all duration-500 ease-in-out transform hover:scale-105 font-medium ${
										isScrolled
											? "text-[#E8FFD7] hover:bg-transparent hover:text-[#93DA97]"
											: "text-gray-800 hover:bg-transparent hover:text-[#3E5F44]"
									}`}
									onClick={(e) => handleSmoothScroll(e, "#kontak")}>
									Kontak Kami
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div
					className={`${
						isMenuOpen ? "block" : "hidden"
					} md:hidden w-full border-t ${
						isScrolled
							? "border-[#5E936C] bg-[#3E5F44]"
							: "border-[#5E936C] bg-[#93DA97]"
					} bg-opacity-98`}>
					<ul className="flex flex-col font-medium px-3 py-2 space-y-1">
						<li>
							<a
								href="#"
								className={`block py-3 px-4 rounded-lg transition-all duration-300 font-bold ${
									isScrolled
										? "text-[#E8FFD7] bg-[#5E936C] hover:bg-[#93DA97] hover:text-gray-800"
										: "text-white bg-[#5E936C] hover:bg-[#3E5F44] hover:text-white"
								}`}
								aria-current="page"
								onClick={(e) => {
									e.preventDefault();
									window.scrollTo({ top: 0, behavior: "smooth" });
									setIsMenuOpen(false);
								}}>
								Home
							</a>
						</li>
						<li>
							<a
								href="#harga-pangan"
								className={`block py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
									isScrolled
										? "text-[#E8FFD7] hover:bg-[#5E936C] hover:text-white"
										: "text-gray-800 hover:bg-[#5E936C] hover:text-white"
								}`}
								onClick={(e) => handleSmoothScroll(e, "#harga-pangan")}>
								Harga Pangan
							</a>
						</li>
						<li>
							<a
								href="#daftar-pasar"
								className={`block py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
									isScrolled
										? "text-[#E8FFD7] hover:bg-[#5E936C] hover:text-white"
										: "text-gray-800 hover:bg-[#5E936C] hover:text-white"
								}`}
								onClick={(e) => handleSmoothScroll(e, "#daftar-pasar")}>
								Pasar
							</a>
						</li>
						<li>
							<a
								href="#kontak"
								className={`block py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
									isScrolled
										? "text-[#E8FFD7] hover:bg-[#5E936C] hover:text-white"
										: "text-gray-800 hover:bg-[#5E936C] hover:text-white"
								}`}
								onClick={(e) => handleSmoothScroll(e, "#kontak")}>
								Kontak Kami
							</a>
						</li>
					</ul>
				</div>
			</nav>
			<div className="h-[59px] sm:h-2 md:h-24"></div>
		</>
	);
};

export default Header;
