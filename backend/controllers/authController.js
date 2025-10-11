import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body; // Accept role optionally
  try {
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_WEB_SECRET,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_WEB_SECRET, // make sure this is defined!
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user; // Populated by protect middleware

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch user profile" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = req.user;

    await User.findByIdAndDelete(user._id);

    res.status(200).json({ msg: "User deleted successfully. Please logout." });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ msg: "Failed to delete user" });
  }
};

export const postUserData = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const fullMessage = `Contact Form Submission:
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}`;

  try {
    const response = await client.messages.create({
      body: fullMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.ADMIN_PHONE,
    });

    return res.status(200).json({ success: true, sid: response.sid });
  } catch (error) {
    console.error("Twilio Error:", error.message);
    return res.status(500).json({ error: "Failed to send SMS" });
  }
};
