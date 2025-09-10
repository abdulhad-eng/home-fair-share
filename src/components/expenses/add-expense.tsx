import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Receipt, DollarSign, Users } from "lucide-react";

interface AddExpenseProps {
  onBack: () => void;
  onSave: (expense: {
    description: string;
    amount: number;
    payer: string;
    category: string;
    splitMethod: string;
  }) => void;
}

export const AddExpense = ({ onBack, onSave }: AddExpenseProps) => {
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    payer: "",
    category: "",
    splitMethod: "equal",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (expense.description && expense.amount && expense.payer && expense.category) {
      onSave({
        ...expense,
        amount: parseFloat(expense.amount),
      });
    }
  };

  const isValid = expense.description && expense.amount && expense.payer && expense.category;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Add Expense</h1>
          </div>

          <Card className="border-0 shadow-primary animate-slide-up">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-8 h-8 text-white" />
              </div>
              <CardTitle>New Expense</CardTitle>
              <CardDescription>
                Add a shared expense to split with your roommates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What was this expense for?"
                    value={expense.description}
                    onChange={(e) => setExpense({ ...expense, description: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={expense.amount}
                      onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payer">Who Paid?</Label>
                  <Select value={expense.payer} onValueChange={(value) => setExpense({ ...expense, payer: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select who paid" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alex">Alex</SelectItem>
                      <SelectItem value="sam">Sam</SelectItem>
                      <SelectItem value="jordan">Jordan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={expense.category} onValueChange={(value) => setExpense({ ...expense, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Expense category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="groceries">🛒 Groceries</SelectItem>
                      <SelectItem value="utilities">⚡ Utilities</SelectItem>
                      <SelectItem value="rent">🏠 Rent</SelectItem>
                      <SelectItem value="household">🧽 Household Items</SelectItem>
                      <SelectItem value="entertainment">🎬 Entertainment</SelectItem>
                      <SelectItem value="other">📦 Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="split-method">Split Method</Label>
                  <Select value={expense.splitMethod} onValueChange={(value) => setExpense({ ...expense, splitMethod: value })}>
                    <SelectTrigger>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equal">Equal Split</SelectItem>
                      <SelectItem value="percentage">By Percentage</SelectItem>
                      <SelectItem value="custom">Custom Amounts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={!isValid}
                >
                  Add Expense
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};