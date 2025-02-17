import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import NotFound from "./Components/NotFound/NotFound";
import Dashboard from "./Components/Home/Dashboard";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Function to decode the token and set the current user
  function getUserData() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = jwtDecode(token);
        setCurrentUser(userData); // Ensure state updates
      } else {
        setCurrentUser(null); // Clear user if no token
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      clearUser(); // Clear invalid token
    }
  }
  
  

  // Function to clear the current user and token
  function clearUser() {
    localStorage.removeItem("token");
    setCurrentUser(null);
  }

  // Effect to fetch user data when the component mounts
  useEffect(function () {
    if (localStorage.getItem("token") !== null && currentUser == null) {
      getUserData();
    }
  }, [currentUser]); // Add currentUser as a dependency

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Router configuration
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

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;