import bcrypt from "bcryptjs";
import {
  errorResponse,
  successResponse,
  validationError,
} from "../helpers/api-responses.js";
import { generatePassword, getUserId, sendEmail } from "../helpers/index.js";
import User from "../models/User.js";

const addUser = async (req, res) => {
  try {
    const { name, project, email, phone, status } = req.body;

    // const image = req.files?.image;
    // const uploadImage = image ? await uploadToS3(image) : null;
    const userId = await getUserId(req);
    console.log("userId", userId);
    const userExists = await User.findOne({ email });
    if (userExists) {
      return validationError(res, "User with this email already exists");
    }
    const password = generatePassword();
    // const userData = {
    //   name,
    //   email,
    //   password,
    // };
    // await sendEmail(email, "Greetings!", userData);
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: encryptedPassword,
      project,
      phone,
      status,
    });
    await user.save();
    let response = {
      name,
      email,
      project,
      phone,
      status,
    };

    return successResponse(res, "User added successfully", response);
  } catch (error) {
    return validationError(res, error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log("userdd", users);
    if (users) {
      successResponse(res, "Users found successfully", users);
    }
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

const editUser = async (req, res) => {
  try {
    const { id, name, phone, email, project, status } = req.body;
    console.log("req.body", id);

    const userId = id; //await getUserId(req);
    console.log("userId", userId);
    const user = await User.findOne({ _id: id });
    if (!user) {
      return errorResponse(res, "User not found in the database");
    }

    const updateUserQuery = [
      { _id: userId },
      {
        $set: {
          name: name === "" ? "" : name ? name : user.name,
          email: project === "" ? "" : project ? project : user.project,
          email: email === "" ? "" : email ? email : user.email,
          phone: phone === "" ? "" : phone ? phone : user.phone,
        },
      },
      { new: true },
    ];
    const updateUser = await User.findOneAndUpdate(...updateUserQuery);
    updateUser.password = undefined;
    updateUser.__v = undefined;
    const response = { ...updateUser._doc };
    return successResponse(res, "User updated successfully", response);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

const deleteUser = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const { id } = req.body;
    console.log("iddd", id);
    const user = await User.findById(id);
    if (!user) {
      return errorResponse(res, "User not found in the database");
    }
    await User.findOneAndDelete({ _id: id });

    return successResponse(res, "User deleted successfully", null);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export { addUser, getUsers, editUser, deleteUser };
