import { MapIcon, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-around items-center z-50">
      <Link
        to="/"
        className={`flex flex-col items-center ${
          location.pathname === "/" ? "text-primary" : "text-gray-500"
        }`}
      >
        <MapIcon className="w-6 h-6" />
        <span className="text-xs mt-1">Map</span>
      </Link>
      <Link
        to="/discover"
        className={`flex flex-col items-center ${
          location.pathname === "/discover" ? "text-primary" : "text-gray-500"
        }`}
      >
        <Users className="w-6 h-6" />
        <span className="text-xs mt-1">Discover</span>
      </Link>
    </nav>
  );
};

export default Navigation;