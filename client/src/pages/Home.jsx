import { useState, useEffect, useRef } from "react";
import { ChevronDown, Sparkles, Zap, Shield, Target } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Services from "../components/Services";
import Contact from "../components/Contact";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [counters, setCounters] = useState({
    users: 0,
    countries: 0,
    uptime: 0,
    support: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsNode = statsRef.current;

    if (statsNode) {
      observer.observe(statsNode);
    }

    return () => {
      if (statsNode) {
        observer.unobserve(statsNode);
      }
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    const targets = {
      users: 10000,
      countries: 50,
      uptime: 99.9,
      support: 24
    };

    const duration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = (duration / 1000) * frameRate;

    const increments = {
      users: targets.users / totalFrames,
      countries: targets.countries / totalFrames,
      uptime: targets.uptime / totalFrames,
      support: targets.support / totalFrames
    };

    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      setCounters({
        users: Math.min(Math.floor(increments.users * frame), targets.users),
        countries: Math.min(Math.floor(increments.countries * frame), targets.countries),
        uptime: Math.min(parseFloat((increments.uptime * frame).toFixed(1)), targets.uptime),
        support: Math.min(Math.floor(increments.support * frame), targets.support)
      });

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, 1000 / frameRate);
  };

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Product Management",
      description: "Streamline your product lifecycle"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Requirement Tracking",
      description: "Monitor progress with precision"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Business Analytics",
      description: "Data-driven insights for growth"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease-out"
          }}
        />
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-400/30 to-red-400/30 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full blur-xl animate-ping" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          {/* Animated Title */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-yellow-500 animate-spin mr-3" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                Welcome to the Future
              </span>
              <Sparkles className="w-8 h-8 text-yellow-500 animate-spin ml-3" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-pulse">
              BTC Application
            </h1>
            
            <div className="relative">
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Your ultimate 
                <span className="relative mx-2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-semibold">
                    one-stop solution
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full h-2" viewBox="0 0 100 8" fill="none">
                    <path d="M0 4C20 2 40 2 60 4C80 6 100 6 100 4" stroke="url(#gradient)" strokeWidth="2" fill="none" className="animate-pulse"/>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                for product management, requirement tracking, and business analytics.
              </p>
            </div>
          </div>

          {/* Animated CTA Buttons */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
              </button>
              
              <button className="group px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                Learn More
                <ChevronDown className="inline-block w-5 h-5 ml-2 group-hover:animate-bounce" />
              </button>
            </div>
          </div>

          {/* Animated Hero Image */}
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl animate-pulse" />
              <img 
                src="https://code-epics.com/wp-content/uploads/2025/03/b2c-business-customer-marketing-strategy-concept-businessman-use-smartphone-with-virtual-b2c-icon-business-strategy-communication-feedback-online-marketing-ecommerce-marketing-strategy_35148-9498.jpg" 
                alt="BTC Application Dashboard" 
                className="relative w-full h-auto rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
              />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full animate-ping" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-500 rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Why Choose BTC?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Experience the power of next-generation business solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "50+", label: "Countries" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2 animate-pulse">
                  {stat.number}
                </div>
                <div className="text-blue-100 dark:text-blue-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services and Contact Sections */}
      <div id="services">
        <Services />
      </div>
      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </div>
  );
};

export default Home;