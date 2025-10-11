// const Services = () => {
//   return (
//     <section id="services" className="mt-8 text-center w-full">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-2 text-blue-600">Product Management</h2>
//             <p className="text-gray-600">Browse, add, and manage products with ease.</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-2 text-blue-600">Requirement Tracking</h2>
//             <p className="text-gray-600">Submit and track your requirements in real time.</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-2 text-blue-600">Role-Based Dashboards</h2>
//             <p className="text-gray-600">Custom dashboards for users, admins, and superadmins.</p>
//           </div>
//         </div>
//     </section>
//   );
// }

// export default Services;


import { useState, useEffect, useRef } from "react";
import { 
  Package, 
  ClipboardList, 
  Users, 
  BarChart3, 
  Shield, 
  Zap, 
  Cloud, 
  Headphones,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const servicesRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const autoScrollRef = useRef(null);

  const services = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Product Management",
      description: "Browse, add, and manage products with ease using our intuitive interface.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      features: ["Inventory Control", "Product Analytics", "Bulk Operations"]
    },
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: "Requirement Tracking",
      description: "Submit and track your requirements in real time with detailed progress updates.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      features: ["Real-time Updates", "Progress Monitoring", "Status Notifications"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Role-Based Dashboards",
      description: "Custom dashboards tailored for users, admins, and superadmins with specific permissions.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      features: ["User Roles", "Custom Views", "Access Control"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Comprehensive business intelligence with interactive charts and detailed reports.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      features: ["Data Visualization", "Custom Reports", "Export Options"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security & Compliance",
      description: "Enterprise-grade security with compliance standards and data protection.",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      features: ["Data Encryption", "Audit Trails", "Compliance Reports"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "API Integration",
      description: "Seamless integration with third-party services and custom API endpoints.",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      features: ["REST APIs", "Webhooks", "Custom Integrations"]
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Infrastructure",
      description: "Scalable cloud solutions with automatic backups and 99.9% uptime guarantee.",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
      features: ["Auto Scaling", "Data Backup", "CDN Support"]
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support with dedicated account managers.",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      features: ["Live Chat", "Phone Support", "Priority Tickets"]
    }
  ];

  // Create duplicated services for infinite scroll effect
  const duplicatedServices = [...services, ...services, ...services];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setIsAutoScrolling(true);
          } else {
            setIsAutoScrolling(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  // Auto-scroll functionality with infinite loop
  useEffect(() => {
    if (isAutoScrolling && !isPaused) {
      autoScrollRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const next = prev + 1;
          // Reset to start of middle section for seamless loop
          if (next >= services.length * 2) {
            return services.length;
          }
          return next;
        });
      }, 2500); // Scroll every 2.5 seconds
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, isPaused, services.length]);

  // Update scroll position when currentSlide changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = 336; // Card width (320px) + gap (16px)
      const scrollPosition = currentSlide * cardWidth;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: currentSlide === services.length ? 'auto' : 'smooth'
      });
    }
  }, [currentSlide, services.length]);

  const handleCardHover = (isHovered) => {
    setIsPaused(isHovered);
  };

  const scrollToSlide = (direction) => {
    if (direction === 'next') {
      setCurrentSlide((prev) => {
        const next = prev + 1;
        if (next >= services.length * 2) {
          return services.length;
        }
        return next;
      });
    } else if (direction === 'prev') {
      setCurrentSlide((prev) => {
        const prevSlide = prev - 1;
        if (prevSlide < services.length) {
          return services.length * 2 - 1;
        }
        return prevSlide;
      });
    }
  };

  return (
    <section 
      ref={servicesRef}
      id="services" 
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-violet-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-10 right-1/4 w-24 h-24 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-10 left-1/4 w-28 h-28 bg-gradient-to-r from-yellow-400/10 to-red-400/10 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-transparent bg-clip-text px-4 py-2 rounded-full text-sm font-medium mb-4 border border-blue-200/50 dark:border-blue-700/50 shadow-lg backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-semibold">
              Our Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-gray-100 dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
            Comprehensive Solutions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto bg-gradient-to-r from-gray-600 to-gray-500 dark:from-gray-400 dark:to-gray-300 bg-clip-text text-transparent">
            Discover our full range of services designed to streamline your business operations and drive growth
          </p>
        </div>

        {/* Services Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 mb-16">
          {services.slice(0, 4).map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => handleCardHover(true)}
              onMouseLeave={() => handleCardHover(false)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              
              <div className={`flex items-center justify-center w-14 h-14 bg-gradient-to-r ${service.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {service.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                    <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full mr-2`} />
                    {feature}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Horizontal Scrolling Cards */}
        <div className="relative">
          {/* Navigation buttons */}
                      <button
            onClick={() => scrollToSlide('prev')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:scale-110 hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          </button>
          
          <button
            onClick={() => scrollToSlide('next')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:scale-110 hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          </button>

          {/* Scrolling container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-hidden pb-4 px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedServices.map((service, index) => (
              <div
                key={`${index}-${service.title}`}
                className={`group relative flex-shrink-0 w-80 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-750 dark:to-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}
                style={{ transitionDelay: `${(index % services.length) * 100}ms` }}
                onMouseEnter={() => handleCardHover(true)}
                onMouseLeave={() => handleCardHover(false)}
              >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
                
                <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`} />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <button className={`w-full py-3 px-4 bg-gradient-to-r ${service.color} hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center group-hover:shadow-xl relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {services.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                (currentSlide % services.length) === index
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 w-8 shadow-lg'
                  : 'bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 hover:from-gray-400 hover:to-gray-500 dark:hover:from-gray-500 dark:hover:to-gray-400 w-2'
              }`}
              onClick={() => setCurrentSlide(services.length + index)}
            />
          ))}
        </div>

        {/* Auto-scroll status indicator */}
        <div className="flex justify-center mt-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 backdrop-blur-sm border ${
            isPaused 
              ? 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 dark:from-orange-900/30 dark:to-red-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-700' 
              : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400 border-green-200 dark:border-green-700'
          }`}>
            {isPaused ? '⏸️ Auto-scroll paused' : '▶️ Auto-scrolling'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;