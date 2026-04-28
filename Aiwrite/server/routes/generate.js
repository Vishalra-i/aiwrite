const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Output = require('../models/Output');
const User = require('../models/User');
const { getPrompt } = require('../prompts');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', protect, async (req, res) => {
  try {
    const { templateName, inputs, language, tone } = req.body;
    const user = req.user;

    if (user.plan === 'free' && user.wordsUsed >= user.wordsLimit) {
      return res.status(403).json({ message: 'Free credits exhausted. Please upgrade.' });
    }

    const prompt = getPrompt(templateName, inputs, language, tone);

    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

    const wordCount = generatedText.split(/\s+/).filter(word => word.length > 0).length;

    user.wordsUsed += wordCount;
    await user.save();

    const output = await Output.create({
      userId: user._id,
      templateName,
      inputs,
      generatedText,
      wordCount,
    });

    res.json(output);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating content' });
  }
});

module.exports = router;
