import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true, // Ensures 'goal' is mandatory
  },

  goalDate: {
    type: Date, // 'Date' type for storing date format
    required: true, // Ensures 'goalDate' is mandatory
  },
});

const Goal = mongoose.model("Goal", goalSchema);
export default Goal;

