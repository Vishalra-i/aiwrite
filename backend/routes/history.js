const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Output = require('../models/Output');

router.get('/', protect, async (req, res) => {
  try {
    const outputs = await Output.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(outputs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
