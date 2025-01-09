import { useState, useEffect } from "react";
import { Menu, BarChart2, Compass, Trophy, Wifi, Brain, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const user = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await fetch('/data/users.json');
      const data = await response.json();
      return data.users[0]; // For now, just return the first user
    },
    enabled: isAuthenticated
  });

  const menuItems = [
    { icon: BarChart2, label: "Analytics", path: "/analytics" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: Trophy, label: "Rewards", path: "/rewards" },
    { icon: Wifi, label: "Offline Mode", path: "/offline" },
    { icon: Brain, label: "Training Plans", path: "/training" },
    { icon: Wallet, label: "Wallet", path: "/wallet" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary">
                AthSpot
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/profile">
                <Avatar>
                  <AvatarImage src={user.data?.photo_url} />
                  <AvatarFallback>
                    {user.data?.first_name?.[0]}{user.data?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="outline">Login</Button>
              </Link>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-6 flow-root">
                  <div className="space-y-2">
                    {isAuthenticated ? (
                      menuItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-50"
                        >
                          <item.icon className="mr-4 h-6 w-6 text-primary" />
                          {item.label}
                        </Link>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-base text-gray-500">
                        Please log in to access the menu
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
