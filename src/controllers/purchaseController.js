import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";

const purchaseCourse = async (req, res) => {
  try {
    console.log(req);
    const { courseId } = req.body;
    const userId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course || !course.isActive) {
      return res.status(404).json({
        success: false,
        message: "Course not available",
      });
    }

    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({
        success: false,
        message: "Course already purchased",
      });
    }

    const purchase = new Purchase({
      userId,
      courseId,
      amount: course.price,
      paymentStatus: "completed",
    });

    await purchase.save();

    res.status(201).json({
      success: true,
      message: "Course purchased successfully",
      data: purchase,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserPurchases = async (req, res) => {
  try {
    const userId = req.user._id;

    const purchases = await Purchase.find({ userId })
      .populate("courseId", "title description instructor price")
      .sort({ purchaseDate: -1 });

    res.json({
      success: true,
      data: purchases,
      count: purchases.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { purchaseCourse, getUserPurchases };
