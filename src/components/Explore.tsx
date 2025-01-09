import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const Explore = () => {
  return (
    <div className="min-h-[calc(100vh-112px)] mt-16 flex items-center justify-center bg-gray-50 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Link to="/explore/partners">
          <Card className="group hover:shadow-lg transition-all">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Find a Sports Partner</h2>
              <p className="text-gray-500 text-center">
                Connect with people who share your passion for sports
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/explore/venues">
          <Card className="group hover:shadow-lg transition-all">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <MapPin className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Find a Venue</h2>
              <p className="text-gray-500 text-center">
                Discover perfect locations for your next workout
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Explore;