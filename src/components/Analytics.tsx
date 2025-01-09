import { BarChart2, Activity, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Analytics = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-6 w-6" />
              Activity Score
            </CardTitle>
            <CardDescription>Your weekly performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">850 points</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-6 w-6" />
              Training Plan
            </CardTitle>
            <CardDescription>AI-generated recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• 30min cardio session</li>
              <li>• Strength training</li>
              <li>• Recovery yoga</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2 h-6 w-6" />
              Progress
            </CardTitle>
            <CardDescription>Monthly overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;