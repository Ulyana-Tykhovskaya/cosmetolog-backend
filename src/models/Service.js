import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    pl: {
      name: { type: String, required: true },
      description: { type: String },
    },
    de: {
      name: { type: String, required: true },
      description: { type: String },
    },

    price: { type: Number },

    type: {
      type: String,
      required: true,
      enum: ["medycyna", "depilacja_man", "depilacja_woman"],
    },

    imgs: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);
