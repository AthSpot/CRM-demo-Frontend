import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Users, Star, Clock, Activity } from "lucide-react";
import { loadUserProfiles } from "@/utils/data";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const { data: userProfiles } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: loadUserProfiles,
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pt-16 pb-20 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Welcome to AthSpot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Find and book sports facilities, connect with athletes, and manage your sports activities all in one place.
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => navigate("/auth?mode=login")}>
                  Log In
                </Button>
                <Button variant="outline" onClick={() => navigate("/auth?mode=signup")}>
                  Sign Up
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Featured Venues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Sports Center {i}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span>4.{i}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Multiple sports available
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>20+ active users</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 pb-20 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userProfiles?.map((profile) => (
                <div key={profile.id} className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/${profile.id}`} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      User {profile.id} played {profile.preferred_sports[0]}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(profile.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userProfiles?.map((profile) => (
                <div
                  key={profile.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        {profile.preferred_sports[0]} Session
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        With {Object.keys(profile.availability).length} others
                      </p>
                    </div>
                    <Badge>{profile.skill_level}</Badge>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      {Object.entries(profile.availability)[0]?.[1]?.[0]}
                    </span>
                    <MapPin className="h-4 w-4 ml-2" />
                    <span>2.5 km away</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Venues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Recommended Venues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={`https://source.unsplash.com/random/400x300/?sport,${i}`}
                    alt="Venue"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Sports Center {i}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span>4.{i}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Multiple sports available
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>20+ active users</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;