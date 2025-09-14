import Course from "../models/Course.js";

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ isActive: true })
      .populate("createdBy", "name email") // fetch the user data whoever created this particular course
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        courses,
        count: courses.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!course || !course.isActive) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      data: { course },
    });
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { title, description, price, instructor } = req.body;

    const course = await Course.create({
      title,
      description,
      price,
      instructor,
      createdBy: req.user._id,
    });

    await course.populate("createdBy", "name email");
    console.log("Course succcesss added");

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: { course },
    });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    course.isActive = false; // Mark as inactive, not permanent delete
    await course.save();

    res.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourse,
};
