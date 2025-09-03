import React from 'react'
import { useState, useEffect } from 'react';
import API from '../utils/axios';


const RollingFeature = () => {
    useEffect(() => {
    API.get("/products/allproducts").then((res) => setProducts(res.data));
  }, []);

      // Create duplicated array for seamless loop
      const [products, setProducts] = useState([]);
      const heroProducts = [...products, ...products];

  return (
    <div>
        <div className="mb-20 overflow-hidden">
          <div className="rolling-container group">
            <div className="rolling-track">
              {heroProducts.map((product, index) => (
                <div key={`${product._id}-${index}`} className="rolling-item">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-white transform transition-all duration-100 hover:scale-110 hover:shadow-3xl bg-gradient-to-br from-blue-100 to-purple-100">
                      <img
                        src={
                          product.image
                            ? `${product.image}`
                            : `https://picsum.photos/128/128?random=${product._id}`
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://images.unsplash.com/photo-${
                            Math.random() > 0.5
                              ? "1505740420928-5e560c06d30e"
                              : "1523275335684-37898b6baf30"
                          }?w=128&h=128&fit=crop&auto=format`;
                        }}
                      />
                    </div>

                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs font-semibold text-gray-800 whitespace-nowrap">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default RollingFeature