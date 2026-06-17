import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      enum: ["user", "admin", "washer"],
      default: "user",
    },
    googleId: String,

    photo: String,

    provider: {
      type: String,
      default: "local",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
