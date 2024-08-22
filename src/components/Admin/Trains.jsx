import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Trains = () => {
  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:8800/api/train/get-trains"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrain, setNewTrain] = useState({
    trainName: "",
    routeName: "",
  });
  const [editingTrainId, setEditingTrainId] = useState(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/train/remove/${id}`);
      reFetch();
    } catch (error) {
      console.error("Error deleting train:", error);
    }
  };

  const handleTrainSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTrainId) {
        // Update train
        await axios.put(
          `http://localhost:8800/api/train/update-train/${editingTrainId}`,
          newTrain
        );
      } else {
        // Add new train
        await axios.post("http://localhost:8800/api/train/add", newTrain);
      }
      reFetch();
      setIsModalOpen(false);
      setNewTrain({
        trainName: "",
        routeName: "",
      });
      setEditingTrainId(null); // Reset editing state
    } catch (error) {
      console.error("Error handling train:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTrain({
      ...newTrain,
      [name]: value,
    });
  };

  const handleEditTrain = (train) => {
    setNewTrain({
      trainName: train.trainName,
      routeName: train.routeName,
    });
    setEditingTrainId(train._id);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Trains</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditingTrainId(null); // Ensure the form is in add mode
            setNewTrain({
              trainName: "",
              routeName: "",
            });
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New Train
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Train Name</th>
            <th className="py-2 px-4 border">Route Name</th>
            <th className="py-2 px-4 border">Location</th>
            <th className="py-2 px-4 border">Latitude</th>
            <th className="py-2 px-4 border">Longitude</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((train) => (
            <tr key={train._id}>
              <td className="border px-4 py-2">{train.trainName}</td>
              <td className="border px-4 py-2">{train.routeName}</td>
              <td className="border px-4 py-2">{train.location}</td>
              <td className="border px-4 py-2">{train.latitude}</td>
              <td className="border px-4 py-2">{train.longitude}</td>
              <td className="border px-4 py-2 flex">
                <button
                  onClick={() => handleDelete(train._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleEditTrain(train)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-12 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingTrainId ? "Update Train" : "Add New Train"}
            </h2>
            <form onSubmit={handleTrainSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Train Name
                </label>
                <input
                  type="text"
                  name="trainName"
                  value={newTrain.trainName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Route Name
                </label>
                <input
                  type="text"
                  name="routeName"
                  value={newTrain.routeName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {editingTrainId ? "Update Train" : "Add Train"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
              {error && <span>{error.message}</span>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trains;
