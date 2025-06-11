// ProtectedRoute.js
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userData } = useContext(AppContext);

  if (!userData || userData.role === "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
