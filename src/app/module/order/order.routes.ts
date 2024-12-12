import { Router } from "express";
import { createOrderController, OrderControler } from "./order.controller";
import { OrderValidation } from "./order.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

// Route to create an order
router.post(
  "/create",
  validateRequest(OrderValidation.createOrderValidationSchema),
  createOrderController
);

// get all
router.get("/", OrderControler.getAllOrders);

// get all user
router.get("/:email", OrderControler.getAllOrdersByUser);

// update
router.put(
  "/:orderId",
  validateRequest(OrderValidation.updateOrderValidationSchema),
  OrderControler.updateOrder
);

// delete
router.delete("/:orderId", OrderControler.deleteOrder);

export const OrderRoutes = router;
