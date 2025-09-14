import { Router } from "express";
import authController from "../controllers/authController.js";
import validation from "../middleware/validation.js";
import auth from "../middleware/auth.js";

const router = Router();

// Public routes
router.post(
  "/register",
  validation.validateUserRegistration,
  authController.register
);
router.post("/login", validation.validateUserLogin, authController.login);
// router.post("/refresh-token", authController.refreshToken);

// Protected routes
router.post("/logout", auth.authenticate, authController.logout);

export default router;
