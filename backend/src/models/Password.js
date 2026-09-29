import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    website: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: "Other"
    },
    notes: {
      type: String,
      default: ""
    },
    strength: {
      type: String,
      default: "Medium"
    }
  },
  {
    timestamps: true
  }
);

const Password = mongoose.model("Password", passwordSchema);

export default Password;