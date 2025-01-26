import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LoanCategories } from "@/components/LoanCategories";
import { LoanCalculator } from "@/components/LoanCalculator";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <LoanCategories />
      <LoanCalculator />
      <Footer />
    </div>
  );
};

export default Index;