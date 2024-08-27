import { useState } from "react";
import axios from "axios";

const TrainHistory = () => {
  const [date, setDate] = useState("");
  const [trainHistory, setTrainHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTimeFromTimestamp = (timestamp) => {
    // Create a new Date object from the timestamp
    const date = new Date(timestamp);
    
    // Extract hours, minutes, and seconds
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    
    // Format the time as HH:MM:SS
    return `${hours}:${minutes}`;
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      // Ensure the date has time and timezone components
      const formattedDate = new Date(date).toISOString();
      const response = await axios.get(`http://localhost:8800/api/train-history?date=${formattedDate}`);
      setTrainHistory(response.data);
      setError(null);
    } catch (err) {
      setError("Train history not found for the given date.");
      setTrainHistory([]);
    } finally {
      setLoading(false);
    }
  };

  console.log(trainHistory)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Train History</h2>
        <div className="flex gap-4">
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
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
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
          {trainHistory.map((train, index) => (
            train.locations.map((location, locIndex) => (
              <tr key={`${index}-${locIndex}`}>
                <td className="border px-4 py-2">{train.trainName}</td>
                <td className="border px-4 py-2">{location.location || 'N/A'}</td>
                <td className="border px-4 py-2">{location.latitude || 'N/A'}</td>
                <td className="border px-4 py-2">{location.longitude || 'N/A'}</td>
                <td className="border px-4 py-2">{getTimeFromTimestamp(location.arrivalTime) || 'N/A'}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainHistory;
