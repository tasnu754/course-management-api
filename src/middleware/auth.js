import User from "../models/User.js";
import tokenUtils from "../utils/tokenUtils.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided or invalid format.",
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer' prefix

    const decoded = tokenUtils.verifyToken(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. User not found.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

// Admin role authorization
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
  next();
};

// Check if user owns the resource
const authorizeOwnerOrAdmin = (req, res, next) => {
  if (
    req.user.role === "admin" ||
    req.user._id.toString() === req.params.userId
  ) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access denied. You can only access your own resources.",
  });
};

export default {
  authenticate,
  authorizeAdmin,
  authorizeOwnerOrAdmin,
};
