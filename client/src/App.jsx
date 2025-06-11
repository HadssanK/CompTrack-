import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/EmpDashboard/UserDashboard';
import RaiseIssue from './pages/EmpDashboard/RaiseIssue';
import MyComplaints from './pages/EmpDashboard/MyComplaints';
import AdminDashboard from "./pages/Admin/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";
// Layout with Navbar
const WithNavbarLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

// Layout without Navbar
const WithoutNavbarLayout = ({ children }) => <>{children}</>;
const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* ✅ Routes WITHOUT Navbar */}
        <Route
          path="/"
          element={
            <WithoutNavbarLayout>
              <Login />
            </WithoutNavbarLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
          <PrivateRoute>
      <WithNavbarLayout>
        <Dashboard />
      </WithNavbarLayout>
    </PrivateRoute>
          }
        />
        <Route
          path="/email-verify"
          element={
            <WithoutNavbarLayout>
              <EmailVerify />
            </WithoutNavbarLayout>
          }
        />
        <Route
          path="/reset-password"
          element={
            <WithoutNavbarLayout>
              <ResetPassword />
            </WithoutNavbarLayout>
          }
        />

      
        <Route
          path="/raise-issue"
          element={
            <PrivateRoute>

            <WithNavbarLayout>
              <RaiseIssue />
            </WithNavbarLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/my-complaints"
          element={
            <PrivateRoute>

            <WithNavbarLayout>
              <MyComplaints />
            </WithNavbarLayout>
            </PrivateRoute>
          }
        />
         <Route
          path="/Admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
};

export default App;
