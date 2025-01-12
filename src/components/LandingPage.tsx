import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { motion } from "framer-motion";
import { ArrowDown, Phone, MapPin, Calendar, Users, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN";
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [0, 0],
      zoom: 2,
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const features = [
    {
      icon: MapPin,
      title: "Find Sports Venues",
      description: "Discover and book sports facilities near you"
    },
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Schedule your games with just a few clicks"
    },
    {
      icon: Users,
      title: "Connect with Athletes",
      description: "Join a community of sports enthusiasts"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Safe and easy payment processing"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Map Background */}
      <div className="fixed inset-0 z-0" ref={mapContainer} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="/placeholder.svg"
                alt="Person holding phone"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
                Find Your Perfect Sport Venue
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Book sports facilities, connect with athletes, and play your favorite sports.
              </p>
              <Link to="/explore">
                <Button size="lg" className="animate-bounce">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ArrowDown className="w-8 h-8 text-primary animate-bounce" />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="min-h-screen py-20 bg-white/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                Why Choose AthSpot?
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to enjoy sports in one place
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <feature.icon className="w-12 h-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About AthSpot</h3>
              <p className="text-gray-300">
                Your ultimate platform for finding and booking sports venues.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/explore" className="text-gray-300 hover:text-white transition-colors">Explore</Link></li>
                <li><Link to="/analytics" className="text-gray-300 hover:text-white transition-colors">Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-5 h-5" />
                <span>+1 234 567 890</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} AthSpot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;