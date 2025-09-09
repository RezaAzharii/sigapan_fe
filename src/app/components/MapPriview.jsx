import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapPriview = ({
	latitude,
	longitude,
	nama,
	pedagang,
	kios,
	kantor,
	bango,
	wc,
	tps,
}) => {
	return (
		<MapContainer
			center={[latitude, longitude]}
			zoom={15}
			scrollWheelZoom={true}
			dragging={true}
			doubleClickZoom={true}
			touchZoom={true}
			style={{ height: "100%", width: "100%" }}>
			<TileLayer
				attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[latitude, longitude]}>
				<Popup>
					<div className="w-[200px]">
						<h4 className="text-sm font-semibold text-gray-800 m-0">{nama}</h4>
						<div className="">
							<ul>
								<li>{pedagang} Pedagang</li>
								<li>{kios} Kios</li>
								<li>{kantor} Kantor</li>
								<li>{bango} Bango</li>
								<li>{wc} WC</li>
								<li>{tps} Tempat Sampah</li>
							</ul>
						</div>
					</div>
				</Popup>
			</Marker>
		</MapContainer>
	);
};

export default MapPriview;
