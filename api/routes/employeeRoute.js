import express from "express";
import { Employee } from "../module/employee.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newEmployee = new Employee({
      name: req.body.name,
      id: req.body.id,
      mobileNumber: req.body.mobileNumber,
      designation: req.body.designation,
      state: req.body.state,
      city: req.body.city,
      talukas: req.body.talukas,
      gender: req.body.gender,
      salary: req.body.salary,
      address: req.body.address,
      lastCompanyName: req.body.lastCompanyName,
      // skill: req.body.skill,
      skills: req.body.skills,
    });

    const savedEmployee = await newEmployee.save();
    res.status(200).json(savedEmployee);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const employee = await Employee.find({});
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) res.status(404).json({ msg: "Employee not found!" });
    res.status(200).json({ msg: "Employee is deleted!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.put("/:paramId", async (req, res) => {
//   try {
//     const updatedEmployee = await Employee.findByIdAndUpdate(
//       req.params.paramId,
//       { $set: req.body },
//       { new: true }
//     );
//     if (!updatedEmployee) res.status(404).json({ msg: "Employee not found!" });
//     res
//       .status(200)
//       .json({ msg: "Employee details Updated!", Employee: updatedEmployee });
//   } catch (error) {
//     console.log(error);
//   }
// });

router.put("/:paramId", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.paramId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ msg: "Employee not found!" });
    }
    res
      .status(200)
      .json({ msg: "Employee details Updated!", Employee: updatedEmployee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// router.put("/:paramId", async (req, res) => {
//   try {
//     const currentEmployee = await Employee.findById(req.params.paramId);
//     if (!currentEmployee) return res.status(404).send("Employee not found!");

//     const updatedData = {
//       ...currentEmployee._doc,
//       ...req.body,
//     };

//     const updatedEmployee = await Employee.findByIdAndDelete(
//       req.params.paramId,
//       updatedData,
//       { new: true }
//     );

//     res.status(200).json(updatedEmployee);
//   } catch (error) {
//     console.log(error);
//   }
// });

export default router;
