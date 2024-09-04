import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import employeeRoute from "./routes/employeeRoute.js";
import empResRoute from "./routes/empResRoute.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

//app.use("api/emp", employeeRoute);
app.use("/api/emp", employeeRoute);
app.use("/api/empRes", empResRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => console.log(err));

app.listen(5003, () => console.log("connected to db"));
