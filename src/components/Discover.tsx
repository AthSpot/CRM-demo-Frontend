import { useState } from "react";
import { X, Heart } from "lucide-react";

interface Profile {
  id: string;
  name: string;
  age: number;
  sports: string[];
  image: string;
}

const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "John Doe",
    age: 28,
    sports: ["Basketball", "Running"],
    image: "https://source.unsplash.com/random/400x600/?athlete,1",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 25,
    sports: ["Tennis", "Yoga"],
    image: "https://source.unsplash.com/random/400x600/?athlete,2",
  },
];

const Discover = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"right" | "left" | null>(null);

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
    <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 p-4">
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

export default Discover;