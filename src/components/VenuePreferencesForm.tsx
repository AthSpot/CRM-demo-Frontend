import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, Clock, DollarSign } from "lucide-react";

interface VenuePreferences {
  sport: string;
  location: string;
  distance: number;
  priceRange: [number, number];
  timePreference: string;
}

const VenuePreferencesForm = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<VenuePreferences>({
    sport: "",
    location: "",
    distance: 5,
    priceRange: [0, 100],
    timePreference: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/explore/venues", { state: { preferences } });
  };

  return (
    <div className="min-h-[calc(100vh-112px)] mt-16 p-4 flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Set Your Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sport">Sport</Label>
              <Select
                value={preferences.sport}
                onValueChange={(value) =>
                  setPreferences({ ...preferences, sport: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="volleyball">Volleyball</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Enter address or postal code"
                  value={preferences.location}
                  onChange={(e) =>
                    setPreferences({ ...preferences, location: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Distance (km)</Label>
              <Slider
                value={[preferences.distance]}
                onValueChange={([value]) =>
                  setPreferences({ ...preferences, distance: value })
                }
                max={50}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 km</span>
                <span>{preferences.distance} km</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Price Range ($)</Label>
              <Slider
                value={preferences.priceRange}
                onValueChange={(value) =>
                  setPreferences({ ...preferences, priceRange: value as [number, number] })
                }
                max={200}
                step={10}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${preferences.priceRange[0]}</span>
                <span>${preferences.priceRange[1]}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timePreference">Preferred Time</Label>
              <Select
                value={preferences.timePreference}
                onValueChange={(value) =>
                  setPreferences({ ...preferences, timePreference: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                  <SelectItem value="evening">Evening (5PM - 10PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Find Venues
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VenuePreferencesForm;