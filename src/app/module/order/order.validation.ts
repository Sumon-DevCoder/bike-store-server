import { z } from "zod";

// Zod validation schema for TOrder
const OrderValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format").min(1, "Email is required"), // Ensures the email is valid and not empty
    product: z.string().min(1, "Product ID is required"), // Assuming ObjectId is represented as a string
    quantity: z
      .number()
      .int("Quantity must be an integer")
      .min(1, "Quantity must be at least 1"), // Quantity should be at least 1
    totalPrice: z.number().min(0, "Total price cannot be negative"), // Total price should be non-negative
  }),
});

// Schema for creating an order (same as the base schema)
export const createOrderValidationSchema = OrderValidationSchema;

// Schema for updating an order (allows partial updates)
export const updateOrderValidationSchema = OrderValidationSchema.partial();

export const OrderValidation = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};
