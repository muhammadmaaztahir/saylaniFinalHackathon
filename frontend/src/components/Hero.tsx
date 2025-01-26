import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import bannerImg from '../../public/banner-img.jpg'

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-background to-primary/5 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Interest-Free Loans for a Better Future
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Saylani Welfare's Qarze Hasana program provides interest-free loans to help you achieve
              your dreams. Whether it's education, business, or personal needs - we're here to help.
            </p>
            <div className="flex space-x-4">
              <Button
                onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6"
              >
                Apply for Loan
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={bannerImg}
              alt="Saylani Microfinance"
              className="max-w-md w-full animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  );
};