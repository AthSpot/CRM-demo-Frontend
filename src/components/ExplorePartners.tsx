import { useState } from "react";
import { X, Heart, Filter } from "lucide-react";
import { Button } from "./ui/button";

interface Profile {
  id: string;
  name: string;
  age: number;
  sports: string[];
  availability: string[];
  level: string;
  image: string;
}

const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "John Doe",
    age: 28,
    sports: ["Basketball", "Running"],
    availability: ["Mon", "Wed", "Fri"],
    level: "Intermediate",
    image: "https://source.unsplash.com/random/400x600/?athlete,1",
  },
];

const ExplorePartners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"right" | "left" | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const currentProfile = mockProfiles[currentIndex];

  const handleSwipe = (swipeDirection: "right" | "left") => {
    setDirection(swipeDirection);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % mockProfiles.length);
      setDirection(null);
    }, 300);
  };

  if (!currentProfile) return null;

  return (
    <div className="h-[calc(100vh-112px)] mt-16 flex items-center justify-center bg-gray-50 p-4">
      <Button
        variant="outline"
        size="icon"
        className="fixed top-20 right-4 z-10"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter className="h-4 w-4" />
      </Button>

      {showFilters && (
        <div className="fixed top-32 right-4 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
          <h3 className="font-semibold mb-2">Filters</h3>
          {/* Add filter controls here */}
        </div>
      )}

      <div
        className={`relative w-full max-w-sm aspect-[3/4] bg-white rounded-xl shadow-xl overflow-hidden transform transition-transform duration-300 ${
          direction === "right"
            ? "animate-slide-out"
            : direction === "left"
            ? "animate-slide-out"
            : ""
        }`}
      >
        <img
          src={currentProfile.image}
          alt={currentProfile.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <h2 className="text-2xl font-bold">
            {currentProfile.name}, {currentProfile.age}
          </h2>
          <div className="flex gap-2 mt-2">
            {currentProfile.sports.map((sport) => (
              <span
                key={sport}
                className="px-3 py-1 bg-accent/80 rounded-full text-sm"
              >
                {sport}
              </span>
            ))}
          </div>
          <div className="mt-2">
            <p className="text-sm opacity-80">Available: {currentProfile.availability.join(", ")}</p>
            <p className="text-sm opacity-80">Level: {currentProfile.level}</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 flex justify-center gap-6 p-4">
        <button
          onClick={() => handleSwipe("left")}
          className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg text-red-500 hover:bg-red-50 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg text-green-500 hover:bg-green-50 transition-colors"
        >
          <Heart className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default ExplorePartners;