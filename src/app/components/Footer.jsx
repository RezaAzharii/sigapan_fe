import { useEffect, useState } from "react";
import logo from "../../assets/logo/nav-log.png";
import {
	FaFacebookF,
	FaInstagram,
	FaMapMarkerAlt,
	FaPhoneAlt,
	FaYoutube,
} from "react-icons/fa";
import { FaEnvelope, FaXTwitter } from "react-icons/fa6";
import { Eye } from "lucide-react";
import { LuCodeXml } from "react-icons/lu";
import { useScroll } from "../hooks/useScroll";

const Footer = () => {
	const { setIsMenuOpen } = useScroll();
	const [visitorCount, setVisitorCount] = useState(0);

	useEffect(() => {
		const currentCount = localStorage.getItem("visitorCount");
		if (currentCount) {
			const newCount = parseInt(currentCount) + 1;
			setVisitorCount(newCount);
			localStorage.setItem("visitorCount", newCount);
		} else {
			setVisitorCount(1);
			localStorage.setItem("visitorCount", 1);
		}
	}, []);

	return (
		<footer className="bg-[#3E5F44] text-white text-sm">
			<div className="max-w-7xl mx-auto px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
					<div>
						<div className="flex items-start gap-4 mb-5">
							<img
								href={"#"}
								onClick={(e) => {
									e.preventDefault();
									window.scrollTo({ top: 0, behavior: "smooth" });
									setIsMenuOpen(false);
								}}
								src={logo}
								alt="Logo Bantul"
								className="w-30 h-20 object-contain"
							/>
							<div>
								<p className="text-green-200 text-xs mb-1">
									Pemerintah Kabupaten Bantul
								</p>
								<h2 className="font-semibold text-sm leading-snug text-white mb-1">
									DINAS KOPERASI, UKM, PERINDUSTRIAN DAN PERDAGANGAN
								</h2>
								<p className="text-green-200 text-xs">Kabupaten Bantul</p>
							</div>
						</div>

						<p className="text-green-100 leading-relaxed mb-6">
							Melayani masyarakat dalam bidang koperasi, UMKM, perindustrian,
							dan perdagangan.
						</p>

						<div className="flex items-center gap-3 bg-green-700 px-4 py-3 rounded-lg">
							<Eye className="w-5 h-5 text-green-300" />
							<p className="text-white">
								Pengunjung :{" "}
								<span className="font-semibold">{visitorCount}</span>
							</p>
						</div>
					</div>

					<div>
						<h3 className="font-semibold text-white text-base mb-4">Kontak</h3>
						<ul className="space-y-4 text-green-100">
							<li className="flex items-center gap-3">
								<FaMapMarkerAlt className="w-4 h-4 text-green-300" />
								<span>
									Komplek Pemda II Manding, Jl. Lingkar Timur Manding Trirenggo,
									Bantul
								</span>
							</li>
							<li className="flex items-center gap-3">
								<FaPhoneAlt className="w-4 h-4 text-green-300" />
								<span>0274-2810422 / 0812 2568 5517</span>
							</li>
							<li className="flex items-center gap-3">
								<FaEnvelope className="w-4 h-4 text-green-300" />
								<a
									href="mailto:diskukmpp@bantulkab.go.id"
									target="_blank"
									className="hover:underline">
									diskukmpp@bantulkab.go.id
								</a>
							</li>
							<li className="flex items-center gap-3">
								<LuCodeXml className="w-4 h-4 text-green-300" />
								<a
									href="https://diskumpp.bantulkab.go.id/"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:underline">
									diskumpp.bantulkab.go.id
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold text-white text-base mb-4">Tautan</h3>
						<ul className="space-y-2 text-green-100 mb-6">
							<li>
								<a
									href="https://bantulkab.go.id/"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:underline">
									Pemda Kabupaten Bantul
								</a>
							</li>
							<li>
								<a
									href="https://dkukmpp.bantulkab.go.id/"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:underline">
									Portal Koperasi & UKM
								</a>
							</li>
							<li>
								<a
									href="#"
									onClick={(e) => {
										e.preventDefault();
										window.scrollTo({ top: 0, behavior: "smooth" });
										setIsMenuOpen(false);
									}}
									rel="noopener noreferrer"
									className="hover:underline">
									Harga Bahan Pokok
								</a>
							</li>
							<li>
								<a
									href="https://bantulkab.go.id/"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:underline">
									Layanan Perizinan
								</a>
							</li>
						</ul>

						<h4 className="font-medium text-white text-sm mb-3">
							Media Sosial
						</h4>
						<div className="flex gap-3">
							{[
								{
									icon: <FaFacebookF />,
									label: "Facebook",
									href: "https://www.facebook.com/pemkabbantul/",
								},
								{
									icon: <FaXTwitter />,
									label: "Twitter",
									href: "https://twitter.com/pemkabbantul",
								},
								{
									icon: <FaInstagram />,
									label: "Instagram",
									href: "https://www.instagram.com/pemkabbantul/",
								},
								{
									icon: <FaYoutube />,
									label: "YouTube",
									href: "https://www.youtube.com/channel/UC3XfkK2AGWbJC9zINJQZUzw",
								},
							].map(({ icon, label, href }) => (
								<a
									key={label}
									target="_blank"
									href={href}
									className="w-8 h-8 bg-green-700 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
									aria-label={label}>
									<span className="text-white text-base">{icon}</span>
								</a>
							))}
						</div>
					</div>
				</div>

				<div className="border-t border-green-700 pt-6 text-center text-green-200 text-xs">
					&copy; {new Date().getFullYear()} Dinas Koperasi, UKM, Perindustrian
					dan Perdagangan Kabupaten Bantul
				</div>
			</div>
		</footer>
	);
};

export default Footer;
