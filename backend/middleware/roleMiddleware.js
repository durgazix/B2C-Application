export const isAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "superadmin")) {
    next();
  } else {
    res.status(403).json({ msg: "Access denied: Admins only" });
  }
};

export const isSuperAdmin = (req, res, next) => {
  if (req.user && req.user.role === "superadmin") {
    return next();
  }
  return res.status(403).json({ msg: "Access denied: Super Admin only" });
};
