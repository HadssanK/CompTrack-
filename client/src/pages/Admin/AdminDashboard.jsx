import React, { useEffect, useState, useContext } from 'react';
import { FaUser, FaExclamationCircle, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { allUsers, backendUrl, setUserData , setIsLoggedin } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/issues`);
        setComplaints(response.data);
      } catch (err) {
        setError('Failed to fetch complaints');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [backendUrl]);

  const handleApprove = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/admin/issue/${id}/status`, {
        status: 'Accepted',
      });

      setComplaints((prev) =>
        prev.map((comp) =>
          comp._id === id ? { ...comp, status: 'Accepted' } : comp
        )
      );
    } catch (error) {
      console.error('Failed to approve complaint:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/admin/issue/${id}/status`, {
        status: 'Rejected',
      });

      setComplaints((prev) =>
        prev.map((comp) =>
          comp._id === id ? { ...comp, status: 'Rejected' } : comp
        )
      );
    } catch (error) {
      console.error('Failed to reject complaint:', error);
    }
  };

   const handleLogout = async () => {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/logout`,
          {},
          { withCredentials: true }
        );
        if (data.success) {
          setUserData(null);
          setIsLoggedin(false);
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Logout failed!");
      }
    };
  


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <FaUser className="text-blue-500 text-3xl" />
          <div>
            <p className="text-gray-600">Total Registered Users</p>
            <p className="text-xl font-bold">{allUsers.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <FaExclamationCircle className="text-red-500 text-3xl" />
          <div>
            <p className="text-gray-600">Total Complaints</p>
            <p className="text-xl font-bold">{complaints.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">User Complaints</h2>

        {loading ? (
          <p className="text-gray-500">Loading complaints...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">User</th>
                  <th className="py-2 px-4 text-left">Issue</th>
                  <th className="py-2 px-4 text-left">Description</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((comp) => (
                  <tr key={comp._id} className="border-b">
                    <td className="py-2 px-4">{comp._id}</td>
                    <td className="py-2 px-4">{comp.name || 'N/A'}</td>
                    <td className="py-2 px-4">{comp.issueType}</td>
                    <td className="py-2 px-4">{comp.description}</td>
                    <td
                      className={`py-2 px-4 font-semibold ${
                        comp.status === 'Accepted'
                          ? 'text-green-600'
                          : comp.status === 'Rejected'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {comp.status}
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        onClick={() => handleApprove(comp._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(comp._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
