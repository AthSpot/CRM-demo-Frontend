import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Calendar } from "lucide-react";
import { loadUserProfiles } from "@/utils/data";

const UserProfile = ({ userId }: { userId: string }) => {
  const { data: userProfiles } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: loadUserProfiles,
  });

  const profile = userProfiles?.find((p) => p.id === userId);

  if (!profile) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-[calc(100vh-112px)] mt-16 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={`https://avatar.vercel.sh/${profile.id}`}
                alt={`User ${profile.id}`}
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>User Profile</CardTitle>
              <p className="text-sm text-muted-foreground">
                Member since {new Date(profile.updated_at).getFullYear()}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p>{profile.bio}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Preferred Sports</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.preferred_sports.map((sport) => (
                    <Badge key={sport} variant="secondary">
                      {sport}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Availability</h3>
                <div className="space-y-2">
                  {Object.entries(profile.availability).map(([day, times]) => (
                    <div key={day} className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{day}:</span>
                      <span className="text-muted-foreground">
                        {times.join(", ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Skill Level</h3>
                <Badge variant="outline" className="capitalize">
                  {profile.skill_level}
                </Badge>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Rating</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{profile.rating}</span>
                  <span className="text-muted-foreground">/ 5.0</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;