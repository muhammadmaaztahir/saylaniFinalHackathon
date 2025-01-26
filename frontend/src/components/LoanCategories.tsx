import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const categories = [
  {
    title: "Wedding Loans",
    description: "Support for wedding expenses including Valima, Furniture, and Jahez",
    maxAmount: "5 Lakh",
    period: "3 years",
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    icon: "💒",
  },
  {
    title: "Home Construction",
    description: "Assistance for home construction and improvement",
    maxAmount: "10 Lakh",
    period: "5 years",
    subcategories: ["Structure", "Finishing", "Loan"],
    icon: "🏠",
  },
  {
    title: "Business Startup",
    description: "Support for establishing and growing your business",
    maxAmount: "10 Lakh",
    period: "5 years",
    subcategories: ["Buy Stall", "Advance Rent", "Shop Assets", "Machinery"],
    icon: "💼",
  },
  {
    title: "Education",
    description: "Financial support for educational pursuits",
    maxAmount: "Based on requirement",
    period: "4 years",
    subcategories: ["University Fees", "Child Fees Loan"],
    icon: "🎓",
  },
];

export const LoanCategories = () => {
  return (
    <section id="categories" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
          Loan Categories
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore our various loan categories designed to support different aspects of your life.
          Each category comes with flexible terms and maximum limits.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.title} className="hover:shadow-lg transition-shadow relative">
              <CardHeader>
                <div className="text-4xl mb-4">{category.icon}</div>
                <CardTitle className="text-xl text-primary">{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Maximum Amount</p>
                    <p className="text-lg font-semibold">PKR {category.maxAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Loan Period</p>
                    <p className="text-lg font-semibold">{category.period}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Subcategories</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">
                          View Subcategories <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full min-w-[200px] bg-white" align="start">
                        {category.subcategories.map((sub) => (
                          <DropdownMenuItem key={sub} className="cursor-pointer">
                            {sub}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};