import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const CheckStatus = () => {
  const { toast } = useToast();
  const [cnic, setCnic] = useState("");
  const [applicationStatus, setApplicationStatus] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://saylani-final-hackathon-backend.vercel.app/api/loan/status/${cnic}`);
      const data = await response.json();
      
      if (response.ok) {
        setApplicationStatus(data);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message || "Failed to fetch application status.",
        });
      }
    } catch (error) {
      console.error('Error checking status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check Loan Status</CardTitle>
          <CardDescription>Enter your CNIC to check your loan application status</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cnic">CNIC</Label>
              <Input 
                id="cnic" 
                type="text" 
                placeholder="Enter your CNIC number"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                required 
              />
            </div>
            <Button type="submit" className="w-full">Check Status</Button>
          </form>

          {applicationStatus && (
            <div className="mt-6 p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Application Details</h3>
              <p>Status: <span className="font-medium">{applicationStatus.status}</span></p>
              <p>Loan Amount: <span className="font-medium">{applicationStatus.loanAmount}</span></p>
              <p>Purpose: <span className="font-medium">{applicationStatus.purpose}</span></p>
              {applicationStatus.adminMessage && (
                <p>Message: <span className="font-medium">{applicationStatus.adminMessage}</span></p>
              )}
              {applicationStatus.appointmentDate && (
                <p>Appointment: <span className="font-medium">
                  {new Date(applicationStatus.appointmentDate).toLocaleString()}
                </span></p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckStatus;