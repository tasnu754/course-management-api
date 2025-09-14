import { Router } from "express";
import courseController from "../controllers/courseController.js";
import auth from "../middleware/auth.js";
import validation from "../middleware/validation.js";

const router = Router();

// Public routes
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);

// Protected routes (Admin only)
router.post(
  "/",
  auth.authenticate,
  auth.authorizeAdmin,
  validation.validateCourseCreation,
  courseController.createCourse
);

router.delete(
  "/:id",
  auth.authenticate,
  auth.authorizeAdmin,
  courseController.deleteCourse
);

export default router;
