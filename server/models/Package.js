import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    packageName: {
      type: String,
      required: true,
    },

    description: String,

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Package", packageSchema);
