import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // Check if the email and password match the admin credentials
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // If credentials are valid, generate a JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return res.json({ success: true, token });
  } catch (error) {
    console.error("Error during admin login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({})
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate('blog').sort({ createdAt: -1 });
    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });
    const dashboardData = {
      recentBlogs,
      blogs,
      comments,
      drafts
    };
    return res.status(200).json({ success: true, dashboardData });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }
    return res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    const comment = await Comment.findByIdAndUpdate(id, { isApproved: true });
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }
    return res.status(200).json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    console.error("Error approving comment:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}