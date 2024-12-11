import mongoose, { Schema, Document } from "mongoose";
import { TBikeCategory, TProduct } from "./product.interface";

const ProductSchema: Schema = new Schema<TProduct>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: Object.values(TBikeCategory),
    required: true,
  },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
});

export const Product = mongoose.model<TProduct>("Product", ProductSchema);
