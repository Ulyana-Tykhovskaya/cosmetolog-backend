import mongoose from "mongoose";
const mediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 120,
    },
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Media =
  mongoose.models.Media || mongoose.model("Media", mediaSchema);
