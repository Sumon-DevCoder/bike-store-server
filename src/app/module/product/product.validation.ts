import { z } from "zod";
import { TBikeCategory } from "./product.interface";

const BikeCategorySchema = z.enum(
  Object.values(TBikeCategory) as [string, ...string[]]
);

export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    brand: z.string().min(1, "Brand is required"),
    price: z.number().positive("Price must be a positive number"),
    category: BikeCategorySchema,
    description: z.string().min(1, "Description is required"),
    quantity: z
      .number()
      .int()
      .min(0, "Quantity must be a non-negative integer"),
    inStock: z.boolean().optional(),
  }),
});

export const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    brand: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    category: BikeCategorySchema.optional(),
    description: z.string().min(1).optional(),
    quantity: z.number().int().min(0).optional(),
    inStock: z.boolean().optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
