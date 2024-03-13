import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

categorySchema.index(
  {
    title: 1,
  },
  {
    background: true,
    unique: true,
  }
);
categorySchema.index(
  {
    url: 1,
  },
  {
    background: true,
    unique: true,
  }
);

categorySchema.index(
  {
    status: 1,
  },
  {
    background: true,
  }
);

export const CategoryModel = model("Category", categorySchema, "categories");
