import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductControllers } from "./product.controller";
import { ProductValidaitonSchema } from "./product.validation";

const router = Router();

// create
router.post(
  "/",
  validateRequest(ProductValidaitonSchema.createProductValidationSchema),
  ProductControllers.createProduct
);

// get all
router.get("/", ProductControllers.getAllProducts);

// get single
router.get("/:productId", ProductControllers.getSingleProducts);

// update
router.put(
  "/:id",
  validateRequest(ProductValidaitonSchema.updateProductValidationSchema),
  ProductControllers.updateProduct
);

// delete
router.delete("/:productId", ProductControllers.deleteProduct);

export const ProductRoutes = router;
