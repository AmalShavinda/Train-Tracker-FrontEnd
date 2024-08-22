import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Users = () => {
  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:8800/api/users/get-users"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstname: "",
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [updateUser, setUpdateUser] = useState({
    firstname: "",
    username: "",
    email: "",
    isAdmin: false,
  });
  const [editingUserId, setEditingUserId] = useState(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/users/remove/${id}`);
      reFetch();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUserId) {
        // Update user
        await axios.put(
          `http://localhost:8800/api/users/update-user/${editingUserId}`,
          updateUser
        );
      } else {
        // Add new user
        await axios.post("http://localhost:8800/api/auth/register", newUser);
      }
      reFetch();
      setIsModalOpen(false);
      setNewUser({
        firstname: "",
        username: "",
        email: "",
        password: "",
        isAdmin: false,
      });
      setEditingUserId(null); // Reset editing state
    } catch (error) {
      console.error("Error handling user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: name === "isAdmin" ? value === "true" : value,
    });
    setUpdateUser({
      ...newUser,
      [name]: name === "isAdmin" ? value === "true" : value,
    });
  };

  const handleEditUser = (user) => {
    setNewUser({
      firstname: user.firstname,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    setEditingUserId(user._id);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditingUserId(null); // Ensure the form is in add mode
            setNewUser({
              firstname: "",
              username: "",
              email: "",
              password: "",
              isAdmin: false,
            });
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New User
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">First Name</th>
            <th className="py-2 px-4 border">User Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.firstname}</td>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {user.isAdmin ? "Admin" : "User"}
              </td>
              <td className="border px-4 py-2 flex">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleEditUser(user)}
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
              {editingUserId ? "Update User" : "Add New User"}
            </h2>
            <form onSubmit={handleUserSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={newUser.firstname}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required={!editingUserId}
                  disabled={editingUserId} // Password required only for new users
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Role
                </label>
                <select
                  name="isAdmin"
                  value={newUser.isAdmin ? "true" : "false"}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="false">User</option>
                  <option value="true">Admin</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {editingUserId ? "Update User" : "Add User"}
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

export default Users;
