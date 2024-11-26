import express from "express";
import { createGoal, deleteGoal, getGoal, updateGoal } from "../controller/goal.controller.js";


const router = express.Router();

router.post("/target", createGoal);

router.get("/fetch", getGoal);

router.put("/update/:id",updateGoal)

router.delete("/delete/:id",deleteGoal)


export default router;
