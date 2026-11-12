const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  head: { type: String, required: true },
  count: { type: Number, default: 0 },
  icon: { type: String, default: 'Briefcase' }, // Icon identifier
  color: { type: String, default: 'bg-indigo-50 text-indigo-600' }
});

module.exports = mongoose.model('Department', departmentSchema);