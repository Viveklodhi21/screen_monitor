import express from "express";
import { createTimer, getAllTimers } from "../controllers/timer.js";
// import checkAuth from "../middlewares/jwt.js";

const router = express.Router();

router.post('/', getAllTimers);
router.post('/create', createTimer);



export default router;
