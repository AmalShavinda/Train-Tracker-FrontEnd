import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [trainLocation, setTrainLocation] = useState(null);
  const { id } = useParams(); // Correctly destructure trainID from useParams

  useEffect(() => {
    const fetchTrainLocation = async () => {
      try {
        const res = await fetch(
          `http://localhost:8800/api/train/get-train/${id}`
        );
        const data = await res.json();
        setTrainLocation({
          latitude: data.latitude,
          longitude: data.longitude,
          location: data.location,
        });
      } catch (error) {
        console.error("Error fetching train location: ", error);
      }
    };
    fetchTrainLocation();

    const intervalId = setInterval(fetchTrainLocation, 60000); // Fetch location every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [id]); // Use trainID as the dependency

  if (!trainLocation) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      center={[trainLocation.latitude, trainLocation.longitude]}
      zoom={10}
      style={{ height: "100vh", width: "100%" }}
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
  );
};

export default Map;
