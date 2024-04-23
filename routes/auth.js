import express from "express";
import {
  login,
  registerAdmin,
  //   login,
} from "../controllers/auth.js";
// import checkAuth from "../middlewares/jwt.js";

const router = express.Router();

router.post("/registeradmin", registerAdmin);
router.post("/login", login);

export default router;
