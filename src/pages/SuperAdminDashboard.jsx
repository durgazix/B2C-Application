// import { useEffect, useState } from "react";
// import API from "../utils/axios";

// export default function SuperAdminDashboard() {
//   const [requirements, setRequirements] = useState([]);
//   const [stats, setStats] = useState([]);

//   useEffect(() => {
//     API.get("/superadmin/requirements").then(res => setRequirements(res.data));
//     API.get("/superadmin/report/demand").then(res => setStats(res.data));
//   }, []);

//   return (
//     <div>
//       <h2>Super Admin Dashboard</h2>
//       <h3>Requirements</h3>
//       <ul>
//         {requirements.map(r => (
//           <li key={r._id}>{r.productId?.name} - {r.quantityRequested} requested by {r.userId?.name}</li>
//         ))}
//       </ul>
//       <h3>Product Statistics</h3>
//       <ul>
//         {stats.map(s => (
//           <li key={s.productId}>{s.name}: {s.totalRequested} requested</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  BarChart3,
  Users,
  Package,
  TrendingUp,
  Eye,
  Filter,
  Search,
  Download,
  RefreshCw,
} from "lucide-react";
import API from "../utils/axios"; // ✅ Use actual API instead of mock

export default function SuperAdminDashboard() {
  const [requirements, setRequirements] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedView, setSelectedView] = useState("requirements");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [reqRes, statsRes] = await Promise.all([
        API.get("/superadmin/requirements"),
        API.get("/superadmin/report/demand"),
      ]);
      setRequirements(reqRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequirements = requirements.filter((req) => {
    const matchesSearch =
      req.productId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.userId?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRequests = requirements.length;
  const pendingRequests = requirements.filter(
    (r) => r.status === "pending"
  ).length;
  const approvedRequests = requirements.filter(
    (r) => r.status === "approved"
  ).length;
  const totalDemand = stats.reduce((sum, s) => sum + s.totalRequested, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const exportStatsAsCSV = () => {
    if (!stats.length) return;

    const headers = ["Product Name", "Category", "Total Requested"];
    const rows = stats.map((stat) => [
      stat.name,
      stat.category,
      stat.totalRequested,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "product_statistics.csv");
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Super Admin Dashboard
              </h1>
              <p className="text-slate-600 mt-1">
                Manage requirements and monitor system performance
              </p>
            </div>
            <button
              onClick={loadData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Requests
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {totalRequests}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">
                  {pendingRequests}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Approved</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {approvedRequests}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Demand
                </p>
                <p className="text-3xl font-bold text-purple-600 mt-1">
                  {totalDemand}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setSelectedView("requirements")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  selectedView === "requirements"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                Requirements Management
              </button>
              <button
                onClick={() => setSelectedView("statistics")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  selectedView === "statistics"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                Product Statistics
              </button>
            </nav>
          </div>

          {selectedView === "requirements" && (
            <div className="p-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by product or user name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Requirements List */}
              <div className="space-y-4">
                {filteredRequirements.map((req) => (
                  <div
                    key={req._id}
                    className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:shadow-sm transition-all hover:bg-slate-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${getPriorityColor(
                            req.priority
                          )}`}
                        ></div>
                        <div>
                          <h4 className="font-semibold text-slate-900">
                            {req.productId?.name}
                          </h4>
                          <p className="text-slate-600 text-sm">
                            Requested by{" "}
                            <span className="font-medium">
                              {req.userId?.name}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">
                            {req.quantityRequested} units
                          </p>
                          <p className="text-slate-500 text-xs">
                            {req.createdAt}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            req.status
                          )}`}
                        >
                          {req.status.charAt(0).toUpperCase() +
                            req.status.slice(1)}
                        </span>
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredRequirements.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">
                    No requirements found matching your criteria
                  </p>
                </div>
              )}
            </div>
          )}

          {selectedView === "statistics" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Product Demand Statistics
                </h3>
                <button
                  onClick={exportStatsAsCSV} // or exportStatsAsText
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              <div className="space-y-4">
                {stats
                  .sort((a, b) => b.totalRequested - a.totalRequested)
                  .map((stat, index) => (
                    <div
                      key={stat.productId}
                      className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-blue-600 text-sm">
                              #{index + 1}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">
                              {stat.name}
                            </h4>
                            <p className="text-slate-500 text-sm">
                              {stat.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900 text-lg">
                            {stat.totalRequested}
                          </p>
                          <p className="text-slate-500 text-xs">
                            Total Requested
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              (stat.totalRequested /
                                Math.max(
                                  ...stats.map((s) => s.totalRequested)
                                )) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
