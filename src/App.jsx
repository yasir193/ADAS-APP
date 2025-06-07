import { createHashRouter, Navigate, RouterProvider, useNavigate } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import NotFound from "./Components/NotFound/NotFound";
import Dashboard from "./Components/Home/Dashboard";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Control from './Components/Control/Control';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  function getUserData() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // In seconds

        if (decoded.exp < currentTime) {
          // Token has expired
          clearUser();
          return;
        }

        setCurrentUser(decoded);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      clearUser();
    }
  }

  function clearUser() {
    localStorage.removeItem("token");
    setCurrentUser(null);
  }

  useEffect(() => {
    getUserData();
  }, []); // Only run on mount

  // Protected route component with token expiry check
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/login" />;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        clearUser();
        return <Navigate to="/login" />;
      }
    } catch (err) {
      clearUser();
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createHashRouter([
    {
      path: "/",
      element: <Layout currentUser={currentUser} clearUser={clearUser} />,
      children: [
        { index: true, element: <Register /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login getUserData={getUserData} /> },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "control",
          element: (
            <ProtectedRoute>
              <Control />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile currentUser={currentUser} />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
