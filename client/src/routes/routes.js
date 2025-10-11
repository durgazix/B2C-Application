// // src/routes/routes.js

const routes = [
  // Auth
  { path: "/auth/login", component: "Login", role: "public" },
  { path: "/auth/register", component: "Register", role: "public" },

  // User Dashboard
  { path: "/user/dashboard", component: "UserDashboard", role: "user" },

  // Product listing (public)
  { path: "/products", component: "ProductList", role: "public" },
  { path: "/products/:id", component: "ProductDetail", role: "public" },

  // Requirement creation (user)
  { path: "/requirements/create", component: "RequirementForm", role: "user" },

  // Admin Dashboard & management
  { path: "/admin/dashboard", component: "AdminDashboard", role: "admin" },
  { path: "/admin/products", component: "AdminProductManager", role: "admin" },
  { path: "/admin/products/:id/edit", component: "AdminProductEdit", role: "admin" },
  { path: "/admin/requirements", component: "AdminRequirements", role: "admin" },
  { path: "/admin/report/demand", component: "AdminDemandReport", role: "admin" },
  { path: "/admin/customers", component: "AdminCustomers", role: "admin" },

  // SuperAdmin Dashboard & management
  { path: "/superadmin/dashboard", component: "SuperAdminDashboard", role: "superadmin" },
  { path: "/superadmin/users", component: "SuperAdminUsers", role: "superadmin" },
  { path: "/superadmin/admins", component: "SuperAdminAdmins", role: "superadmin" },
  { path: "/superadmin/requirements", component: "SuperAdminRequirements", role: "superadmin" },
  { path: "/superadmin/report/demand", component: "SuperAdminDemandReport", role: "superadmin" },
  { path: "/superadmin/promote/:id", component: "SuperAdminPromote", role: "superadmin" },
  { path: "/superadmin/delete/:id", component: "SuperAdminDeleteUser", role: "superadmin" },

  // Fallback/unauthorized
  { path: "/unauthorized", component: "Unauthorized", role: "public" },
];

export default routes;
