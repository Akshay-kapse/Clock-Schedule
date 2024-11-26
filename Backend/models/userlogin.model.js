import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   validate: [validator.isEmail, "Please enter a valid email"],
  // },
  // password: {
  //   type: String,
  //   required: true,
  //   select: false,
  //   minlength: 8,
  // },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Removes leading/trailing spaces
  },
  password: {
    type: String,
    required: true,
    select: false, // Ensure password is excluded by default
  },
  token: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Userlogin = mongoose.model("Userlogin", userSchema);
export default Userlogin;
