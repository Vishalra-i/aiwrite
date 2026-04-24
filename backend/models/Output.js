const mongoose = require('mongoose');

const OutputSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  templateName: { type: String, required: true },
  inputs: { type: Object, required: true },
  generatedText: { type: String, required: true },
  wordCount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Output', OutputSchema);
