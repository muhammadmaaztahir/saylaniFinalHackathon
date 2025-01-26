import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const categories = {
  wedding: {
    name: "Wedding Loans",
    maxAmount: 500000,
    maxPeriod: 3,
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
  },
  home: {
    name: "Home Construction",
    maxAmount: 1000000,
    maxPeriod: 5,
    subcategories: ["Structure", "Finishing", "Loan"],
  },
  business: {
    name: "Business Startup",
    maxAmount: 1000000,
    maxPeriod: 5,
    subcategories: ["Buy Stall", "Advance Rent", "Shop Assets", "Machinery"],
  },
  education: {
    name: "Education",
    maxAmount: 1000000,
    maxPeriod: 4,
    subcategories: ["University Fees", "Child Fees Loan"],
  },
};

export const LoanCalculator = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [isProceed, setIsProceed] = useState(false);

  const navigate = useNavigate(); // Initialize navigation hook

  const calculateLoan = () => {
    const loanAmount = parseFloat(amount) - parseFloat(initialDeposit);
    const loanPeriod = parseFloat(period);

    if (loanAmount && loanPeriod) {
      const monthly = loanAmount / (loanPeriod * 12);
      setMonthlyPayment(monthly);
      setIsProceed(true); // Enable the "Proceed" button
    }
  };

  const handleProceed = () => {
    navigate("/apply", {
      state: {
        amount,
        category,
        subCategory: subcategory
      },
    }); // Redirect to the apply page
  };

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
          Apply for Loan
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Calculate your monthly payments based on your loan requirements.
          Our interest-free loans make it easy to plan your financial future.
        </p>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Calculate Your Loan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Loan Category</Label>
                <Select value={category} onValueChange={setCategory} className="relative z-10">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="z-20">
                    {Object.entries(categories).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select
                  value={subcategory}
                  onValueChange={setSubcategory}
                  disabled={!category}
                  className="relative z-10"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent className="z-20">
                    {category &&
                      categories[category as keyof typeof categories].subcategories.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="amount">Loan Amount (PKR)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="initialDeposit">Initial Deposit (PKR)</Label>
                <Input
                  id="initialDeposit"
                  type="number"
                  placeholder="Enter initial deposit"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(e.target.value)}
                />
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="period">Loan Period (Years)</Label>
                <Input
                  id="period"
                  type="number"
                  placeholder="Enter period"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                />
              </div>
            </div>

            {isProceed ? (
              <Button onClick={handleProceed} className="w-full bg-primary hover:bg-primary-light">
                Proceed
              </Button>
            ) : (
              <Button
                onClick={calculateLoan}
                className="w-full bg-primary hover:bg-primary-light"
                disabled={!category || !subcategory || !amount || !period || !initialDeposit}
              >
                Calculate
              </Button>
            )}

            {monthlyPayment !== null && (
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-2">Monthly Payment</h3>
                <p className="text-2xl font-bold">
                  PKR {monthlyPayment.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Total amount to be repaid: PKR {(monthlyPayment * parseFloat(period) * 12).toFixed(2)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
