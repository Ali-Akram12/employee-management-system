const express = require('express');
const router = express.Router();
const Payroll = require('../models/Payroll');

// 1. Get All Payroll Records
router.get('/', async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate('employeeId');
    res.json({ message: 'success', data: payrolls });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Add New Payroll Record (Linked to Real Employee)
router.post('/', async (req, res) => {
  try {
    const { employeeId, name, role, baseSalary, bonus, deductions, status } = req.body;
    
    const newPayroll = new Payroll({
      employeeId,
      name,
      role,
      baseSalary: Number(baseSalary),
      bonus: Number(bonus || 0),
      deductions: Number(Number(deductions || 0))
    });

    await newPayroll.save();
    res.json({ message: 'success', data: newPayroll });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. Toggle Payment Status
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedPayroll = await Payroll.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json({ message: 'success', data: updatedPayroll });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;