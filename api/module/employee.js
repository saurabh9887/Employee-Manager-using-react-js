import mongoose from "mongoose";

const EmployeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    talukas: {
      type: [String],
      require: true,
    },
    salary: {
      type: Number,
    },
    lastCompanyName: {
      type: String,
    },
    skills: {
      // type: String,
      type: [String],
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model("Employee", EmployeeSchema);
