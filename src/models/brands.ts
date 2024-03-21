import { Schema, model } from "mongoose";

const brandsSchema = new Schema(
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

brandsSchema.index(
  {
    title: 1,
  },
  {
    background: true,
    unique: true,
  }
);
brandsSchema.index(
  {
    url: 1,
  },
  {
    background: true,
    unique: true,
  }
);

brandsSchema.index(
  {
    status: 1,
  },
  {
    background: true,
  }
);

export const BrandsModel = model("Brand", brandsSchema, "brands");
