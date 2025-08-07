import Carousel from "../components/Carousel";
import DaftarPasar from "../components/DaftarPasar";
import BahanPokokGrid from "../components/DaftarBapok/BahanPokokGrid";

const Home = () => {
	return (
		<div id="home" className="flex flex-col min-h-screen">
			<section className="w-full h-auto relative">
				<Carousel />
			</section>

			<section id="harga-pangan" className="w-full py-12 md:py-16 bg-white">
				<BahanPokokGrid />
			</section>

			<section id="daftar-pasar">
				<DaftarPasar />
			</section>
		</div>
	);
};

export default Home;
