import jwt from "jsonwebtoken";
import Userlogin from "../models/userlogin.model.js";

// Function to create and save JWT as a cookie
const createTokensAndSaveCookies = async (userId, res) => {
  let token;
//   try {
    token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

  // Set JWT as a secure, HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  // Optional: update user document with token (if required for session management)
  await Userlogin.findByIdAndUpdate(userId, { token });

  return token; // Returning token for potential use in other components
};

export default createTokensAndSaveCookies;

