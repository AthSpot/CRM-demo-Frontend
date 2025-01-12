import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useToast } from "./ui/use-toast";
import { UserProfile } from "@/types/data";
import { loadUserProfiles } from "@/utils/data";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, MapPin, Users, Wallet, CreditCard } from "lucide-react";
import { Separator } from "./ui/separator";

interface BookingDetails {
  venueName: string;
  date: Date;
  time: string;
  price: string;
  location?: string;
  courtNumber?: string;
}

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  // Get booking details from location state with type safety
  const bookingDetails = location.state as BookingDetails | undefined;

  const { data: userProfiles } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: loadUserProfiles,
  });

  const handlePayment = (method: "wallet" | "card") => {
    toast({
      title: "Payment Processing",
      description: `Processing payment via ${method}...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Booking Confirmed",
        description: "Your booking has been confirmed! Check your email for details.",
        duration: 5000,
      });
      navigate("/");
    }, 1500);
  };

  // If no booking details are found, show the error state
  if (!bookingDetails) {
    return (
      <div className="min-h-[calc(100vh-112px)] mt-16 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">
              No booking details found. Please try again.
            </p>
            <Button 
              className="w-full mt-4"
              onClick={() => navigate("/explore/venues")}
            >
              Return to Venues
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate prices with proper type checking
  const totalPrice = bookingDetails.price ? parseFloat(bookingDetails.price.replace(/[^0-9.]/g, '')) : 0;
  const serviceFee = totalPrice * 0.1; // 10% service fee
  const finalTotal = totalPrice + serviceFee;

  return (
    <div className="min-h-[calc(100vh-112px)] mt-16 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Confirm Your Booking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold">Venue</h3>
                  <p>{bookingDetails.venueName}</p>
                  {bookingDetails.location && (
                    <p className="text-sm text-muted-foreground">{bookingDetails.location}</p>
                  )}
                  {bookingDetails.courtNumber && (
                    <p className="text-sm text-muted-foreground">Court {bookingDetails.courtNumber}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold">Date & Time</h3>
                  <p>
                    {new Date(bookingDetails.date).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-muted-foreground">{bookingDetails.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold">Invite Friends</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userProfiles?.map((profile: UserProfile) => (
                      <Button
                        key={profile.id}
                        variant={selectedUsers.includes(profile.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() =>
                          setSelectedUsers((prev) =>
                            prev.includes(profile.id)
                              ? prev.filter((id) => id !== profile.id)
                              : [...prev, profile.id]
                          )
                        }
                      >
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${profile.id}`}
                            alt={`User ${profile.id}`}
                          />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        User {profile.id}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Booking fee</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Service fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <Button
                className="flex items-center justify-center gap-2"
                onClick={() => handlePayment("wallet")}
              >
                <Wallet className="h-4 w-4" />
                Pay with Wallet
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => handlePayment("card")}
              >
                <CreditCard className="h-4 w-4" />
                Pay with Card
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingConfirmation;