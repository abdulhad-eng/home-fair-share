import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Home, DollarSign, Users } from "lucide-react";

interface CreateHouseholdProps {
  onBack: () => void;
  onContinue: (data: { name: string; currency: string; splitMethod: string }) => void;
}

export const CreateHousehold = ({ onBack, onContinue }: CreateHouseholdProps) => {
  const [formData, setFormData] = useState({
    name: "",
    currency: "",
    splitMethod: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.currency && formData.splitMethod) {
      onContinue(formData);
    }
  };

  const isValid = formData.name && formData.currency && formData.splitMethod;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Create Household</h1>
          </div>

          <Card className="border-0 shadow-primary animate-slide-up">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Set Up Your Home</CardTitle>
              <CardDescription>
                Create a household to start tracking expenses with your roommates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="household-name">Household Name</Label>
                  <Input
                    id="household-name"
                    placeholder="e.g., Maple Street House"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                    <SelectTrigger>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Select currency" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD ($)</SelectItem>
                      <SelectItem value="AUD">AUD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="split-method">Default Split Method</Label>
                  <Select value={formData.splitMethod} onValueChange={(value) => setFormData({ ...formData, splitMethod: value })}>
                    <SelectTrigger>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="How to split expenses" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equal">Equal Split</SelectItem>
                      <SelectItem value="percentage">Custom Percentage</SelectItem>
                      <SelectItem value="custom">Custom Amounts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={!isValid}
                >
                  Create Household
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};