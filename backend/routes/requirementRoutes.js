// import express from "express";
// import {
//   createRequirement,
//   getAllRequirements,
//   getProductDemandReport,
// } from "../controllers/requirementController.js";

// import { protect } from "../middleware/authMiddleware.js";


// const router = express.Router();

// router.post("/createrequirements", protect, createRequirement); // user
// // router.get("/getrequirements", protect, isAdmin, getAllRequirements); // admin
// // router.get("/report/demand", protect, isAdmin, getProductDemandReport); // admin

// export default router;


import express from "express";
import {
  createRequirement,
  getAllRequirements,
  getProductDemandReport,
} from "../controllers/requirementController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// 👤 USER - Create requirement
router.post("/createrequirements", protect, createRequirement);

// 👨‍💼 ADMIN/SUPERADMIN - Manage requirements
router.get("/getrequirements", protect, authorizeRoles("admin", "superadmin"), getAllRequirements);
router.get("/report/demand", protect, authorizeRoles("admin", "superadmin"), getProductDemandReport);

export default router;
