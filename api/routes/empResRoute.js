import express from "express";
import { EmpRes } from "../module/empRes.js";

const router = express.Router();

router.post("/addRes", async (req, res) => {
  try {
    const newRes = new EmpRes({
      addState: req.body.addState,
      addCities: req.body.addCities,
      addTalukas: req.body.addTalukas,
    });

    const saveRes = await newRes.save();
    res.status(200).json(saveRes);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const getEmpRes = await EmpRes.find({});
    res.status(200).json(getEmpRes);
  } catch (error) {
    console.log(error);
  }
});

export default router;
