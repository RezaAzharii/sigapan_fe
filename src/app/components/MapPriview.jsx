import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapPriview = ({ latitude, longitude, nama }) => {
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
				<Popup>{nama}</Popup>
			</Marker>
		</MapContainer>
	);
};

export default MapPriview;
