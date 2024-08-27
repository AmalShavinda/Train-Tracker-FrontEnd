import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

const Engine = () => {
  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:8800/api/engine/get-engines"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEngine, setNewEngine] = useState({
    engineId: "",
    engineType: "",
    engineRoute: "",
    status: "",
  });
  const [editingEngineId, setEditingEngineId] = useState(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/engine/remove/${id}`);
      reFetch();
    } catch (error) {
      console.error("Error deleting engine:", error);
    }
  };

  const handleEngineSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEngineId) {
        // Update engine
        await axios.put(
          `http://localhost:8800/api/engine/update-engine/${editingEngineId}`,
          newEngine
        );
      } else {
        // Add new engine
        await axios.post("http://localhost:8800/api/engine/add", newEngine);
      }
      reFetch();
      setIsModalOpen(false);
      setNewEngine({
        engineId: "",
        engineType: "",
        engineRoute: "",
        status: "",
      });
      setEditingEngineId(null); // Reset editing state
    } catch (error) {
      console.error("Error handling engine:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEngine({
      ...newEngine,
      [name]: value,
    });
  };

  const handleEditEngine = (engine) => {
    setNewEngine({
      engineId: engine.engineId,
      engineType: engine.engineType,
      status: engine.status || "",
    });
    setEditingEngineId(engine._id);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Engines</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditingEngineId(null); // Ensure the form is in add mode
            setNewEngine({
              engineId: "",
              engineType: "",
              engineRoute: "",
              status: "",
            });
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New Engine
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Engine Id</th>
            <th className="py-2 px-4 border">Engine Type</th>
            <th className="py-2 px-4 border">Engine Route</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((engine) => (
            <tr key={engine._id}>
              <td className="border px-4 py-2">{engine.engineId}</td>
              <td className="border px-4 py-2">{engine.engineType}</td>
              <td className="border px-4 py-2">{engine.engineRoute}</td>
              <td className="border px-4 py-2">{engine.status}</td>
              <td className="border px-4 py-2 flex gap-5">
                <RiDeleteBin6Line
                  size={20}
                  onClick={() => handleDelete(engine._id)}
                  className="cursor-pointer text-red-500 hover:text-red-600"
                />
                <FaRegEdit
                  size={20}
                  onClick={() => handleEditEngine(engine)}
                  className="cursor-pointer text-blue-500 hover:text-blue-600"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-12 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingEngineId ? "Update Engine" : "Add New Engine"}
            </h2>
            <form onSubmit={handleEngineSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Engine ID
                </label>
                <input
                  type="text"
                  name="engineId"
                  value={newEngine.engineId}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Engine Type
                </label>
                <input
                  type="text"
                  name="engineType"
                  value={newEngine.engineType}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Engine Route
                </label>
                <select
                  type="text"
                  name="engineRoute"
                  value={newEngine.engineRoute}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled selected>
                    Select Engine Route
                  </option>
                  <option value="R001">Matara - Maradana</option>
                  <option value="R002">Beliatta - Maradana</option>
                  <option value="R003">Maradana - Polonnaruwa</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </label>
                <select
                  type="text"
                  name="status"
                  value={newEngine.status}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled selected>
                    Select Engine Type
                  </option>
                  <option value="FTA">Free to Attched</option>
                  <option value="ATT">Attched</option>
                  <option value="UNM">Under Maintain</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {editingEngineId ? "Update Engine" : "Add Engine"}
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

export default Engine;
