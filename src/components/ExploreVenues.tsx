import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, Heart, Filter, Clock, DollarSign, Star, MapPin, List, Map as MapIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Calendar } from "./ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Map from "./Map";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "list" | "map" | "swipe";

const ExploreVenues = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [distance, setDistance] = useState([5]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentVenueIndex, setCurrentVenueIndex] = useState(0);

  // Initialize filters from preferences if available
  useEffect(() => {
    if (location.state?.preferences) {
      const { priceRange: prefPrice, distance: prefDistance } = location.state.preferences;
      setPriceRange(prefPrice);
      setDistance([prefDistance]);
      setSearchQuery(location.state.preferences.location || "");
    }
  }, [location.state]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const serializedDate = selectedDate.toISOString();
      setDate(selectedDate);
      
      if (selectedVenue) {
        navigate('/booking-confirmation', {
          state: {
            venueId: selectedVenue,
            date: serializedDate,
          }
        });
      }
    }
  };

  const handleVenueSelect = (venueId: string) => {
    setSelectedVenue(venueId);
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      // Like venue logic here
      console.log("Liked venue:", currentVenueIndex);
    }
    setCurrentVenueIndex((prev) => prev + 1);
  };

  const renderVenueCard = (venue: number, isSwipeMode = false) => (
    <div 
      className={`bg-white rounded-lg shadow-md p-4 ${
        isSwipeMode ? "absolute w-full" : ""
      }`}
      onClick={() => handleVenueSelect(`venue-${venue}`)}
    >
      <div className="relative h-48 bg-gray-200 rounded-lg mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">Venue {venue}</h3>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="text-sm">4.8</span>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <MapPin className="h-4 w-4 mr-1" />
        <span>2.5 km away</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <Clock className="h-4 w-4 mr-1" />
        <span>Open 6:00 - 22:00</span>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <DollarSign className="h-4 w-4 mr-1" />
        <span>From $15/hour</span>
      </div>
    </div>
  );

  return (
    <div className="p-4 mt-16 mb-20">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("map")}
          >
            <MapIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "swipe" ? "default" : "outline"}
            onClick={() => setViewMode("swipe")}
          >
            Swipe
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div className="space-y-2">
                  <Label>Price Range ($)</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Distance (km)</Label>
                  <Slider
                    value={distance}
                    onValueChange={setDistance}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0 km</span>
                    <span>{distance[0]} km</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {viewMode === "map" ? (
        <div className="h-[calc(100vh-200px)]">
          <Map />
        </div>
      ) : viewMode === "swipe" ? (
        <div className="relative h-[calc(100vh-200px)]">
          <AnimatePresence>
            <motion.div
              key={currentVenueIndex}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x > 100) handleSwipe("right");
                else if (offset.x < -100) handleSwipe("left");
              }}
              className="absolute inset-0"
            >
              {renderVenueCard(currentVenueIndex + 1, true)}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((venue) => (
            <Dialog key={venue}>
              <DialogTrigger asChild>
                {renderVenueCard(venue)}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Date</DialogTitle>
                  <DialogDescription>
                    Choose a date to see available time slots
                  </DialogDescription>
                </DialogHeader>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreVenues;