import { useEffect, useState } from "react";
import API from "../utils/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductHeroPage from "../components/ProductHeroPage";
import RollingFeature from "../components/RollingFeature";
import AddProduct from "../components/AddProduct";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());

  useEffect(() => {
    API.get("/products/allproducts").then((res) => setProducts(res.data));
  }, []);

  const showNotification = (message, type = "success") => {
    const id = Date.now();
    const notification = { id, message, type };

    setNotifications((prev) => [...prev, notification]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleBuy = async (productId) => {
    const quantityRequested = 1;
    setLoadingProducts((prev) => ({ ...prev, [productId]: true }));

    try {
      await API.post("/requirements/createrequirements", {
        productId,
        quantityRequested,
      });
      showNotification("Product added to cart successfully! 🛒", "success");
    } catch (err) {
      console.log(err);
      showNotification("Failed to add product. Please try again.", "error");
    } finally {
      setLoadingProducts((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      const isInWishlist = newWishlist.has(productId);

      if (isInWishlist) {
        newWishlist.delete(productId);
        setTimeout(() => {
          showNotification("Removed from wishlist", "error");
        }, 0);
      } else {
        newWishlist.add(productId);
        setTimeout(() => {
          showNotification("Added to wishlist ❤️", "success");
        }, 0);
      }

      return newWishlist;
    });
  };


  return (
    <div className="mt-10 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen flex flex-col">
      <Navbar />

      {/* Notification Container */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`
              flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl transform transition-all duration-500 ease-in-out backdrop-blur-sm
              ${
                notification.type === "success"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                  : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
              }
            `}
            style={{
              animation: `slideInRight 0.5s ease-out, ${
                notification.type === "success"
                  ? "pulse 2s infinite"
                  : "bounce 1s ease-in-out"
              }`,
            }}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                notification.type === "success"
                  ? "bg-white animate-ping"
                  : "bg-white animate-bounce"
              }`}
            ></div>
            <span className="font-semibold">{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 hover:bg-white hover:bg-opacity-30 rounded-full p-1 transition-all duration-200 text-xl font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex-1 container mx-auto px-4 py-12">
        <ProductHeroPage />
        <RollingFeature />

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl p-3 flex flex-col transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm z-10">
                HOT
              </div>

              <div className="relative mb-3 w-full">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={
                      p.image
                        ? `${p.image}`
                        : `https://picsum.photos/200/200?random=${p._id}`
                    }
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-${
                        Math.random() > 0.5
                          ? "1505740420928-5e560c06d30e"
                          : "1523275335684-37898b6baf30"
                      }?w=200&h=200&fit=crop&auto=format`;
                    }}
                  />
                </div>

                <button
                  onClick={() => toggleWishlist(p._id)}
                  className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                  <svg
                    className={`w-3 h-3 transition-all duration-300 ${
                      wishlist.has(p._id)
                        ? "text-transparent"
                        : "text-gray-400 hover:text-red-500"
                    }`}
                    fill={wishlist.has(p._id) ? "url(#heartGradient)" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <defs>
                      <linearGradient
                        id="heartGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              <div className="text-center w-full flex-1 flex flex-col">
                <h3 className="text-sm font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                  {p.name}
                </h3>
                <p className="text-gray-500 mb-2 text-xs leading-tight line-clamp-2 flex-1">
                  {p.description}
                </p>

                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3 h-3 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-lg font-bold text-blue-600">
                      ${p.price}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ${(p.price * 1.2).toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    Free Ship
                  </div>
                </div>

                <button
                  className={`
                    w-full py-2 px-3 rounded-lg font-medium text-white transform transition-all duration-300 relative overflow-hidden text-sm
                    ${
                      loadingProducts[p._id]
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    }
                  `}
                  onClick={() => handleBuy(p._id)}
                  disabled={loadingProducts[p._id]}
                >
                  <div className="relative flex items-center justify-center gap-1">
                    {loadingProducts[p._id] ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs">Adding...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 5H21M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                          />
                        </svg>
                        <span className="text-xs">Add to Cart</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Load More Products
          </button>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .rolling-container {
          width: 100%;
          height: 200px;
          display: flex;
          align-items: center;
          position: relative;
        }

        .rolling-track {
          display: flex;
          animation: roll 30s linear infinite;
          gap: 2rem;
        }

        .rolling-container:hover .rolling-track {
          animation-play-state: paused;
        }

        .rolling-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes roll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          40%,
          43% {
            transform: translate3d(0, -5px, 0);
          }
          70% {
            transform: translate3d(0, -3px, 0);
          }
          90% {
            transform: translate3d(0, -1px, 0);
          }
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        /* Custom scrollbar for modern look */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default ProductList;
