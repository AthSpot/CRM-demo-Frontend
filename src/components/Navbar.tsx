import { useState, useEffect } from "react";
import { Menu, BarChart2, Compass, Trophy, Wifi, Brain, Wallet, UserRound, LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await fetch('/data/users.json');
      const data = await response.json();
      return data.users[0];
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
    toast({
      title: "Logged out successfully",
      duration: 2000,
    });
    navigate("/");
  };

  const menuItems = [
    { icon: BarChart2, label: "Analytics", path: "/analytics" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: Trophy, label: "Rewards", path: "/rewards" },
    { icon: Wifi, label: "Offline Mode", path: "/offline" },
    { icon: Brain, label: "Training Plans", path: "/training" },
  ];

  const renderAuthSection = () => {
    if (!isAuthenticated) {
      return (
        <Link to="/auth">
          <Button variant="outline">Login</Button>
        </Link>
      );
    }

    if (isLoading) {
      return <Skeleton className="h-10 w-10 rounded-full" />;
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={user?.photo_url} 
                alt={`${user?.first_name} ${user?.last_name}`} 
              />
              <AvatarFallback className="bg-primary/10">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuItem onClick={() => navigate("/user/1")} className="cursor-pointer">
            <UserRound className="mr-2 h-4 w-4" />
            <span>View Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/wallet")} className="cursor-pointer">
            <Wallet className="mr-2 h-4 w-4" />
            <span>Wallet</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background border-b border-border z-50">
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
            {renderAuthSection()}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-6 flow-root">
                  <div className="space-y-2">
                    {isAuthenticated ? (
                      menuItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center px-3 py-2 text-base font-medium text-foreground rounded-md hover:bg-accent hover:text-accent-foreground"
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="mr-4 h-6 w-6 text-primary" />
                          {item.label}
                        </Link>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-base text-muted-foreground">
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