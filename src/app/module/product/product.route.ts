import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductControllers } from "./product.controller";
import { ProductValidation } from "./product.validation";

const router = Router();

// create
router.post(
  "/",
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductControllers.createProduct
);

// get all
router.get("/", ProductControllers.getAllProducts);

// get single
router.get("/:id", ProductControllers.getSingleProducts);

// update
router.put(
  "/:id",
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductControllers.updateProduct
);

// delete
router.delete("/:id", ProductControllers.deleteProduct);

export const ProductRoutes = router;
