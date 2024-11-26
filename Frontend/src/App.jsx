import React from "react";
import Navbar from "../src/components/Navbar.jsx";
import Home from "../src/components/Home.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Schedule from "../src/pages/Schedule.jsx";
import Goals from "../src/pages/Goals.jsx";
import About from "../src/pages/About.jsx";
import Contact from "../src/pages/Contact.jsx";
import Login from "../src/pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { Toaster } from "react-hot-toast";
import PageNotFound from "./pages/PageNotFound.jsx";
import Dayschedule from "./pages/Dayschedule.jsx";
import Hourschedule from "./pages/Hourschedule.jsx";

function App() {
  // Hide navbar for specific routes
  const location = useLocation();
  const hideNavBar =
    [
      "/register",
      "/login",
      "/goalschedule",
      "*",
    ].includes(location.pathname) ||
    location.pathname.match(/^\/goalschedule\/[^/]+\/(day|hour)$/);

  return (
    <div>
      {!hideNavBar && <Navbar />}

      {/* defining routes */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/schedule" element={<Schedule />} />
        <Route exact path="/goals" element={<Goals />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/goalschedule/:goalId/day" element={<Dayschedule />} />
        <Route path="/goalschedule/:goalId/hour" element={<Hourschedule />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
