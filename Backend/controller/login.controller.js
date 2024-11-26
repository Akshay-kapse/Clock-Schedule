import Userlogin from "../models/userlogin.model.js"; // Importing the Userlogin model for database interaction
import bcrypt from "bcryptjs"; // Importing bcrypt for password hashing
import { z } from "zod"; // Importing zod for schema validation
import createTokensAndSaveCookies from "../jwt/AuthToken.js"; // Custom JWT utility for token creation and cookie handling
const jwt = require("jsonwebtoken")

// Define a Zod schema for user input validation
const userSchema = z.object({
  email: z.string().email({ message: "Invalid Email address" }), // Validates the email format
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }) // Minimum length validation
    .max(20, { message: "Username is too long" }), // Maximum length validation
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }), // Minimum length validation
});

// Controller for user registration
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Extracting user inputs from the request body

    console.log("Hello, I am Register Method....", req.body); // Debugging log

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate user inputs using Zod schema
    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      // Extract validation error messages
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ error: errorMessage });
    }

    // Check if a user with the same email already exists
    const user = await Userlogin.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User is already registered" });
    }

    // Hash the user's password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new Userlogin({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user document to the database
    await newUser.save();

    // If the user is successfully saved, create a JWT and save it as a cookie
    if (newUser) {
      let token = await createTokensAndSaveCookies(newUser._id, res); // Generate token and store in cookies
      console.log("Signup: ", token); // Debugging log
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
        token: token,
      });
    }
  } catch (error) {
    // Log any errors and respond with an internal server error status
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for user login
export const login = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body
  try {
    // Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill required fields" });
    }

    // Find the user by email and include the password field
    const user = await Userlogin.findOne({ email }).select("+password");
    console.log("Searching for user with email:", email); // Debugging log
    console.log("password", password); // Debugging log
    console.log("User result:", user); // Debugging log

    // Check if user exists and has a password stored
    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token and store it as a cookie
    let token = await createTokensAndSaveCookies(user._id, res);
    console.log("Login: ", token); // Debugging log
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    // Log any errors and respond with an internal server error status
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

// Controller for user logout
export const logout = (req, res) => {
  try {
    // Clear the JWT cookie from the client
    res.clearCookie("jwt", { httpOnly: true });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    // Log any errors and respond with an internal server error status
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const myprofile = async(req,res) => {
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, "your-secret-key");
    // Fetch user profile data from database
    const userProfile = await Userlogin.findById(user.id);
    res.json({ user: userProfile });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
