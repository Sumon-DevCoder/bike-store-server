import { ObjectId } from "mongoose";

export type TOrder = {
  email: string; // The email address of the customer
  product: ObjectId; // The bike ordered (product ID from the database)
  quantity: number; // The quantity of the ordered bike
  totalPrice: number; // The total price (product price * quantity)
};
