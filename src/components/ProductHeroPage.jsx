import React from 'react'

const ProductHeroPage = () => {
  return (
    <div className="relative overflow-hidden py-10 px-4 bg-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-20 right-20 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-50 animate-pulse delay-500"></div>
      
      <div className="relative text-center mb-16 max-w-4xl mx-auto px-4">
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 border border-purple-200/50 rounded-full backdrop-blur-sm bg-white/30">
            ✨ Premium Collection
          </span>
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
        </div>

        {/* Enhanced Title */}
        <div className="relative mb-6">
          <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 leading-tight">
            Featured Products
          </h2>
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 blur-xl rounded-3xl"></div>
        </div>

        {/* Enhanced Description */}
        <div className="relative mb-8">
          <p className="text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
            Discover our premium collection of handpicked items
          </p>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
        </div>

        {/* Multi-layered Decorative Elements */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-400 rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full animate-pulse delay-400"></div>
          </div>
          
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
          
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full animate-pulse delay-600"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full animate-pulse delay-800"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-red-400 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Additional Gradient Bars */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-400 rounded-full"></div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 rounded-full shadow-lg"></div>
          <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-transparent rounded-full"></div>
        </div>

        {/* Subtle Stats or Features */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
            <span>Handpicked Quality</span>
          </div>
          <div className="w-px h-4 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            <span>Premium Materials</span>
          </div>
          <div className="w-px h-4 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            <span>Exclusive Designs</span>
          </div>
        </div>

        {/* Bottom Gradient Accent */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
      </div>

      {/* Animated Border Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
    </div>
  );
};

export default ProductHeroPage