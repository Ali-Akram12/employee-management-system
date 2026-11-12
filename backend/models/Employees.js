const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  status: { type: String, default: 'Active' }
});

// Yeh line MongoDB me "employees" collection (table) bana degi
module.exports = mongoose.model('Employees', employeeSchema);