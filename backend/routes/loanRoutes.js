import express from 'express';
import LoanApplication from '../models/LoanApplication.js';
import auth from '../middleware/auth.js';
import { generateStrongPassword } from '../utils/index.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {

  try {
    console.log(req.body)
    const { cnic, email, name, amount, category, subCategory } = req.body;

    const userPayload = {
      name,
      email, 
      cnic,
      password: generateStrongPassword()
    }

    const user = await User.create(userPayload)
    await LoanApplication.create({
      userId: user._id,
      amount,
      category, 
      subCategory
    })
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Error submitting application' });
  }
});

router.get('/status/:cnic', async (req, res) => {
  try {
    const application = await LoanApplication.findOne({ cnic: req.params.cnic });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error('Error checking status:', error);
    res.status(500).json({ message: 'Error checking application status' });
  }
});

router.get('/admin/applications', auth, async (req, res) => {
  try {
    const applications = await LoanApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

router.put('/admin/applications/:id', auth, async (req, res) => {
  try {
    const { status, message, appointmentDate } = req.body;
    const application = await LoanApplication.findByIdAndUpdate(
      req.params.id,
      { 
        status, 
        adminMessage: message,
        appointmentDate: appointmentDate ? new Date(appointmentDate) : undefined
      },
      { new: true }
    );
    res.json(application);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ message: 'Error updating application' });
  }
});

export default router;