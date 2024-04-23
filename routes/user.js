import express from "express";
import { addUser, deleteUser, editUser, getUsers } from "../controllers/user.js";
// import checkAuth from "../middlewares/jwt.js";

const router = express.Router();

router.post("/add", addUser);
router.post("/edit", editUser);
router.get("/list", getUsers);
router.delete("/delete", deleteUser);

export default router;
