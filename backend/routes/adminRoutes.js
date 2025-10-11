import { getCustomerStats } from "../controllers/adminController.js";
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import {
  getAllRequirements,
  getProductDemandReport,
  approveRequirement,
  updateRequirementStatus,
} from "../controllers/requirementController.js";

const router = express.Router();

router.get("/customers", protect, isAdmin, getCustomerStats);
router.post("/products", protect, isAdmin, createProduct);
router.put("/products/:id", protect, isAdmin, updateProduct);
router.delete("/products/:id", protect, isAdmin, deleteProduct);
router.put("/requirement/status/:id", protect, isAdmin, updateRequirementStatus);
router.put("/requirement/approve/:id", protect, isAdmin, approveRequirement);
router.get("/getallrequirements", protect, isAdmin, getAllRequirements);
router.get("/report/demand", protect, isAdmin, getProductDemandReport);

export default router;
