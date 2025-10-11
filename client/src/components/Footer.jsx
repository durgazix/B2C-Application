// const Footer = () => {
//   return (
//     <footer style={{marginTop:"2rem", padding:"1rem", background:"#eee", textAlign:"center"}}>
//       &copy; {new Date().getFullYear()} BTC Application. All rights reserved.
//     </footer>
//   );
// }

// export default Footer;


import { useState, useEffect } from "react";
import { 
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  ArrowUp,
  Heart,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Globe,
  Package
} from "lucide-react";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Team", href: "#team" },
      { name: "Careers", href: "#careers" },
      { name: "Press & Media", href: "#news" }
    ],
    services: [
      { name: "Online Shopping", href: "#shopping" },
      { name: "Product Catalog", href: "#catalog" },
      { name: "Order Tracking", href: "#tracking" },
      { name: "Customer Support", href: "#support" }
    ],
    support: [
      { name: "Help Center", href: "#help" },
      { name: "Contact Us", href: "#contact" },
      { name: "Shipping Info", href: "#shipping" },
      { name: "Returns & Refunds", href: "#returns" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "Seller Agreement", href: "#seller" }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", color: "hover:text-blue-500" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", color: "hover:text-sky-500" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", color: "hover:text-pink-500" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/durga-prasad-sahoo-427213287/", color: "hover:text-blue-600" },
    { icon: <Github className="w-5 h-5" />, href: "https://www.github.com/durgazix", color: "hover:text-gray-900 dark:hover:text-white" }
  ];

  const features = [
    { icon: <Shield className="w-5 h-5" />, text: "Secure Payments" },
    { icon: <Zap className="w-5 h-5" />, text: "Fast Delivery" },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Best Prices" },
    { icon: <Users className="w-5 h-5" />, text: "24/7 Support" }
  ];

  return (
    <>
      <footer 
        id="footer"
        className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-2xl animate-bounce" />
          
          {/* Floating Shopping symbols */}
          <div className="absolute top-1/4 left-1/4 opacity-20">
            <ShoppingBag className="w-8 h-8 text-blue-500 animate-pulse" />
          </div>
          <div className="absolute top-3/4 right-1/4 opacity-20">
            <Package className="w-6 h-6 text-green-500 animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute top-1/3 right-1/3 opacity-20">
            <ShoppingBag className="w-10 h-10 text-purple-400 animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          {/* Top Section */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <ShoppingBag className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    CommerceHub
                  </h3>
                  <p className="text-gray-400 text-sm">Your Shopping Destination</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Your trusted online marketplace offering quality products, seamless shopping experience, 
                and exceptional customer service. Discover amazing deals and shop with confidence.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-sm"
                  >
                    <div className="text-blue-400">
                      {feature.icon}
                    </div>
                    <span className="text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email Us</p>
                <p className="text-white font-medium">support@commercehub.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Call Us</p>
                <p className="text-white font-medium">+(91) 7847921078</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Visit Us</p>
                <p className="text-white font-medium">Kuakhia, Jajpur, Odisha</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className={`border-t border-gray-700 pt-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-400">
                <span>&copy; {new Date().getFullYear()} CommerceHub. All rights reserved.</span>
                <div className="flex items-center space-x-1 text-red-400">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 animate-pulse" />
                  <span>for happy shopping</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">Follow us:</span>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/20`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-800 text-center">
              <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span>Serving customers nationwide</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full hidden md:block" />
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Secure & Trusted Shopping</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full hidden md:block" />
                <div className="flex items-center space-x-1">
                  <Package className="w-4 h-4" />
                  <span>Over 10,000+ products delivered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Footer;