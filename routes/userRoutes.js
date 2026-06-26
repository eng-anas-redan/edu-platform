import express from "express";
import {
  registerUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  loginUser
} from "../controllers/userController.js";

const router = express.Router();

// CREATE
router.post("/users", registerUser);

// READ
router.get("/users", getAllUsers);
router.get("/users/:id", getSingleUser);

// UPDATE
router.put("/users/:id", updateUser);

// DELETE
router.delete("/users/:id", deleteUser);

//LogIn
router.post("/login", loginUser);


export default router;