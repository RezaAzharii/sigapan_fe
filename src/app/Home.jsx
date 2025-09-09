import Carousel from "./components/Carousel";
import DaftarPasar from "./components/DaftarPasar";
import BahanPokokGrid from "./components/DaftarBapok/BahanPokokGrid";
import Footer from "./components/Footer";

const Home = () => {
	return (
		<div
			id="beranda"
			className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
			<section className="w-full h-auto relative">
				<Carousel />
			</section>

			<section id="harga-pangan" className="py-12">
				<BahanPokokGrid />
			</section>

			<section id="daftar-pasar" className="py-12">
				<DaftarPasar />
			</section>

			<section id="kontak">
				<Footer />
			</section>
		</div>
	);
};

export default Home;
