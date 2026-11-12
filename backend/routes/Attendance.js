const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Employees = require('../models/Employees');

// 1. Get Attendance by Date
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    let records = await Attendance.find({ date });

    // Agar us date ka koi record pehle se nahi hai, toh saare active employees ke liye default 'Present' records bana do
    if (records.length === 0 && date) {
      const allEmployees = await Employees.find();
      const defaultRecords = allEmployees.map(emp => ({
        employeeId: emp._id,
        name: emp.name,
        role: emp.role,
        date: date,
        status: 'Present',
        time: '09:00 AM'
      }));

      if (defaultRecords.length > 0) {
        records = await Attendance.insertMany(defaultRecords);
      }
    }

    res.json({ message: 'success', data: records });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Update / Toggle Attendance Status
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, time } = req.body;
  try {
    const updatedRecord = await Attendance.findByIdAndUpdate(
      id,
      { status, time },
      { new: true }
    );
    res.json({ message: 'success', data: updatedRecord });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;