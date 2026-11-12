const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const Employees = require('../models/Employees');

// Get All Departments with Live Employee Counts
router.get('/', async (req, res) => {
  try {
    let departments = await Department.find();

    // Agar database me departments nahi hain, toh default categories seed/insert kar do
    if (departments.length === 0) {
      const defaultDepts = [
        { name: 'Engineering', head: 'Ali Akram', icon: 'Briefcase', color: 'bg-indigo-50 text-indigo-600' },
        { name: 'Human Resources', head: 'Ayesha Malik', icon: 'Users', color: 'bg-emerald-50 text-emerald-600' },
        { name: 'Design', head: 'Bilal Khan', icon: 'Shield', color: 'bg-violet-50 text-violet-600' },
        { name: 'Marketing', head: 'Zainab Noor', icon: 'Building2', color: 'bg-amber-50 text-amber-600' }
      ];
      departments = await Department.insertMany(defaultDepts);
    }

    // Har department ke members ka live count database se nikal kar update karna
    const updatedDepartments = await Promise.all(departments.map(async (dept) => {
      const memberCount = await Employees.countDocuments({ department: dept.name });
      return {
        _id: dept._id,
        name: dept.name,
        head: dept.head,
        count: memberCount,
        icon: dept.icon,
        color: dept.color
      };
    }));

    res.json({ message: 'success', data: updatedDepartments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;