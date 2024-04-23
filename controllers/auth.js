import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import verifyAuth from "../middleware/verifyAuth.js";

const router = Router();
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        msg: "please fill the required fields",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: "user already exists",
        success: false,
      });
    }

    user = new User({
      name,
      email,
      password,
    });

    const slat = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, slat);
    await user.save();

    jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECTET,
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "invalid credentials",
        success: false,
      });
    }
    let user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({
        msg: "invalid credentials",
        success: false,
      });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        msg: "invalid credentials",
        success: false,
      });
    jwt.sign(
      { id: user._id },
      process.env.JWT_SECTET,
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};

router.get("/user", verifyAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("posts");
    res.status(200).json({
      user,
      success: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "SERVER ERROR" });
  }
});
export { registerAdmin, login };
