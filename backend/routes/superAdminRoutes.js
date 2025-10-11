import express from "express";
import {
  getAllUsers,
  getAllAdmins,
  promoteToAdmin,
  deleteAnyUser,
} from "../controllers/superAdminController.js";
import { getAllRequirements, getProductDemandReport } from "../controllers/requirementController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isSuperAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(protect, isSuperAdmin); // protect all routes below

router.get("/users", getAllUsers);
router.get("/admins", getAllAdmins);
router.get("/requirements", getAllRequirements);
router.get("/report/demand", getProductDemandReport);
router.put("/promote/:id", promoteToAdmin);
router.delete("/delete/:id", deleteAnyUser);

export default router;
