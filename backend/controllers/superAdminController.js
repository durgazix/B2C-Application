// 📁 controllers/superAdminController.js
import User from "../models/User.js";

// ✅ Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch users" });
  }
};

// ✅ Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.json(admins);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch admins" });
  }
};

// ✅ Promote user to admin
export const promoteToAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.role = "admin";
    await user.save();
    res.json({ msg: "User promoted to admin" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to promote user" });
  }
};

// ✅ Delete any user/admin
export const deleteAnyUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete user" });
  }
};
