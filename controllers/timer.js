import { formatTimeToHiA } from "../helpers/index.js";
import Timer from "../models/Timer.js";
import moment from "moment";
const createTimer = async (req, res) => {
  try {
    const { startTime } = req.body;

    const startTimeString = startTime;
    const [hours, minutes, seconds] = startTimeString.split(":").map(Number);
    const formattedStartTime = new Date();
    formattedStartTime.setHours(hours, minutes, seconds);

    const timer = new Timer({ startTime: formattedStartTime });
    await timer.save();
    res.status(201).json(timer);
  } catch (err) {
    console.error("Error starting timer:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllTimers = async (req, res) => {
  try {
    const { id, endTime } = req.body;

    // Find the timer by ID
    const timer = await Timer.findById(id);

    // If timer not found, return 404 error
    if (!timer) {
      return res.status(404).json({ error: "Timer not found" });
    }

    // Parse the end time string and create a Date object
    const [hours, minutes, seconds] = endTime.split(":").map(Number);
    const formattedEndTime = new Date();
    formattedEndTime.setHours(hours, minutes, seconds);

    // Update the endTime of the found timer
    timer.endTime = formattedEndTime;

    // Save the updated timer
    await timer.save();

    // Return the updated timer
    res.json(timer);
  } catch (err) {
    console.error("Error ending timer:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export { createTimer, getAllTimers };
