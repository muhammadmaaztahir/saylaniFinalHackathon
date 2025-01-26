import mongoose from 'mongoose';

const loanApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'declined'],
    default: 'pending'
  },
  adminResponse: {
    type: String,
    required: false,
    default: null
  },
  appointmentDate: {
    type: Date,
    required: false,
    default: null
  }
},
{timestamps: true}
);

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);

export default LoanApplication;