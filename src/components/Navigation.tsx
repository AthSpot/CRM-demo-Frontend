import { useLocation, Link } from "react-router-dom";
import { Home, Trophy, History, Compass, Wallet, Settings } from "lucide-react";
import { useState, useEffect } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const navigationItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: Trophy, label: "Achievements", path: "/achievements" },
    { icon: History, label: "History", path: "/history" },
    { icon: Wallet, label: "Wallet", path: "/wallet" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-3 px-6 flex justify-around items-center z-50">
      {navigationItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center space-y-1 ${
              isActive ? "text-primary" : "text-muted-foreground"
            } hover:text-primary transition-colors`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;