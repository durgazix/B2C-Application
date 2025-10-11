import User from "../models/User.js";

export const getCustomerStats = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("name email createdAt");
    res.json({ totalCustomers: customers.length, customers });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch user stats" });
  }
};
