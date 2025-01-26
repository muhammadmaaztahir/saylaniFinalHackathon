import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/applications', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status, message, appointmentDate })
      });

      if (response.ok) {
        toast({
          title: "Status Updated",
          description: "Application status has been updated successfully.",
        });
        fetchApplications();
        setMessage("");
        setAppointmentDate("");
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Loan Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CNIC</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app: any) => (
                <TableRow key={app._id}>
                  <TableCell>{app.cnic}</TableCell>
                  <TableCell>{app.name}</TableCell>
                  <TableCell>{app.loanAmount}</TableCell>
                  <TableCell>{app.purpose}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="mr-2">
                          Update Status
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Application Status</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <Label>Message</Label>
                            <Input
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Enter message for applicant"
                            />
                          </div>
                          <div>
                            <Label>Appointment Date</Label>
                            <Input
                              type="datetime-local"
                              value={appointmentDate}
                              onChange={(e) => setAppointmentDate(e.target.value)}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleStatusUpdate(app._id, 'approved')}
                              className="flex-1"
                            >
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleStatusUpdate(app._id, 'declined')}
                              variant="destructive"
                              className="flex-1"
                            >
                              Decline
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;