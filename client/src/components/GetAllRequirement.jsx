// components/GetAllRequirement.jsx
const GetAllRequirement = ({ requirements, handleStatusUpdate }) => (
  <section className="bg-white shadow-md p-6 rounded-lg">
    <h3 className="text-2xl font-semibold text-gray-700 mb-4">
      User Requirements
    </h3>
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border text-sm">
        <thead className="bg-blue-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((req) => (
            <tr
              key={req._id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-4 py-2">{req.productId?.name}</td>
              <td className="px-4 py-2">{req.userId?.name}</td>
              <td className="px-4 py-2">{req.quantityRequested}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full font-semibold text-white ${
                    req.status === "approved"
                      ? "bg-green-600"
                      : req.status === "rejected"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {req.status}
                </span>
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => handleStatusUpdate(req._id, "approved")}
                  disabled={req.status !== "pending"}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(req._id, "rejected")}
                  disabled={req.status !== "pending"}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default GetAllRequirement;