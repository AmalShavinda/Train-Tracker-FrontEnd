import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useFetch from "../hooks/useFetch";
import NavBar from "../components/NavBar";
import Footer from "./Footer";

// Import marker icons manually
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";

// Set up the default icon to avoid missing icons in production
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerIconRetina,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // size of the shadow
});

// Set the default icon globally
L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {
  const { id } = useParams();
  const {
    data: trainLocation,
    loading,
    error,
    reFetch,
  } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/train/get-train/${id}`);

  useEffect(() => {
    const intervalId = setInterval(reFetch, 60000); // Re-fetch location every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [reFetch]);

  // Check if loading, error, or missing train location data
  if (loading) return <div>Loading map...</div>;
  if (error) return <div>Error fetching train location: {error.message}</div>;
  if (!trainLocation || !trainLocation.latitude || !trainLocation.longitude) {
    return <div>No valid train location data available</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <NavBar />
      </div>
      <MapContainer
        center={[trainLocation.latitude, trainLocation.longitude]}
        zoom={11}
        className="flex justify-center items-center my-10 w-[95vw] h-[90vh]"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[trainLocation.latitude, trainLocation.longitude]}>
          <Popup>
            {trainLocation.location} <br />
            {`Lat: ${trainLocation.latitude}, Lng: ${trainLocation.longitude}`}
          </Popup>
        </Marker>
      </MapContainer>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Map;
