import { model, Schema } from "mongoose";

export const Project = model(
  "Project",
  new Schema({
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    technologies: [
      {
        type: String,
      },
    ],
    url_image: {
      type: String,
    },
    url_github: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  })
);
