const express = require('express');
const router  = express.Router();
const SOS     = require('../models/SOS');
const { protect, authorize } = require('../middleware/auth');

// Citizen triggers SOS
router.post('/trigger', protect, authorize('citizen'), async (req, res) => {
  try {
    const { message, lat, lng, address } = req.body;

    const sos = await SOS.create({
      citizen:     req.user._id,
      citizenName: req.user.name,
      message:     message || 'Emergency! I need immediate help.',
      location:    { lat, lng, address: address || 'Location not available' },
    });

    // Emit real-time alert via Socket.io (attached to app)
    const io = req.app.get('io');
    if (io) {
      io.to('admin').emit('sos:new', sos);
      io.to('maintenance_staff').emit('sos:new', sos);
    }

    res.status(201).json({ sos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all active SOS alerts (admin + maintenance)
router.get('/', protect, authorize('admin', 'maintenance_staff'), async (req, res) => {
  try {
    const alerts = await SOS.find().sort({ createdAt: -1 }).limit(50);
    res.json({ alerts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Acknowledge SOS
router.patch('/:id/acknowledge', protect, authorize('admin', 'maintenance_staff'), async (req, res) => {
  try {
    const sos = await SOS.findByIdAndUpdate(
      req.params.id,
      { status: 'acknowledged', acknowledgedBy: req.user._id, updatedAt: new Date() },
      { new: true }
    );
    const io = req.app.get('io');
    if (io) io.emit('sos:updated', sos);
    res.json({ sos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Resolve SOS
router.patch('/:id/resolve', protect, authorize('admin', 'maintenance_staff'), async (req, res) => {
  try {
    const sos = await SOS.findByIdAndUpdate(
      req.params.id,
      { status: 'resolved', resolvedBy: req.user._id, updatedAt: new Date() },
      { new: true }
    );
    const io = req.app.get('io');
    if (io) io.emit('sos:updated', sos);
    res.json({ sos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
