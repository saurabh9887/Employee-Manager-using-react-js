import mongoose from "mongoose";

const EmpResSchema = mongoose.Schema(
  {
    addState: {
      type: String,
      required: true,
    },
    addCities: {
      type: [String],
      required: true,
    },
    addTalukas: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const EmpRes = mongoose.model("Residence", EmpResSchema);
