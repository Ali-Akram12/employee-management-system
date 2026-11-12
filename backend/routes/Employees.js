const express = require('express');
const router = express.Router();
// Sahi path: ek folder baahar jaakar models folder se Employee import karna hai
const Employee = require('../models/Employees');

// Get All Employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ message: 'success', data: employees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Employee
router.post('/', async (req, res) => {
  const { name, email, role, department, status } = req.body;
  try {
    const newEmployee = new Employee({ name, email, role, department, status });
    await newEmployee.save();
    res.json({ message: 'success', data: newEmployee });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Employee (Edit)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role, department, status } = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, role, department, status },
      { new: true }
    );
    res.json({ message: 'success', data: updatedEmployee });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'deleted', id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;