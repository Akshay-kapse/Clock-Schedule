import Goal from "../models/goals.model.js"; // Import the Goal model for database operations

// Controller to create a new goal
export const createGoal = async (req, res) => {
  try {
    const { goal, goalDate } = req.body; // Extract goal and goalDate from request body

    // Validate input fields
    if (!goal || !goalDate) {
      return res.status(400).json({ message: "Goal and goalDate are required." });
    }

    // Optional: Check for duplicate goals based on goal title and date
    const existingGoal = await Goal.findOne({ goal, goalDate });
    if (existingGoal) {
      return res.status(400).json({
        message: "Goal with the same title and date already exists.",
      });
    }

    // Create a new goal document
    const newGoal = new Goal({
      goal,          // Goal description
      goalDate,      // Goal target date
      userId: req.user._id, // The ID of the user creating the goal (assumes user info is available in `req.user`)
    });

    // Save the new goal to the database
    await newGoal.save();

    // Respond with the created goal
    res.status(201).json({ message: "Goal created successfully", goal: newGoal });
  } catch (error) {
    // Handle errors during goal creation
    console.error(error);
    res.status(500).json({
      message: "Error occurred in creating goal",
      error: error.message,
    });
  }
};

// Controller to fetch all goals
export const getGoal = async (req, res) => {
  try {
    // Fetch all goals from the database
    const goal = await Goal.find();
    res.status(200).json({ message: "Goal Fetched Successfully", goal });
    console.log(goal); // Log the fetched goals (optional for debugging)
  } catch (error) {
    // Handle errors during goal fetching
    console.error(error);
    res.status(400).json({ error: "Error occurred in fetching goal " });
  }
};

// Controller to update an existing goal
export const updateGoal = async (req, res) => {
  const { id } = req.params; // Extract the goal ID from request parameters
  const { goal, goalDate } = req.body; // Extract updated data from request body

  try {
    // Find the goal by ID and update it
    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      { goal, goalDate }, // Updated goal data
      { new: true }       // Return the updated document
    );

    if (!updatedGoal) {
      // If no goal is found with the given ID
      return res.status(404).json({ message: "Goal not found" });
    }

    // Respond with the updated goal
    res.status(200).json({ message: "Goal updated successfully", updatedGoal });
  } catch (error) {
    // Handle errors during goal update
    res.status(500).json({ message: "Error updating goal", error });
  }
};

// Controller to delete a goal
export const deleteGoal = async (req, res) => {
  const { id } = req.params; // Extract the goal ID from request parameters

  try {
    // Find and delete the goal by ID
    const deletedGoal = await Goal.findByIdAndDelete(id);

    if (!deletedGoal) {
      // If no goal is found with the given ID
      return res.status(404).json({ message: "Goal not found" });
    }

    // Respond with a success message
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    // Handle errors during goal deletion
    console.error("Error deleting goal:", error);
    res.status(500).json({ message: "Failed to delete goal" });
  }
};
