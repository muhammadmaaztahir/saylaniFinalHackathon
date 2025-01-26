import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white w-full">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About Saylani Welfare</h3>
            <p className="text-primary-light">
              Serving humanity for over 20 years through various welfare programs including healthcare,
              education, and financial assistance.
            </p>
          </div>
          
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-primary-light">Phone: 111-729-526</li>
              <li className="text-primary-light">Email: info@saylaniwelfare.com</li>
              <li className="text-primary-light break-words">
                Address: A-25, Bahadurabad Chowrangi, Karachi, Pakistan
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Newsletter</h3>
            <p className="text-primary-light">
              Subscribe to our newsletter for updates and announcements.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded bg-white/10 text-white placeholder:text-primary-light focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <Button variant="secondary" className="bg-white text-primary hover:bg-primary-light whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-primary-light">
          <p>© 2024 Saylani Welfare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};