import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const MyComplaints = () => {
  const { userData, userIssues, fetchUserIssues } = useContext(AppContext);

  useEffect(() => {
    if (userData?.Name) {
      fetchUserIssues(userData.Name);
    }
  }, [userData]);

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10">
      <h1 className="text-2xl font-bold mb-6">My Complaints</h1>
      <div className="space-y-6">
        {userIssues.length === 0 ? (
          <p>You have no complaints.</p>
        ) : (
          userIssues.map((item) => (
            <div
              key={item._id || item.id}
              className="border rounded-md p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{item.title || item.subject || item.issueType}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    item.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : item.status === "Accepted" || item.status === "Approved"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                Category: <strong>{item.issueType || "N/A"}</strong>
              </p>
              <p className="text-gray-700 mb-2">{item.description || "No description provided."}</p>
              <p className="text-xs text-gray-500">
                Submitted on: {new Date(item.createdAt || item.date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
