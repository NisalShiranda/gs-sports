import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user'
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/all`);
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  const handleDelete = async (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
         await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/${email}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
        toast.success("User deleted");
        loadUsers();
      } catch (err) {
        toast.error("Failed to delete user");
      }
    }
  };

  const handleChangeRole = async (email, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
       await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/changerole/${email}`, 
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success("Role updated");
      loadUsers();
    } catch (err) {
      toast.error("Failed to change role");
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user`, formData);
      toast.success("User created");
      setShowCreateModal(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user'
      });
      loadUsers();
    } catch (err) {
      toast.error("Failed to create user");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          + Create User
        </button>
      </div>

      <table className="w-full table-auto text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.firstName} {user.lastName}</td>
                <td className="py-2 px-4 capitalize">{user.role}</td>
                <td className="py-2 px-4 flex gap-4 justify-center">
                  <button
                    onClick={() => handleChangeRole(user.email, user.role)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    Make {user.role === "admin" ? "User" : "Admin"}
                  </button>
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Create New User</h3>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUser;
