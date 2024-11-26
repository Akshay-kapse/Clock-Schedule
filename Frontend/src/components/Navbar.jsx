// import { Link } from "react-router-dom";
// import { AiOutlineMenu } from "react-icons/ai";
// import { IoCloseSharp } from "react-icons/io5";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   // navbar for different devices (icon are seen for small devices and display for big devices)
//   const [show, setShow] = useState(false);
//   const navigateTo = useNavigate();

//   return (
//     <>
//       <nav className="bg-gray-200 py-4 shadow-md fixed w-full top-0 left-0 z-50">
//         <div className="flex items-center justify-between container mx-auto px-4">
//           {/* Logo */}
//           <div className="mx-5 font-semibold text-xl">
//             Clock<span className="font-extrabold text-blue-500">Schedule</span>
//           </div>

//           {/* Links */}
//           {/* Desktop */}
//           <div className="mx-6">
//             <ul className="hidden md:flex space-x-6">
//               <li>
//                 <Link to="/" className="hover:text-blue-500">
//                   HOME
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/schedule" className="hover:text-blue-500">
//                   SCHEDULE
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/goals" className="hover:text-blue-500">
//                   GOALS
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="hover:text-blue-500">
//                   ABOUT
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="hover:text-blue-500">
//                   CONTACT
//                 </Link>
//               </li>
//             </ul>
//             <div className="md:hidden" onClick={() => setShow(!show)}>
//               {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
//             </div>
//           </div>

//           {/* Login/Register Links */}
//           <div className="hidden md:flex space-x-4">
//             <Link
//               to="/login"
//               className="bg-red-600 text-white font-semibold hover:text-gray-400 hover:bg-red-800 duration-300 px-5 py-2 mx-5 rounded"
//             >
//               LOGIN
//             </Link>
//           </div>
//         </div>

//         {/* Mobile navbar */}
//         {show && (
//           <div className="bg-white">
//             <ul className="flex md:hidden text-xl flex-col h-screen items-center justify-center">
//               <li>
//                 <Link
//                   to="/"
//                   onClick={() => setShow(!show)}
//                   smooth="true"
//                   duration={500}
//                   offset={-70}
//                   activeClass="active"
//                   className="hover:text-blue-500"
//                 >
//                   HOME
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/schedule"
//                   onClick={() => setShow(!show)}
//                   smooth="true"
//                   duration={500}
//                   offset={-70}
//                   activeClass="active"
//                   className="hover:text-blue-500"
//                 >
//                   SCHEDULE
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/goals"
//                   onClick={() => setShow(!show)}
//                   smooth="true"
//                   duration={500}
//                   offset={-70}
//                   activeClass="active"
//                   className="hover:text-blue-500"
//                 >
//                   GOALS
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/about"
//                   onClick={() => setShow(!show)}
//                   smooth="true"
//                   duration={500}
//                   offset={-70}
//                   activeClass="active"
//                   className="hover:text-blue-500"
//                 >
//                   ABOUT
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   onClick={() => setShow(!show)}
//                   smooth="true"
//                   duration={500}
//                   offset={-70}
//                   activeClass="active"
//                   className="hover:text-blue-500"
//                 >
//                   CONTACT
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// };

// export default Navbar;

// import { Link , useNavigate} from "react-router-dom";
// import { AiOutlineMenu } from "react-icons/ai";
// import { IoCloseSharp } from "react-icons/io5";
// import axios from "axios";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/AuthProvider";

// function Navbar  ()  {
//   const [show, setShow] = useState(false);

//   const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
//   console.log(profile?.user);
//   const navigateTo = useNavigate();

//   const handleLogout = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.get(
//         "http://localhost:4001/api/login/logout",
//         { withCredentials: true }
//       );
//       console.log(data);
//       localStorage.removeItem("jwt"); // deleting token in localStorage so that if user logged out it will goes to login page
//       toast.success(data.message);
//       setIsAuthenticated(false);
//       navigateTo("/login");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to logout");
//     }
//   };

//   return (
//     <nav className="bg-gray-100 shadow-md fixed w-full top-0 left-0 z-50">
//       <div className="container mx-auto px-6 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <div className="text-2xl font-bold">
//           <Link to="/" className="text-gray-800">
//             Clock<span className="text-blue-500">Schedule</span>
//           </Link>
//         </div>

