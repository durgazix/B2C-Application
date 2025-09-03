// components/GetStatistics.jsx
const GetStatistics = ({ stats }) => {
  return (
    <section className="bg-white shadow-md p-6 rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        Product Demand Stats
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((s) => (
          <div
            key={s.productId}
            className="bg-gradient-to-r from-green-100 to-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-sm"
          >
            <p className="text-gray-800 text-lg font-medium">{s.name}</p>
            <p className="text-gray-600 text-sm">
              Total Requested:{" "}
              <span className="font-bold text-green-700">
                {s.totalRequested}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}


export default GetStatistics ;