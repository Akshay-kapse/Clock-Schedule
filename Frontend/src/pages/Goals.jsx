import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const GoalPage = () => {
  const [goal, setGoal] = useState("");
  const [goalDate, setGoalDate] = useState("");
  const [goalsList, setGoalsList] = useState([]);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [showScheduleOptions, setShowScheduleOptions] = useState(false);
  const [selectedGoalItem, setSelectedGoalItem] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    fetchGoals(); // Fetch goals if authenticated
  }, [navigate]);

  // Fetch Goals from the Backend

  const fetchGoals = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/goal/fetch");
      if (response.data.goal) {
        setGoalsList(response.data.goal);
      }
    } catch (error) {
      setError("Error fetching goals. Please try again.");
    }
  };

  // Save or Update Goal
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!goal || !goalDate) {
      toast.error("Goal and date are required.");
      return;
    }

    try {
      if (isEditing) {
        console.log("Editing Goal ID:", isEditing); // Debugging
        const response = await axios.put(
          `http://localhost:4001/api/goal/update/${isEditing}`,
          {
            goal,
            goalDate,
          }
        );
        console.log("Edit Response:", response.data); // Debugging
        toast.info("Editing goal...");
        setIsEditing(null);
      } else {
        const response = await axios.post(
          "http://localhost:4001/api/goal/target",
          {
            goal,
            goalDate,
          }
        );
        console.log("Create Response:", response.data); // Debugging
        toast.success("Goal added successfully!");
      }

      fetchGoals(); // Refresh the goals list
      setGoal("");
      setGoalDate("");
      setIsAddingGoal(false);
      setError(""); // Clear errors
    } catch (error) {
      console.error(
        "Error saving goal:",
        error.response?.data || error.message
      );
      toast.error("Error saving goal. Please try again.");
    }
  };

  // Delete Goal
  const deleteGoal = async (id) => {
    console.log("ID to delete:", id); // Debugging
    if (!id) {
      console.error("No ID provided for deletion.");
      return;
    }

    try {
      await axios.delete(`http://localhost:4001/api/goal/delete/${id}`);
      setGoalsList((prevGoals) =>
        prevGoals.filter((goalItem) => goalItem._id !== id)
      );
      toast.success("Goal deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete goal. Please try again.");
      console.error("Error deleting goal:", error);
    }
  };

  const handleEdit = (id) => {
    const goalToEdit = goalsList.find((g) => g._id === id);

    if (!goalToEdit || !goalToEdit.goalDate) {
      console.error("Invalid goal data:", goalToEdit);
      setError("Cannot edit this goal. Please try again.");
      return;
    }

    setGoal(goalToEdit.goal);
    setGoalDate(goalToEdit.goalDate.slice(0, 10)); // Ensure the date format
    setIsEditing(goalToEdit._id);
    setIsAddingGoal(true);
  };

  const handleSchedule = (goalItem) => {
    console.log("Selected Goal Item:", goalItem); // Debugging
    if (!goalItem || !goalItem._id) {
      console.error("Invalid goal item passed to handleSchedule.");
      setError("Invalid goal item. Please try again.");
      return;
    }
    setSelectedGoalItem(goalItem);
    setShowScheduleOptions(true);
  };

  const navigateToSchedule = (scheduleType) => {
    if (!selectedGoalItem || !selectedGoalItem._id) {
      console.error("Invalid goal item for navigation.");
      setError("Cannot navigate. Please select a valid goal.");
      setShowScheduleOptions(false);
      return;
    }

    console.log(
      `Navigating to: /goalschedule/${selectedGoalItem._id}/${scheduleType}`
    ); // Debugging

    navigate(`/goalschedule/${selectedGoalItem._id}/${scheduleType}`, {
      state: {
        id: selectedGoalItem._id,
        goal: selectedGoalItem.goal,
        goalDate: selectedGoalItem.goalDate,
      },
    });

    setShowScheduleOptions(false);
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 relative">
      {/* Back Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition ease-in-out duration-300"
        >
          Back
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        {/* Error Display */}
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {/* Add/Edit Goal Form */}
        {isAddingGoal ? (
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 bg-white text-gray-900 rounded-lg shadow-lg space-y-6"
          >
            <h2 className="text-2xl font-bold text-center text-blue-600">
              {isEditing ? "Edit Goal" : "What's Your Goal"}
            </h2>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Enter Your Goal
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                placeholder="E.g., Learn React"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Goal Date
              </label>
              <input
                type="date"
                value={goalDate}
                onChange={(e) => setGoalDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition ease-in-out duration-300"
            >
              {isEditing ? "Update Goal" : "Save Goal"}
            </button>
          </form>
        ) : (
          <div className="p-6 sm:p-8 bg-white text-gray-900 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
              Your Goals
            </h2>
            {goalsList.length === 0 ? (
              <p className="text-center text-gray-500">
                No goals yet. Click "Add New Goal" to get started.
              </p>
            ) : (
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {goalsList.map((goalItem) => (
                  <div
                    key={goalItem._id}
                    className="flex justify-between items-center p-4 bg-white rounded-lg shadow border"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {goalItem.goal}
                      </h3>
                      <p className="text-gray-500">
                        {new Date(goalItem.goalDate).toLocaleDateString(
                          "en-GB"
                        )}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(goalItem._id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteGoal(goalItem._id)} // Use `_id` from the backend
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => handleSchedule(goalItem)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        Schedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => {
                setIsAddingGoal(true);
                toast.info("Add a new goal!");
              }}
              className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition ease-in-out duration-300"
            >
              Add More Target
            </button>
            ;
          </div>
        )}

        {/* Schedule Modal */}
        {showScheduleOptions && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-xl font-bold mb-4">Choose a Schedule Type</h2>

              <div className="space-y-4">
                <button
                  onClick={() => navigateToSchedule("day")}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition ease-in-out duration-300"
                >
                  Day Schedule
                </button>
                <button
                  onClick={() => navigateToSchedule("hour")}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition ease-in-out duration-300"
                >
                  Hour Schedule
                </button>
              </div>
            </div>
          </div>
        )}
          <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default GoalPage;
