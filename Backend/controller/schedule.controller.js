import Schedule from "../models/schedule.model.js"; // Importing the Schedule model for database interactions

// Controller for creating a new schedule
export const createSchedule = async (req, res) => {
  const { text, completed, startTime, endTime } = req.body; // Extracting fields from the request body

  // Create a new schedule document
  const schedule = new Schedule({
    text,       // Task description
    completed,  // Task completion status (boolean)
    startTime,  // Start time of the task (as string)
    endTime,    // End time of the task (as string)
  });

  try {
    // Save the schedule document to the database
    const newSchedule = await schedule.save();
    res.status(201).json({
      message: "Schedule Created Successfully",
      newSchedule, // Respond with the created schedule
    });
    console.log(newSchedule); // Debugging log
  } catch (error) {
    // Handle errors during schedule creation
    console.error(error);
    res.status(400).json({ message: "Server Error" });
  }
};

// Controller for fetching all schedules
export const getSchedule = async (req, res) => {
  try {
    // Retrieve all schedules from the database
    const schedule = await Schedule.find();
    res.status(200).json({
      message: "Schedule Fetched Successfully",
      schedule, // Respond with the list of schedules
    });
  } catch (error) {
    // Handle errors during schedule fetching
    console.error(error);
    res.status(400).json({ message: "Error occurred in fetching schedule" });
  }
};

// Controller for updating a schedule
export const updateSchedule = async (req, res) => {
  try {
    const { text, completed, startTime, endTime } = req.body; // Extract updated fields from request body

    // Function to validate time format (HH:MM or H:MM)
    const isValidTimeFormat = (time) => {
      const timeRegex = /^(0[0-9]|1[0-2]|[1-9]):([0-5][0-9])$/; // Matches "HH:MM"
      const timeRegexWithoutLeadingZero = /^[1-9]:([0-5][0-9])$/; // Matches "H:MM"
      return timeRegex.test(time) || timeRegexWithoutLeadingZero.test(time);
    };

    // Validate startTime and endTime formats
    if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
      return res.status(400).json({
        message: "startTime and endTime must be in 'HH:MM' or 'H:MM' format.",
      });
    }

    // Ensure that startTime is before endTime
    if (startTime >= endTime) {
      return res
        .status(400)
        .json({ message: "startTime must be before endTime." });
    }

    // Find the schedule by ID and update it with new values
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id, // Schedule ID from request params
      { text, completed, startTime, endTime }, // Updated values
      { new: true } // Return the updated document
    );

    if (!schedule) {
      // If no schedule found, respond with 404
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json({
      message: "Schedule Updated Successfully",
      schedule, // Respond with the updated schedule
    });
    console.log(schedule); // Debugging log
  } catch (error) {
    // Handle errors during schedule update
    console.error(error);
    res.status(400).json({ message: "Error occurred in updating schedule" });
  }
};

// Controller for deleting a schedule
export const deleteSchedule = async (req, res) => {
  try {
    // Find and delete the schedule by ID
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      // If no schedule found, respond with 404
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule Deleted Successfully" });
  } catch (error) {
    // Handle errors during schedule deletion
    console.error(error);
    res.status(400).json({ message: "Error occurred in deleting schedule" });
  }
};
