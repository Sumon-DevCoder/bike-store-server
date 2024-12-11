import { Router } from "express";
import { createOrderController, OrderControler } from "./order.controller";

const router = Router();

// Route to create an order
router.post("/create", createOrderController);

// get all
router.get("/", OrderControler.getAllOrders);

// get all user
router.get("/:email", OrderControler.getAllOrdersByUser);

// update
router.put("/:orderId", OrderControler.updateOrder);

// delete
router.delete("/:orderId", OrderControler.deleteOrder);

export const OrderRoutes = router;
