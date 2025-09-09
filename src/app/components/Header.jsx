import logo from "../../assets/logo/nav-log.png";
import { Menu, X } from "lucide-react";
import { useScroll } from "../hooks/useScroll";

const Header = () => {
	const {
		isScrolled,
		toggleMenu,
		handleSmoothScroll,
		setIsMenuOpen,
		isMenuOpen,
	} = useScroll();

	return (
		<>
			<nav
				className={`border-gray transition-all bg-[#3E5F44] duration-300 fixed top-0 left-0 w-full z-50 ${
					isScrolled ? "shadow-lg" : "bg-opacity-95 "
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
								className={`text-xs text-[#E8FFD7] sm:text-sm md:text-lg font-medium transition-colors duration-300 leading-tight`}>
								<span className="sm:block">Pemerintah Kabupaten Bantul</span>
							</span>
							<span
								className={`transition-all duration-300 leading-tight text-xs sm:text-base font-semibold text-white 
								`}>
								<span className="lg:whitespace-nowrap">
									DINAS KOPERASI, UKM, PERINDUSTRIAN DAN PERDAGANGAN
								</span>
							</span>
						</div>
					</a>

					<button
						onClick={toggleMenu}
						type="button"
						className={`hidden max-md:flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg flex-shrink-0 transition-colors duration-300 text-[#E8FFD7] hover:text-[#e8ffd79b] hover:bg-[#93da9739] hover:bg-opacity-20`}
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
									href="#beranda"
									className={`nvb block p-0 bg-transparent transition-all duration-500 ease-in-out transform hover:scale-105 font-medium decoration-2  text-[#E8FFD7] decoration-[#E8FFD7] hover:bg-transparent hover:text-[#93DA97]`}
									aria-current="page"
									onClick={(e) => {
										e.preventDefault();
										window.scrollTo({ top: 0, behavior: "smooth" });
										setIsMenuOpen(false);
									}}>
									Beranda
								</a>
							</li>
							<li>
								<a
									href="#harga-pangan"
									className={`nvb block p-0 whitespace-nowrap border-0 transition-all duration-500 ease-in-out transform hover:scale-105 font-medium text-[#E8FFD7] decoration-[#E8FFD7] hover:bg-transparent hover:text-[#93DA97] `}
									onClick={(e) => handleSmoothScroll(e, "#harga-pangan")}>
									Bahan Pokok
								</a>
							</li>
							<li>
								<a
									href="#daftar-pasar"
									className={`nvb block p-0 border-0 transition-all duration-500 ease-in-out transform hover:scale-105 font-medium text-[#E8FFD7] decoration-[#E8FFD7] hover:bg-transparent hover:text-[#93DA97]`}
									onClick={(e) => handleSmoothScroll(e, "#daftar-pasar")}>
									Pasar
								</a>
							</li>
							<li>
								<a
									href="#kontak"
									className={`nvb block p-0 whitespace-nowrap border-0 transition-all duration-500 ease-in-out transform hover:scale-105 font-medium text-[#E8FFD7] decoration-[#E8FFD7] hover:bg-transparent hover:text-[#93DA97]`}
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
					} md:hidden w-full border-t border-[#5E936C] bg-[#3E5F44] bg-opacity-98`}>
					<ul className="flex flex-col font-medium px-3 py-2 space-y-1">
						<li>
							<a
								href="#"
								className={`block py-3 px-4 rounded-lg transition-all duration-300 font-medium text-[#E8FFD7] hover:bg-[#5E936C] hover:text-white`}
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
								className={`block py-3 px-4 rounded-lg transition-all duration-300 font-medium text-[#E8FFD7] hover:bg-[#5E936C] hover:text-white`}
								onClick={(e) => handleSmoothScroll(e, "#harga-pangan")}>
								Harga Pangan
							</a>
						</li>
						<li>
							<a
								href="#daftar-pasar"
								className={`block py-3 px-4 rounded-lg transition-all duration-300 font-medium text-[#E8FFD7] hover:bg-[#5E936C] hover:text-white`}
								onClick={(e) => handleSmoothScroll(e, "#daftar-pasar")}>
								Pasar
							</a>
						</li>
						<li>
							<a
								href="#kontak"
								className={`block py-3 px-4 rounded-lg transition-all duration-300 font-medium text-[#E8FFD7] hover:bg-[#5E936C] hover:text-white`}
								onClick={(e) => handleSmoothScroll(e, "#kontak")}>
								Kontak Kami
							</a>
						</li>
					</ul>
				</div>
			</nav>
			<div className="h-[59px] sm:h-2 md:h-0"></div>
		</>
	);
};

export default Header;
