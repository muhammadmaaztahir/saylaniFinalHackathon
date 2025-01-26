import express from "express";
const router = express.Router();
import Appointment from "../models/Appointment.js";

router.post("/", async (req, res) => {
  const { name, date, time, location } = req.body;

  if (!name || !date || !time || !location) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const newAppointment = new Appointment({
      name,
      date,
      time,
      location,
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json({
      message: "Appointment created successfully!",
      appointment: savedAppointment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create appointment." });
  }
});

export default Appointment
