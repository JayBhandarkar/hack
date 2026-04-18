const mongoose = require('mongoose');

const sosSchema = new mongoose.Schema({
  citizen: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  citizenName: { type: String, required: true },
  message: { type: String, default: 'Emergency! I need immediate help.' },
  location: {
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String, default: 'Location not available' },
  },
  status: { type: String, enum: ['active', 'acknowledged', 'resolved'], default: 'active' },
  acknowledgedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SOS', sosSchema);
