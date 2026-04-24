const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  plan: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'created' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
