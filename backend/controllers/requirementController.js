import Requirement from "../models/Requirement.js";

export const createRequirement = async (req, res) => {
  try {
    const { productId, quantityRequested } = req.body;
    const newReq = await Requirement.create({
      productId,
      quantityRequested,
      userId: req.user._id,
    });
    res.status(201).json({ msg: "Requirement submitted", requirement: newReq });
  } catch (err) {
    res.status(500).json({ msg: "Request failed" });
  }
};

// Admin: View all requirements
export const approveRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);
    if (!requirement)
      return res.status(404).json({ msg: "Requirement not found" });

    requirement.status = "approved";
    await requirement.save();

    res.json({ msg: "Requirement approved successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to approve requirement" });
  }
};

export const updateRequirementStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const updated = await Requirement.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Requirement not found" });
    }

    res.json({ msg: `Status updated to ${status}`, requirement: updated });
  } catch (err) {
    res.status(500).json({ msg: "Status update failed" });
  }
};

// Show only unapproved in demand
export const getProductDemandReport = async (req, res) => {
  try {
    const report = await Requirement.aggregate([
      {
        $match: {
          status: { $ne: "approved" },
        },
      },
      {
        $group: {
          _id: "$productId",
          totalRequested: { $sum: "$quantityRequested" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
      {
        $project: {
          productId: "$_id",
          name: "$productInfo.name",
          totalRequested: 1,
        },
      },
    ]);

    res.json(report);
  } catch (err) {
    res.status(500).json({ msg: "Failed to generate demand report" });
  }
};

export const getAllRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find()
      .populate("productId", "name")
      .populate("userId", "name email");

    res.json(requirements);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch requirements" });
  }
};
