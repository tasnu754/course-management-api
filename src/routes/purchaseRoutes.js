import { Router } from "express";
import purchaseController from "../controllers/purchaseController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get(
  "/my-purchases",
  auth.authenticate,
  purchaseController.getUserPurchases
);

router.post("/", auth.authenticate, purchaseController.purchaseCourse);

export default router;
