import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { userData, userIssues, fetchUserIssues, deleteUserIssue } = useContext(AppContext);

  useEffect(() => {
    if (userData?.Name) {
      fetchUserIssues(userData.Name);
    }
  }, [userData]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this complaint?");
    if (!confirmDelete) return;

    const success = await deleteUserIssue(id);
    if (success) {
      alert("Complaint deleted successfully!");
    } else {
      alert("Failed to delete the complaint.");
    }
  };

  return (
    <div className="p-6 sm:p-10">
      <h1 className="text-2xl font-bold mb-6">Welcome, {userData ? userData.Name : "user"}</h1>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div
          className="bg-blue-100 hover:bg-blue-200 cursor-pointer p-6 rounded-lg shadow"
          onClick={() => navigate('/raise-issue')}
        >
          <h2 className="text-lg font-semibold mb-2">Raise New Issue</h2>
          <p className="text-sm text-gray-700">Submit a new complaint or request.</p>
        </div>

        <div
          className="bg-green-100 hover:bg-green-200 cursor-pointer p-6 rounded-lg shadow"
          onClick={() => navigate('/my-complaints')}
        >
          <h2 className="text-lg font-semibold mb-2">My Complaints</h2>
          <p className="text-sm text-gray-700">View all your submitted complaints.</p>
        </div>

        <div
          className="bg-yellow-100 hover:bg-yellow-200 cursor-pointer p-6 rounded-lg shadow"
          onClick={() => navigate('/my-complaints')}
        >
          <h2 className="text-lg font-semibold mb-2">Track Status</h2>
          <p className="text-sm text-gray-700">Check the status of your complaints.</p>
        </div>
      </div>

      {/* Recent Complaints Overview */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Complaints</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Issue Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {userIssues.length > 0 ? (
              userIssues.map(issue => (
                <tr key={issue._id || issue.id} className="border-b">
                  <td className="p-3">{issue.issueType}</td>
                  <td
                    className={`p-3 ${
                      issue.status === "Accepted" ? "text-green-600" :
                      issue.status === "Pending" ? "text-yellow-600" :
                      "text-red-600"
                    }`}
                  >
                    {issue.status}
                  </td>
                  <td className="p-3">{new Date(issue.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(issue._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">No complaints found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
