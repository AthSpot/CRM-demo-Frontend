import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Heart, Filter, Clock, DollarSign, Star, MapPin } from "lucide-react";
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

const ExploreVenues = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    // Ensure we're only passing serializable data
    if (selectedDate) {
      const serializedDate = selectedDate.toISOString();
      setDate(selectedDate);
      
      if (selectedVenue) {
        // Pass only serializable data in navigation state
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

  return (
    <div className="p-4 mt-16 mb-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Explore Venues</h1>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Venue Cards */}
      <div className="space-y-4">
        {[1, 2, 3].map((venue) => (
          <Dialog key={venue}>
            <DialogTrigger asChild>
              <div 
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                onClick={() => handleVenueSelect(`venue-${venue}`)}
              >
                <div className="relative h-48 bg-gray-200 rounded-lg mb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
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
    </div>
  );
};

export default ExploreVenues;
