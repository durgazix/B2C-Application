// import jwt from "jsonwebtoken";
// import User from "../models/User.js";


// export const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ msg: "Authorization token missing" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_WEB_SECRET);
//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({ msg: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ msg: "Token is invalid or expired" });
//   }
// };
// export const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ msg: "Access denied" });
//     }
//     next();
//   };
// };


import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware: Protect routes (check if logged in with valid token)
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_WEB_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user; // attach logged-in user to request
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is invalid or expired" });
  }
};

// Middleware: Authorize roles (e.g. admin, superadmin)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  };
};
