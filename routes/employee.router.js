const express = require('express');
const { empModel } = require('../models/employee.model');
const empRouter = express.Router();


empRouter.post('/addEmp', async (req, res) => {
  try {
    const {FirstName,LastName,Email,Department, Salary } = req.body;
    const newEmployee = new empModel({
      FirstName,
      LastName,
      Email,
      Department,
      Salary
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).send(savedEmployee);
  } catch (err) {
    res.status(400).send({ msg: 'Failed to add employee', err: err.message });
  }
});


empRouter.get('/', async (req, res) => {
  try {
    const employees = await empModel.find();

    res.status(200).send(employees);
  } catch (err) {
    res.status(500).send({ msg: 'Failed to retrieve employees', err: err.message });
  }
});




empRouter.put('/edit/:id', async (req, res) => {
  try {
    const { FirstName, LastName, Email, Department, Salary } = req.body;

    const updatedEmployee = await empModel.findByIdAndUpdate(
      req.params.id,
      { FirstName, LastName, Email, Department, Salary },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).send({ msg: 'Employee not found' });
    }

    res.status(200).send(updatedEmployee);
  } catch (err) {
    res.status(500).send({ msg: 'Failed to update employee', error: err.message });
  }
});





empRouter.delete('/delete/:id', async (req, res) => {
  try {
    const deletedEmployee = await empModel.findByIdAndDelete(req.params.id);

    if (!deletedEmployee) {
      return res.status(404).send({ msg: 'Employee not found' });
    }

    res.status(200).send({ msg: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).send({ msg: 'Failed to delete employee', err: err.message });
  }
});



module.exports = {empRouter};
