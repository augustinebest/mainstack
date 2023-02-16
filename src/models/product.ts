import { Schema, model } from "mongoose";
import { IProduct } from "../utils/product.interface";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, required: true },
    ratings: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Product = model<IProduct>("product", ProductSchema);
