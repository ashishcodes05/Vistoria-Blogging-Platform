import fs from 'fs';
import imageKit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';
export const addBlog = async (req, res) => {
    try{
        const { title, subtitle, author, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file; // Assuming you're using multer for file uploads

        // Validate required fields
        if (!title || !subtitle || !author || !description || !category || !imageFile) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        // Upload the image to ImageKit
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        //Optimisation through ImageKit url transformation
        const optimisedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, // Automatically adjust quality
                {format: 'webp'}, // Convert to WebP format
                {width: '1280'} // Resize to 1280px width
            ]
        })

        const image = optimisedImageUrl;

        await Blog.create({
            title,
            subtitle,
            author,
            description,
            category,
            image,
            isPublished : isPublished || false
        });

        return res.status(201).json({ success: true, message: "Blog added successfully"});
    } catch (error) {
        console.error("Error adding blog:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true})
        return res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        return res.status(200).json({ success: true, blog });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        await Comment.deleteMany({ blog: id }); // Delete all comments associated with the blog
        return res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const togglePublishStatus = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {    
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        blog.isPublished = !blog.isPublished;
        await blog.save();
        return res.status(200).json({ success: true, message: "Blog publish status updated", blog });
    } catch (error) {
        console.error("Error toggling blog publish status:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        if (!blog || !name || !content) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const comment = await Comment.create({
            blog,
            name,
            content,
            isApproved: true // Automatically approve comments for simplicity
        });
        return res.status(201).json({ success: true, message: "Comment added successfully", comment });
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }   
}

export const getCommentsByBlogId = async (req, res) => {
    try {
        const { blog } = req.params;
        const comments = await Comment.find({ blog, isApproved: true }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const generateContent = async (req, res) => {
    try{
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }

        const rawContent = await main(prompt + " Generate a blog content for this topic in 200 words. Make it engaging and informative. Format it with proper paragraphs, use bold text for important points, and structure it well for a blog post. Also convert the plain text to HTML format with proper tags as I am using quill editor to display the content. (Don't write anything unnecessar as this whole text is going to be displayed on the screen. Also, Don't write here is the content etc.");

        return res.status(200).json({ success: true, content: rawContent });
    } catch (error) {
        console.error("Error generating content:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}