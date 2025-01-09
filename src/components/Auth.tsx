import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Test login credentials
    const testEmail = "john.doe@example.com";
    const testPassword = "password123";

    if (isLogin) {
      if (email === testEmail && password === testPassword) {
        toast({
          title: "Success",
          description: "You have successfully logged in!",
        });
        // In a real app, you would set the auth token here
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
        window.location.reload(); // Temporary solution to update auth state
      } else {
        toast({
          title: "Error",
          description: "Invalid credentials. Use test account: john.doe@example.com / password123",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Registration",
        description: "Registration will be implemented soon!",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-112px)] mt-16 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>
          <Button
            variant="link"
            className="mt-4 w-full"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Need an account? Register" : "Already have an account? Login"}
          </Button>
          {isLogin && (
            <div className="mt-4 text-sm text-gray-500 text-center">
              Test account:<br />
              Email: john.doe@example.com<br />
              Password: password123
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;