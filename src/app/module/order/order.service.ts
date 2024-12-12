import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import Order from "./order.model";
import { TOrder } from "./order.interface";

const createOrder = async (payload: TOrder) => {
  payload.totalPrice = payload.quantity * payload.product?.price;

  const result = await Order.create(payload);
  return result;
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
  getAllOrderFromDB,
  updateOrderIntoDB,
  deleteOrderIntoDB,
  getAllOrderByUserFromDB,
};
