import { Router } from "express";
import { OrderValidation } from "./order.validation";
import validateRequest from "../../middlewares/validateRequest";
import { OrderController } from "./order.controller";

const router = Router();

// Route to create an order
router.post(
  "/",
  validateRequest(OrderValidation.createOrderValidationSchema),
  OrderController.createOrder
);

// get all
router.get("/", OrderController.getAllOrders);

// get all user
router.get("/:email", OrderController.getAllOrdersByUser);

// update
router.put(
  "/:orderId",
  validateRequest(OrderValidation.updateOrderValidationSchema),
  OrderController.updateOrder
);

// delete
router.delete("/:orderId", OrderController.deleteOrder);

export const OrderRoutes = router;
