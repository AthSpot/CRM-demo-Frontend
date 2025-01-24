import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { Building2, CheckCircle, DollarSign, Users } from "lucide-react";

const AddVenueInfo = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const benefits = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Reach More Athletes",
      description: "Connect with sports enthusiasts looking for venues like yours"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-primary" />,
      title: "Increase Revenue",
      description: "Maximize your venue's potential with our booking system"
    },
    {
      icon: <Building2 className="w-6 h-6 text-primary" />,
      title: "Easy Management",
      description: "Manage bookings, availability, and payments in one place"
    }
  ];

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      navigate("/auth");
    } else {
      navigate("/venue/register");
    }
  };

  return (
    <div className="min-h-[calc(100vh-112px)] mt-16 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">List Your Sports Venue</h1>
          <p className="text-xl text-muted-foreground">
            Join our platform and connect with athletes looking for venues like yours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="flex justify-center">{benefit.icon}</div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How to Get Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Create an Account</h4>
                  <p className="text-sm text-muted-foreground">Sign up for free and verify your email</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Add Your Venue Details</h4>
                  <p className="text-sm text-muted-foreground">Provide information about your facilities</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Start Accepting Bookings</h4>
                  <p className="text-sm text-muted-foreground">Set your availability and pricing</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button size="lg" onClick={handleGetStarted}>
            {isAuthenticated ? "Register Your Venue" : "Sign Up to Get Started"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddVenueInfo;