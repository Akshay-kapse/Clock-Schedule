// import Userlogin from "../models/userlogin.model.js";
// import bcrypt from "bcryptjs";
// import { z } from "zod";
// import createTokensAndSaveCookies from "../jwt/AuthToken.js";

// const userSchema = z.object({
//   email: z.string().email({ message: "Invalid Email address" }),
//   username: z
//     .string()
//     .min(3, { message: "Username at least 3 characters" })
//     .max(20, { message: "Username is to long" }),
//   password: z
//     .string()
//     .min(6, { message: "Password ar least 3 characters long" }),
// });

// export const register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     console.log("Hello, I am Register Method....", req.body);

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const validation = userSchema.safeParse({ email, username, password });
//     if (!validation.success) {
//       const errorMessage = validation.error.errors.map((err) => err.message);
//       return res.status(400).json({ error: errorMessage });
//     }

//     const user = await Userlogin.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User are already registered" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new Userlogin({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     //new user
//     if (newUser) {
//       let token = await createTokensAndSaveCookies(newUser._id, res);
//       console.log("Signup: ", token);
//       res.status(201).json({
//         message: "User registered Successfully",
//         user: {
//           id: newUser._id,
//           username: newUser.name,
//           email: newUser.email,
//         },
//         token: token,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     if (!email || !password) {
//       return res.status(400).json({ message: "Please fill required fields" });
//     }
//     const user = await Userlogin.findOne({ email }).select("+password");
//     console.log("Searching for user with email:", email);
//     console.log("password",password)

//     console.log("User result:", user);
//     if (!user.password) {
//       return res.status(400).json({ message: "User password is missing" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!user || !isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     let token = await createTokensAndSaveCookies(user._id, res);
//     console.log("Login: ", token);
//     res.status(200).json({
//       message: "User logged in successfully",
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//       token: token,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Internal Server error" });
//   }
// };

// export const logout = (req, res) => {
//   try {
//     res.clearCookie("jwt", { httpOnly: true });
//     res.status(200).json({ message: "User logged out successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status * (500).json({ error: "Internal Server Error" });
//   }
// };

// export const getMyProfile = async (req, res) => {
//   try {
//     // Use the user ID from the decoded token to find the user in the database
//     const user = await Userlogin.findById(req.user.id); // Assuming 'id' is stored in the token
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Remove sensitive fields from the user object before sending the response
//     const { password, ...userProfile } = user.toObject(); // Remove password

//     // Send the user profile back
//     res.json({ user: userProfile });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

import Userlogin from "../models/userlogin.model.js"; // Importing the Userlogin model for database interaction
import bcrypt from "bcryptjs"; // Importing bcrypt for password hashing
import { z } from "zod"; // Importing zod for schema validation
import createTokensAndSaveCookies from "../jwt/AuthToken.js"; // Custom JWT utility for token creation and cookie handling

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
