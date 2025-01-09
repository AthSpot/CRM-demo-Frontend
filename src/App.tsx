import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Navigation from "./components/Navigation";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import Discover from "./components/Discover";
import Analytics from "./components/Analytics";
import Explore from "./components/Explore";
import ExplorePartners from "./components/ExplorePartners";
import ExploreVenues from "./components/ExploreVenues";
import Auth from "./components/Auth";
import Wallet from "./components/Wallet";
import BookingConfirmation from "./components/BookingConfirmation";
import UserProfile from "./components/UserProfile";

const queryClient = new QueryClient();

// Wrapper component to get URL params
const UserProfileWrapper = () => {
  const { id } = useParams();
  return <UserProfile userId={id || '1'} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/partners" element={<ExplorePartners />} />
            <Route path="/explore/venues" element={<ExploreVenues />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/user/:id" element={<UserProfileWrapper />} />
            <Route
              path="/rewards"
              element={<div className="mt-16">Rewards Page (Coming Soon)</div>}
            />
            <Route
              path="/offline"
              element={<div className="mt-16">Offline Mode (Coming Soon)</div>}
            />
            <Route
              path="/training"
              element={<div className="mt-16">Training Plans (Coming Soon)</div>}
            />
            <Route path="/auth" element={<Auth />} />
            <Route path="/wallet" element={<Wallet />} />
          </Routes>
          <Navigation />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;