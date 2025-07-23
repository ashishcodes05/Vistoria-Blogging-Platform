import express from "express";
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getCommentsByBlogId, togglePublishStatus } from "../controllers/blogController.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";

const blogRouter = express.Router();

blogRouter.get("/all", getAllBlogs);
blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublishStatus);

blogRouter.post("/add-comment", addComment);
blogRouter.get("/:blog/comments", getCommentsByBlogId);

blogRouter.post("/generate-content", auth, generateContent)

export default blogRouter;