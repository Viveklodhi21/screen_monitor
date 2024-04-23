import express from "express";
import authRouter from "../routes/auth.js";
import userRouter from "../routes/user.js";
import timerRouter from "../routes/timer.js";

const app = express();
app.use("/auth/", authRouter);
app.use("/user/", userRouter);
app.use("/timer/", timerRouter);

export default app;
