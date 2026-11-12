const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employees', required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  date: { type: String, required: true }, // Format: "YYYY-MM-DD"
  status: { type: String, enum: ['Present', 'Late', 'Absent'], default: 'Present' },
  time: { type: String, default: '09:00 AM' }
});

module.exports = mongoose.model('Attendance', attendanceSchema);