//         {/* Desktop Links */}
//         <ul className="hidden  md:flex space-x-8 items-center">
//           <li>
//             <Link to="/" className="text-gray-600 hover:text-blue-600">
//               HOME
//             </Link>
//           </li>
//           <li>
//             <Link to="/schedule" className="text-gray-600 hover:text-blue-600">
//               SCHEDULE
//             </Link>
//           </li>
//           <li>
//             <Link to="/goals" className="text-gray-600 hover:text-blue-600">
//               GOALS
//             </Link>
//           </li>
//           <li>
//             <Link to="/about" className="text-gray-600 hover:text-blue-600">
//               ABOUT
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" className="text-gray-600 hover:text-blue-600">
//               CONTACT
//             </Link>
//           </li>
//         </ul>

//         {/* Mobile Menu Icon */}
//         <div className="md:hidden">
//           <button onClick={() => setShow(!show)}>
//             {show ? (
//               <IoCloseSharp size={28} className="text-gray-800" />
//             ) : (
//               <AiOutlineMenu size={28} className="text-gray-800" />
//             )}
//           </button>
//         </div>

//         {/* Login Button (Desktop Only) */}
//         {/* <div className="hidden md:flex">
//           <Link
//             to="/login"
//             className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-800 transition duration-300"
//           >
//             LOGIN
//           </Link>
//         </div>
//       </div> */}
//        {!isAuthenticated ? (
//          <div className="hidden md:flex">
//               <Link
//                 to="/Login"
//                 className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-800 transition duration-300"
//                 >
//                 LOGIN
//               </Link>
//               </div>
//             ) : (
//               <div>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
//                 >
//                   LOGOUT
//                 </button>
//               </div>
//             )}
//         </div>

//       {/* Mobile Dropdown Menu */}
//       {show && (
//         <div className="bg-white  md:hidden shadow-lg">
//           <ul className="flex flex-col font-bold items-center space-y-6 py-8 text-gray-800">
//             <li>
//               <Link
//                 to="/"
//                 onClick={() => setShow(false)}
//                 className="text-lg  hover:text-blue-600"
//               >
//                 HOME
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/schedule"
//                 onClick={() => setShow(false)}
//                 className="text-lg hover:text-blue-600"
//               >
//                 SCHEDULE
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/goals"
//                 onClick={() => setShow(false)}
//                 className="text-lg hover:text-blue-600"
//               >
//                 GOALS
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/about"
//                 onClick={() => setShow(false)}
//                 className="text-lg hover:text-blue-600"
//               >
//                 ABOUT
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/contact"
//                 onClick={() => setShow(false)}
//                 className="text-lg hover:text-blue-600"
//               >
//                 CONTACT
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/login"
//                 onClick={() => setShow(false)}
//                 className="bg-red-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-red-800 transition duration-300"
//               >
//                 LOGIN
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// import { Link } from "react-router-dom";
// import { AiOutlineMenu } from "react-icons/ai";
// import { IoCloseSharp } from "react-icons/io5";
// import { useState, useEffect } from "react";

// const Navbar = () => {
//   const [show, setShow] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check authentication status on component mount
//   useEffect(() => {
//     const token = localStorage.getItem("jwt"); // Check if token exists
//     if (token) {
//       setIsAuthenticated(true); // Set to true if token is found
//     }

//     // Event listener to detect changes in localStorage (when token is added or removed)
//     const handleStorageChange = () => {
//       const token = localStorage.getItem("jwt");
//       setIsAuthenticated(!!token);
//     };

//     window.addEventListener("storage", handleStorageChange);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("jwt"); // Clear the token from localStorage
//     setIsAuthenticated(false); // Update the state to reflect the logout
//   };


//   return (
//     <>
//       <nav className="bg-white py-4 shadow-lg fixed w-full top-0 left-0 z-50">
//         <div className="flex items-center justify-between container mx-auto px-6">
//           {/* Logo */}
//           <div className="font-bold text-2xl text-gray-800">
//             Clock
//             <span className="text-blue-500">Schedule</span>
//           </div>

//           {/* Desktop Links */}
//           <div className="hidden md:flex space-x-8">
//             <Link
//               to="/"
//               className="text-gray-700 hover:text-blue-500 font-medium transition duration-300"
//             >
//               Home
//             </Link>
//             <Link
//               to="/schedule"
//               className="text-gray-700 hover:text-blue-500 font-medium transition duration-300"
//             >
//               Schedule
//             </Link>
//             <Link
//               to="/goals"
//               className="text-gray-700 hover:text-blue-500 font-medium transition duration-300"
//             >
//               Goals
//             </Link>
//             <Link
//               to="/about"
//               className="text-gray-700 hover:text-blue-500 font-medium transition duration-300"
//             >
//               About
//             </Link>
//             <Link
//               to="/contact"
//               className="text-gray-700 hover:text-blue-500 font-medium transition duration-300"
//             >
//               Contact
//             </Link>
//           </div>

