const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employees', required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  baseSalary: { type: Number, required: true },
  bonus: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
  month: { type: String, default: 'November 2026' }
});

module.exports = mongoose.model('Payroll', payrollSchema);