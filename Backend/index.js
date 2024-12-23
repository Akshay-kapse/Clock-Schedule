import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import loginRoute from "./routes/login.route.js";
import goalRoute from "./routes/goal.route.js";
import scheduleRoute from "./routes/schedule.route.js";
import hourRoute from "./routes/hour.route.js"
import dayRoute from "./routes/day.route.js"
import contact from "./routes/contact.route.js";


const app = express();
dotenv.config();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST","PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders:["Content-Type","Authorization"]  // add other headers you want to allow here
  })
);

const PORT = process.env.PORT;
const DB_URI = process.env.MONGODB_URI;

// database connection code
try {
  await mongoose.connect(DB_URI);
  console.log("Connected to Mongodb");
} catch (error) {
  console.log(error);
}

// define route

app.use("/api/user", loginRoute);

app.use("/api/goal", goalRoute)

app.use("/api/schedule", scheduleRoute)

app.use("/api/hourschedule", hourRoute)

app.use("/api/dayschedule", dayRoute)

app.use("/api/contact",contact)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
