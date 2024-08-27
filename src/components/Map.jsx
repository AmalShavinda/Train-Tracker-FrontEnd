// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const Map = () => {
//   const [trainLocation, setTrainLocation] = useState(null);
//   const { id } = useParams(); // Correctly destructure trainID from useParams

//   useEffect(() => {
//     const fetchTrainLocation = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:8800/api/train/get-train/${id}`
//         );
//         const data = await res.json();
//         setTrainLocation({
//           latitude: data.latitude,
//           longitude: data.longitude,
//           location: data.location,
//         });
//       } catch (error) {
//         console.error("Error fetching train location: ", error);
//       }
//     };
//     fetchTrainLocation();

//     const intervalId = setInterval(fetchTrainLocation, 60000); // Fetch location every minute

//     return () => clearInterval(intervalId); // Cleanup interval on component unmount
//   }, [id]); // Use trainID as the dependency

//   if (!trainLocation) {
//     return <div>Loading map...</div>;
//   }

//   return (
//     <MapContainer
//       center={[trainLocation.latitude, trainLocation.longitude]}
//       zoom={10}
//       style={{ height: "100vh", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={[trainLocation.latitude, trainLocation.longitude]}>
//         <Popup>
//           {trainLocation.location} <br />
//           {`Lat: ${trainLocation.latitude}, Lng: ${trainLocation.longitude}`}
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default Map;

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useFetch from "../hooks/useFetch";
import NavBar from "../components/NavBar";

const Map = () => {
  const { id } = useParams();
  const {
    data: trainLocation,
    loading,
    error,
    reFetch,
  } = useFetch(`http://localhost:8800/api/train/get-train/${id}`);

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
        className="flex justify-center items-center mt-10 w-[90vw] h-[90vh]"
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
    </div>
  );
};

export default Map;
