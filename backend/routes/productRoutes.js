// import express from "express";
// import {
//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "../controllers/productController.js";
// // import { protect, isAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // 🔓 PUBLIC - Users can view products
// router.get("/allproducts", getAllProducts);
// router.get("/:id", getProductById);

// // 🔐 PROTECTED - Admin can manage products
// // router.post("/", protect, isAdmin, createProduct);
// // router.put("/:id", protect, isAdmin, updateProduct);
// // router.delete("/:id", protect, isAdmin, deleteProduct);

// export default router;


import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔓 PUBLIC - Users can view products
router.get("/allproducts", getAllProducts);
router.get("/:id", getProductById);

// 🔐 PROTECTED - Admin & Superadmin can manage products
router.post("/", protect, authorizeRoles("admin", "superadmin"), createProduct);
router.put("/:id", protect, authorizeRoles("admin", "superadmin"), updateProduct);
router.delete("/:id", protect, authorizeRoles("admin", "superadmin"), deleteProduct);

export default router;
