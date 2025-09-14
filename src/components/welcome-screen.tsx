import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, DollarSign, CheckSquare, Zap } from "lucide-react";

export const WelcomeScreen = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const handleGetStartedClick = () => {
    console.log("Get Started button clicked!");
    onGetStarted();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mb-8 shadow-primary animate-fade-in">
          <Users className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-4 animate-fade-in">
          RoomieSplit
        </h1>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-md animate-slide-up">
          Make shared living feel fair, calm, and effortless. Track expenses, rotate chores, and stay in sync.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
          <Card className="p-6 text-center border-0 shadow-soft animate-slide-up">
            <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Split Expenses</h3>
            <p className="text-sm text-muted-foreground">Automatically split bills and track who owes what</p>
          </Card>

          <Card className="p-6 text-center border-0 shadow-soft animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Fair Chores</h3>
            <p className="text-sm text-muted-foreground">Rotate household tasks and stay organized</p>
          </Card>

          <Card className="p-6 text-center border-0 shadow-soft animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Smart Nudges</h3>
            <p className="text-sm text-muted-foreground">Gentle reminders at just the right time</p>
          </Card>
        </div>

        <Button 
          onClick={handleGetStartedClick}
          size="lg"
          className="w-full max-w-sm animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          Get Started
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-sm text-muted-foreground">
        Less arguing, more enjoying home together
      </div>
    </div>
  );
};