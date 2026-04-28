const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { protect } = require('../middleware/authMiddleware');
const Payment = require('../models/Payment');
const User = require('../models/User');

router.post('/create-order', protect, async (req, res) => {
  try {
    const { plan } = req.body;
    let amount = 0;
    if (plan === 'starter') amount = 499 * 100; // in paise
    if (plan === 'pro') amount = 1299 * 100;

    if (amount === 0) return res.status(400).json({ message: 'Invalid plan' });

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({
      userId: req.user._id,
      razorpayOrderId: order.id,
      plan,
      amount: amount / 100,
    });

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

router.post('/verify', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { razorpayPaymentId: razorpay_payment_id, status: 'completed' }
      );

      const user = await User.findById(req.user._id);
      user.plan = plan;
      if (plan === 'starter') {
        user.wordsLimit = 30000;
        user.wordsUsed = 0;
      } else if (plan === 'pro') {
        user.wordsLimit = 999999999;
        user.wordsUsed = 0;
      }
      await user.save();

      res.json({ message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid signature' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying payment' });
  }
});

module.exports = router;
