import express from "express";
import {createSchedule, deleteSchedule, getSchedule, updateSchedule} from "../controller/schedule.controller.js";

const router = express.Router();

router.post("/schedule", createSchedule);

router.get("/fetch",getSchedule)

router.put("/update/:id",updateSchedule)

router.delete("/delete/:id",deleteSchedule)



export default router;