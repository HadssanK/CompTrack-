import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const RaiseIssue = () => {
  const { userData, submitIssue } = useContext(AppContext);
  const [subject, setSubject] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !issueType || !description) {
      setMessage({ type: "error", text: "Please fill all fields." });
      return;
    }

    setLoading(true);
    setMessage(null);

    const response = await submitIssue({
      name: userData?.Name || "Unknown",
      issueType: issueType || subject,
      description,
    });

    setLoading(false);

    if (response.success) {
      setMessage({ type: "success", text: "Issue submitted successfully!" });
      setSubject("");
      setIssueType("");
      setDescription("");
    } else {
      setMessage({ type: "error", text: response.message || "Failed to submit issue" });
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Raise a New Issue</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-5">
        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter issue subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Salary">Salary</option>
            <option value="IT Support">IT Support</option>
            <option value="Leave Request">Leave Request</option>
            <option value="HR Complaint">HR Complaint</option>
            <option value="Network">Network</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows="4"
            placeholder="Describe your issue in detail"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {message && (
          <p
            className={`text-sm ${
              message.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </div>
  );
};

export default RaiseIssue;
