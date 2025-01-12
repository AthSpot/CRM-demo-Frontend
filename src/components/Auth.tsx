import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "./ui/use-toast";
import { useNavigate, Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { Separator } from "./ui/separator";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already authenticated
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (isAuthenticated) {
    return <Navigate to="/explore" replace />;
  }

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
        localStorage.setItem("isAuthenticated", "true");
        navigate("/explore");
      } else {
        toast({
          title: "Error",
          description: "Invalid credentials. Use test account: john.doe@example.com / password123",
          variant: "destructive",
        });
      }
    } else {
      // Registration validation
      if (!username.trim()) {
        toast({
          title: "Error",
          description: "Username is required",
          variant: "destructive",
        });
        return;
      }
      if (password !== confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Registration",
        description: "Registration will be implemented soon!",
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Social Login",
      description: `${provider} login will be implemented soon!`,
    });
  };

  return (
    <div className="min-h-[calc(100vh-112px)] mt-16 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => handleSocialLogin('Google')}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => handleSocialLogin('Facebook')}
            >
              <FaFacebook className="mr-2 h-5 w-5 text-blue-600" />
              Continue with Facebook
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => handleSocialLogin('TikTok')}
            >
              <FaTiktok className="mr-2 h-5 w-5" />
              Continue with TikTok
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              )}
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
              {!isLogin && (
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              )}
              <Button type="submit" className="w-full">
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          </div>

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