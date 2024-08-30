import { useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const TrainHistory = () => {
  const [date, setDate] = useState("");
  const [trainName, setTrainName] = useState(""); // State to hold selected train name
  const [trainHistory, setTrainHistory] = useState([]);
  const [err, setErr] = useState(null);
  const [load, setLoad] = useState(false);

  const { data, loading, error, reFetch } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/train/get-trains`
  );

  const getTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSearch = async () => {
    try {
      setLoad(true);
      const formattedDate = new Date(date).toISOString().split("T")[0];
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/train-history/?trainName=${trainName}&date=${formattedDate}`
      );
      
      // Check if the response data is an array
      if (Array.isArray(response.data)) {
        setTrainHistory(response.data);
      } else {
        setTrainHistory([response.data]); // Convert the single object to an array
      }
      
      setErr(null);
    } catch (err) {
      setErr("Train history not found for the given date.");
      setTrainHistory([]);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Train History</h2>
        <div className="flex gap-4">
          <select
            name="train"
            id="train"
            value={trainName} // Bind select value to state
            onChange={(e) => setTrainName(e.target.value)} // Update state when option is selected
            className="p-2 px-6"
          >
            <option value="" disabled>Select Train</option> {/* Placeholder option */}
            {data.map((train) => (
              <option key={train._id} value={train.trainName}>
                {train.trainName}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-5"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
          >
            Search
          </button>
        </div>
      </div>
      {load && <p>Loading...</p>}
      {err && <p className="text-red-500">{err}</p>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Train Name</th>
            <th className="py-2 px-4 border">Location</th>
            <th className="py-2 px-4 border">Latitude</th>
            <th className="py-2 px-4 border">Longitude</th>
            <th className="py-2 px-4 border">Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          {trainHistory.map((train, index) => 
            train.locations.map((location, locIndex) => (
              <tr key={`${index}-${locIndex}`}>
                <td className="border px-4 py-2">{train.trainName}</td>
                <td className="border px-4 py-2">{location.location}</td>
                <td className="border px-4 py-2">{location.latitude}</td>
                <td className="border px-4 py-2">{location.longitude}</td>
                <td className="border px-4 py-2">{getTimeFromTimestamp(location.arrivalTime)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrainHistory;
