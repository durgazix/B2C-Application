import { useEffect, useState } from "react";
import API from "../utils/axios";
import GetAllRequirement from "../components/GetAllRequirement";
import GetStatistics from "../components/GetStatistics";
import AddProduct from "../components/AddProduct";

export default function AdminDashboard() {
  const [requirements, setRequirements] = useState([]);
  const [stats, setStats] = useState([]);
  const [activeTab, setActiveTab] = useState("requirements");

  const fetchData = async () => {
    try {
      const [reqRes, statsRes] = await Promise.all([
        API.get("/admin/getallrequirements"),
        API.get("/admin/report/demand"),
      ]);
      setRequirements(reqRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await API.put(`/api/requirement/status/${id}`, { status: newStatus });
      fetchData();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-100 to-blue-100 min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white shadow-md px-6 py-3 sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-blue-900">Admin Dashboard</h2>
        <div className="space-x-4">
          <button
            onClick={() => setActiveTab("requirements")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "requirements"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Requirements
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "stats"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Demand Stats
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === "products"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Products
          </button>
        </div>
      </nav>

      <div className="p-6 space-y-10">
        {activeTab === "requirements" && (
          <GetAllRequirement
            requirements={requirements}
            handleStatusUpdate={handleStatusUpdate}
          />
        )}
        {activeTab === "stats" && <GetStatistics stats={stats} />}
        {activeTab === "products" && (
          <section className="bg-white shadow-md p-6 rounded-lg">
            <AddProduct
              onProductAdded={(newProduct) =>
                console.log("Product added", newProduct)
              }
            />
          </section>
        )}
      </div>
    </div>
  );
}