//           {/* Desktop Authentication Button (Login or Logout) */}
//           <div className="hidden md:flex">
//             {isAuthenticated ? (
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//               >
//                 Login
//               </Link>
//             )}
//           </div>


//           {/* Mobile Menu Icon */}
//           <div
//             className="md:hidden text-gray-800 cursor-pointer"
//             onClick={() => setShow(!show)}
//           >
//             {show ? <IoCloseSharp size={30} /> : <AiOutlineMenu size={30} />}
//           </div>
//         </div>

//         {/* Mobile Navbar */}
//         {show && (
//           <div className="bg-gray-100 md:hidden">
//             <ul className="flex flex-col items-center space-y-6 py-6">
//               <li>
//                 <Link
//                   to="/"
//                   onClick={() => setShow(false)}
//                   className="text-gray-800 text-xl font-medium hover:text-blue-500 transition duration-300"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/schedule"
//                   onClick={() => setShow(false)}
//                   className="text-gray-800 text-xl font-medium hover:text-blue-500 transition duration-300"
//                 >
//                   Schedule
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/goals"
//                   onClick={() => setShow(false)}
//                   className="text-gray-800 text-xl font-medium hover:text-blue-500 transition duration-300"
//                 >
//                   Goals
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/about"
//                   onClick={() => setShow(false)}
//                   className="text-gray-800 text-xl font-medium hover:text-blue-500 transition duration-300"
//                 >
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   onClick={() => setShow(false)}
//                   className="text-gray-800 text-xl font-medium hover:text-blue-500 transition duration-300"
//                 >
//                   Contact
//                 </Link>
//               </li>
//               <li>
//               {isAuthenticated ? (
//                   <button
//                     onClick={() => {
//                       setShow(false); // Close menu after logout
//                       handleLogout();
//                     }}
//                     className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition duration-300"
//                   >
//                     Logout
//                   </button>
//                 ) : (
//                   <Link
//                     to="/login"
//                     onClick={() => setShow(false)}
//                     className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
//                   >
//                     Login
//                   </Link>
//                 )}
//               </li>
//             </ul>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// };

// export default Navbar;
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("jwt"); // Check if token exists
    if (token) {
      setIsAuthenticated(true); // Set to true if token is found
    }

    // Event listener to detect changes in localStorage (when token is added or removed)
    const handleStorageChange = () => {
      const token = localStorage.getItem("jwt");
      setIsAuthenticated(!!token); // Update isAuthenticated based on token
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("jwt"); // Clear the token from localStorage
    setIsAuthenticated(false); // Update the state to reflect the logout
  };

  return (
    <nav className="bg-white py-4 shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="flex items-center justify-between container mx-auto px-6">
        {/* Logo */}
        <div className="font-bold text-2xl text-gray-800">
          Clock
          <span className="text-blue-500">Schedule</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-500 font-medium transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/schedule"
            className="text-gray-700 hover:text-blue-500 font-medium transition duration-300"
          >
            Schedule
          </Link>
          <Link
            to="/goals"
            className="text-gray-700 hover:text-blue-500 font-medium transition duration-300"
          >
            Goals
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-500 font-medium transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-500 font-medium transition duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Authentication Button (Login or Logout) */}
        <div className="hidden md:flex">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-gray-800 cursor-pointer"
          onClick={() => setShow(!show)}
        >
          {show ? <IoCloseSharp size={30} /> : <AiOutlineMenu size={30} />}
        </div>
      </div>

      {/* Mobile Navbar */}
      {show && (
        <div className="bg-gray-100 md:hidden">
          <ul className="flex flex-col items-center space-y-6 py-6">
            <li>
              <Link
                to="/"
                onClick={() => setShow(false)}
                className="text-gray-800 text-xl font-medium hover:text-blue-500 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/schedule"
                onClick={() => setShow(false)}
                className="text-gray-800 text-xl font-medium hover:text-blue-500 transition duration-300"
              >
                Schedule
              </Link>
            </li>
            <li>
              <Link
                to="/goals"
                onClick={() => setShow(false)}
                className="text-gray-800 text-xl font-medium hover:text-blue-500 transition duration-300"
              >
                Goals
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setShow(false)}
                className="text-gray-800 text-xl font-medium hover:text-blue-500 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setShow(false)}
                className="text-gray-800 text-xl font-medium hover:text-blue-500 transition duration-300"
              >
                Contact
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setShow(false); // Close menu after logout
                    handleLogout();
                  }}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setShow(false)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
