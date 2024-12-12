import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import Order from "./order.model";
import { TOrder } from "./order.interface";
import { Product } from "../product/product.model";
import { HttpStatusCode } from "axios";

const createOrder = async (payload: TOrder) => {
  // setup product logic
  const product = await Product.findById(payload.product);
  if (!product) {
    throw new AppError(HttpStatusCode.NotFound, "Product not found!");
  }

  // Check enough stock is available
  if (product.quantity < payload.quantity) {
    throw new AppError(
      HttpStatusCode.BadRequest,
      "Insufficient stock for the requested quantity!"
    );
  }

  // Check an existing Order
  const existingOrder = await Order.findOne({
    product: payload.product,
    email: payload.email,
  });

  // update existing order
  if (existingOrder) {
    // Calculate the difference in quantity
    const quantityDifference = payload.quantity - existingOrder.quantity;

    if (quantityDifference > 0) {
      // Additional quantity requested, check stock
      if (product.quantity < quantityDifference) {
        throw new AppError(
          HttpStatusCode.BadRequest,
          "Insufficient stock for the updated quantity!"
        );
      }

      // Deduct the extra quantity from stock
      product.quantity -= quantityDifference;
    } else if (quantityDifference < 0) {
      // Lesser quantity requested, restore stock
      product.quantity += Math.abs(quantityDifference);
    }

    // Update the product stock and inStock status
    product.inStock = product.quantity > 0;
    await product.save();

    // Update the existing order
    existingOrder.quantity = payload.quantity;
    existingOrder.totalPrice = payload.quantity * product.price;
    return await existingOrder.save();
  }

  // // Handle new order creation
  // if (product.quantity < payload.quantity) {
  //   throw new AppError(
  //     HttpStatusCode.BadRequest,
  //     "Insufficient stock for the requested quantity!"
  //   );
  // }

  // Deduct stock for the new order
  product.quantity -= payload.quantity;
  product.inStock = product.quantity > 0;
  await product.save();

  // Calculate the total price for the new order
  payload.totalPrice = payload.quantity * product.price;

  // Create and return the new order
  const newOrder = await Order.create(payload);
  return newOrder;
};

// get all
const getAllOrderFromDB = async (query: Record<string, unknown>) => {
  // queryBuilder
  const orderQuery = new QueryBuilder(Order.find().populate("product"), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await orderQuery.countTotal();
  const result = await orderQuery.modelQuery;

  // checking data
  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "No Order Available!");
  }

  return {
    meta,
    result,
  };
};

// get revenue
const getRevenueFromDB = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
  ]);

  const finalResult = result.length > 0 ? result[0].totalRevenue : 0;

  return {
    totalRevenue: finalResult,
  };
};

// get all by user
const getAllOrderByUserFromDB = async (email: string) => {
  // queryBuilder
  const result = await Order.find({ "user.email": email });

  // checking data
  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "No Order Available!");
  }

  return result;
};

// update
const updateOrderIntoDB = async (_id: string, payload: Partial<TOrder>) => {
  // Order checking

  const result = await Order.findByIdAndUpdate(_id, payload, {
    new: true,
  });

  console.log(result);

  return result;
};

const deleteOrderIntoDB = async (_id: string) => {
  // Order checking
  const OrderData = await Order.findById({ _id });
  if (!OrderData) {
    throw new AppError(StatusCodes.CONFLICT, "Order not exists!");
  }

  const result = await Order.findByIdAndDelete(_id, {
    new: true,
  });
  return result;
};

export const orderService = {
  createOrder,
  getRevenueFromDB,
  getAllOrderFromDB,
  updateOrderIntoDB,
  deleteOrderIntoDB,
  getAllOrderByUserFromDB,
};
