import { useTheme } from "next-themes";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Moon, Sun, Globe } from "lucide-react";
import { useToast } from "./ui/use-toast";

const Settings = () => {
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = useState("en");
  const { toast } = useToast();

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast({
      title: "Language updated",
      description: "Your language preference has been saved.",
    });
  };

  return (
    <div className="min-h-[calc(100vh-112px)] mt-16 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Theme</Label>
              <RadioGroup
                defaultValue={theme}
                onValueChange={setTheme}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="light"
                    id="light"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Sun className="mb-3 h-6 w-6" />
                    Light
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="dark"
                    id="dark"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Moon className="mb-3 h-6 w-6" />
                    Dark
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Language</Label>
              <RadioGroup
                defaultValue={language}
                onValueChange={handleLanguageChange}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="en"
                    id="english"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="english"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Globe className="mb-3 h-6 w-6" />
                    English
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="pl"
                    id="polish"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="polish"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Globe className="mb-3 h-6 w-6" />
                    Polski
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;