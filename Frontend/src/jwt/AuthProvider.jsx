import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("jwt"));
  const [loading, setLoading] = useState(true); // New loading state to show when fetching profile
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("jwt");
      if (token) {
        try {
          const { data } = await axios.get("http://localhost:4001/api/login/my-profile", {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
            },
          });
          setProfile(data.user);
          setIsAuthenticated(true);
          console.log(data.user);
        } catch (error) {
          console.error("Failed to fetch profile", error);
          localStorage.removeItem("jwt"); // Clear invalid token
          setIsAuthenticated(false);
          setError("Failed to fetch profile. Please log in again."); // Set error state
        }
      } else {
        setIsAuthenticated(false); // If no token is present, set isAuthenticated to false
      }
      setLoading(false); // Mark the loading process as complete
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional: You can show a loading spinner or message here
  }

  if (error) {
    return <div>{error}</div>; // Show an error message if there's an issue
  }

  return (
    <AuthContext.Provider value={{ profile, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
