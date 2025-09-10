import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, Receipt, TrendingUp, DollarSign } from "lucide-react";

interface HouseholdDashboardProps {
  onAddExpense: () => void;
  onInviteMembers: () => void;
}

export const HouseholdDashboard = ({ onAddExpense, onInviteMembers }: HouseholdDashboardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-2">Maple Street House</h1>
          <p className="text-primary-foreground/80">3 members • $247.50 total expenses</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={onAddExpense}
            size="lg"
            className="h-auto py-4 flex-col gap-2"
          >
            <Plus className="w-6 h-6" />
            Add Expense
          </Button>
          <Button 
            onClick={onInviteMembers}
            variant="secondary"
            size="lg"
            className="h-auto py-4 flex-col gap-2"
          >
            <Users className="w-6 h-6" />
            Invite Members
          </Button>
        </div>

        {/* Balance Summary */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-accent" />
              Your Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">+$47.50</p>
              <p className="text-sm text-muted-foreground">You're owed money</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Receipt className="w-5 h-5 mr-2 text-primary" />
                Recent Expenses
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <span className="text-sm">🛒</span>
                </div>
                <div>
                  <p className="font-medium">Groceries</p>
                  <p className="text-sm text-muted-foreground">Paid by Alex</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">$85.50</p>
                <p className="text-sm text-muted-foreground">You owe $28.50</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                  <span className="text-sm">⚡</span>
                </div>
                <div>
                  <p className="font-medium">Electricity Bill</p>
                  <p className="text-sm text-muted-foreground">Paid by You</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">$162.00</p>
                <p className="text-sm text-accent">You're owed $54.00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Household Members */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-secondary" />
              Household Members
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">A</span>
                </div>
                <div>
                  <p className="font-medium">Alex Chen</p>
                  <p className="text-sm text-muted-foreground">alex@email.com</p>
                </div>
              </div>
              <span className="text-sm text-accent font-medium">Owes $19.00</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">S</span>
                </div>
                <div>
                  <p className="font-medium">Sam Taylor</p>
                  <p className="text-sm text-muted-foreground">sam@email.com</p>
                </div>
              </div>
              <span className="text-sm text-warning font-medium">Owed $28.50</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">Y</span>
                </div>
                <div>
                  <p className="font-medium">You</p>
                  <p className="text-sm text-muted-foreground">your@email.com</p>
                </div>
              </div>
              <span className="text-sm text-accent font-medium">Owed $47.50</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};