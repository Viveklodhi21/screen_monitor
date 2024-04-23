import mongoose from "mongoose";

const timerSchema = new mongoose.Schema({
  startTime: { type: Date },
  endTime: { type: Date },
});

const Timer = mongoose.model("timer", timerSchema);

export default Timer;
