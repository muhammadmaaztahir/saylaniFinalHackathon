import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll"; // Import ScrollLink

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-xl font-semibold text-primary">Saylani Microfinance</Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
        <ScrollLink
            to="categories"
            smooth={true}
            duration={500} // Duration of the scroll
            className=" text-primary p-2 rounded-lg cursor-pointer"
          >
            Loan Categories
          </ScrollLink>
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            Login
          </Button>
          <ScrollLink
            to="calculator"
            smooth={true}
            duration={500} // Duration of the scroll
            className="bg-primary text-white hover:bg-primary-light p-2 rounded-lg cursor-pointer"
          >
            Apply Now
          </ScrollLink>
        </nav>
      </div>
    </header>
  );
};
