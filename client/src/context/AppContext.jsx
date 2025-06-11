import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  // ✅ Use dynamic backend URL based on environment
  const backendUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:4000"
      : "https://comptrack-backend.onrender.com";

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState([]);
  const [getIssue, SetGetIssue] = useState([]);
  const [userIssues, setUserIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
        await fetchAllUsers();
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/all-users`);
      setAllUsers(response.data.users);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/Data`);
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const getAllIssues = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/issue/issues`);
      SetGetIssue(response.data);
    } catch (error) {
      toast.error(error.message || "Error fetching issues");
    }
  };

  const fetchUserIssues = async (userName) => {
    try {
      const res = await fetch(`${backendUrl}/api/issue/issues/user/${userName}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch user issues");
      const data = await res.json();
      setUserIssues(data);
    } catch (error) {
      console.error("Error fetching user issues:", error);
      setUserIssues([]);
    }
  };

  const submitIssue = async ({ name, issueType, description }) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/issue/issues`,
        { name, issueType, description },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 201) {
        setUserIssues((prev) => [res.data.issue, ...prev]);
        toast.success("Issue submitted successfully");
        return { success: true };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit issue");
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };

  const deleteUserIssue = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/api/issue/issues/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete issue");

      setUserIssues((prevIssues) => prevIssues.filter((issue) => issue._id !== id));
      return true;
    } catch (error) {
      console.error("Error deleting issue:", error);
      return false;
    }
  };

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    getAllIssues,
    getIssue,
    fetchUserIssues,
    userIssues,
    submitIssue,
    deleteUserIssue,
    isLoading,
    allUsers,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
