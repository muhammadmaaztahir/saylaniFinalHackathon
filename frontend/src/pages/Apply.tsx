import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { jsPDF } from "jspdf";

const Apply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, category, subCategory } = location.state || {};

  const [formData, setFormData] = useState({
    cnic: "",
    email: "",
    name: "",
    amount: amount || "",
    category: category || "",
    subCategory: subCategory || "",
  });

  const [receiptData, setReceiptData] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://saylani-final-hackathon-backend.vercel.app/api/loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const { uid, appointmentDetails } = data;


        setReceiptData({
          token: uid,
          name: formData.name,
          amount: formData.amount,
          category: formData.category,
          subCategory: formData.subCategory,
          ...appointmentDetails,
        });

        // Send appointment details to the backend
        await fetch("https://saylani-final-hackathon-backend.vercel.app/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid,
            name: formData.name,
            appointmentDetails,
          }),
        });

        toast.success("Your loan application was successful!");
      } else {
        toast.error("Failed to submit application. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleDownloadSlip = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Loan Application Receipt", 20, 20);
    doc.setFontSize(12);
    doc.text(`Token Number: ${receiptData.token}`, 20, 40);
    doc.text(`Name: ${receiptData.name}`, 20, 50);
    doc.text(`Loan Amount: PKR ${receiptData.amount}`, 20, 60);
    doc.text(`Category: ${receiptData.category}`, 20, 70);
    doc.text(`Subcategory: ${receiptData.subCategory}`, 20, 80);
    doc.text(`Appointment Details:`, 20, 100);
    doc.text(`- Date: ${receiptData.date}`, 30, 110);
    doc.text(`- Time: ${receiptData.time}`, 30, 120);
    doc.text(`- Location: ${receiptData.location}`, 30, 130);

    // Add QR Code
    const qrCode = document.getElementById("mountNode");
    doc.save("receipt.pdf");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {!receiptData ? (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Apply for Loan</CardTitle>
            <CardDescription>Provide your information to proceed</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="Enter your full name" onChange={handleChange} required />

              <Label htmlFor="cnic">CNIC</Label>
              <Input id="cnic" type="text" placeholder="Enter your CNIC" onChange={handleChange} required />

              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" onChange={handleChange} required />

              <p><strong>Loan Amount:</strong> PKR {formData.amount}</p>
              <p><strong>Category:</strong> {formData.category}</p>
              <p><strong>Subcategory:</strong> {formData.subCategory}</p>

              <Button type="submit" className="w-full">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Receipt</CardTitle>
            <CardDescription>Here are your application details</CardDescription>
          </CardHeader>
          <CardContent>
            <p><strong>Token Number:</strong> {receiptData.token}</p>
            <p><strong>Name:</strong> {receiptData.name}</p>
            <p><strong>Loan Amount:</strong> PKR {receiptData.amount}</p>
            <p><strong>Category:</strong> {receiptData.category}</p>
            <p><strong>Subcategory:</strong> {receiptData.subCategory}</p>
            <p><strong>Appointment Details:</strong></p>
            <ul>
              <li>Date: {receiptData.date}</li>
              <li>Time: {receiptData.time}</li>
              <li>Location: {receiptData.location}</li>
            </ul>
            <div id="qrCode" className="my-4">
              <QRCodeSVG value={`Token: ${receiptData.token}`} size={150} />
            </div>
            <Button onClick={handleDownloadSlip} className="w-full">
              Download Slip
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Apply;
