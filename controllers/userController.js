import User from "../models/User.js";
import Request from "../models/VerificationRequest.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    const user = await User.create({
      fname,
      lname,
      email,
      password,
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const requests = await Request.find();

    const usersData = users.map((user) => {
      const request = requests.find(
        (r) => r.user.toString() === user._id.toString()
      );

      return {
        ...user.toObject(),
        bio: request?.bio || "",
        specialty: request?.specialty || "",
        experience: request?.experience || 0,
        rating: request?.rating || 0,
        status: request?.status || null,
      };
    });

    res.json(usersData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const request = await Request.findOne({ user: user._id });
    res.json({
      ...user.toObject(),
      bio: request?.bio,
      experience: request?.experience,
      rating: request?.rating,
      specialty : request?.specialty
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { fname, lname, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { fname, lname, email },
      { new: true },
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// LogIn
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fname: user.fname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
