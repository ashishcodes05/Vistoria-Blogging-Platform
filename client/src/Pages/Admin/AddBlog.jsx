import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { axios, token } = useAppContext();

  const [blog, setBlog] = useState({
    title: "",
    subtitle: "",
    author: "",
    description: "",
    category: "",
    image: null,
    isPublished: false,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlog((prevState) => ({ ...prevState, image: file }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
    
    try {
      // Get the description from Quill editor
      const description = quillRef.current.root.innerHTML;
      
      console.log("Description content:", description); // Debug log
      
      // Validate that description is not empty
      if (!description || description.trim() === '<p><br></p>' || description.trim() === '') {
        toast.error("Please add some content to the blog description.");
        setIsPublishing(false);
        return;
      }

      // Create blog object with description
      const blogData = {
        ...blog,
        description: description,
        isPublished: true
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blogData));
      formData.append("image", blog.image);
      
      const {data} = await axios.post("/api/blog/add", formData);
      
      if(data.success) {
        toast.success("Blog published successfully!");
        setBlog({
          title: "",
          subtitle: "",
          author: "",
          description: "",
          category: "",
          image: null,
          isPublished: false,
        });
        quillRef.current.setText(""); // Clear the editor content
      } else {
        toast.error(data.message || "Failed to publish blog.");
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
      toast.error("An error occurred while publishing the blog.");
    } finally {
      setIsPublishing(false);
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog description here...",
      });
    }
  }, []);

  const generateContent = async () => {
    if (!blog.title.trim()) {
      toast.error("Please enter a blog title first to generate content.");
      return;
    }

    if (!token) {
      toast.error("Authentication required. Please login again.");
      return;
    }

    setIsGenerating(true);
    try {
      const { data } = await axios.post("/api/blog/generate-content", 
        { prompt: blog.title }
      );
      
      if (data.success) {
        // Set the generated content in the Quill editor
        // Clear any existing content first
        quillRef.current.root.innerHTML = '';
        // Set the new content
        quillRef.current.root.innerHTML = data.content;
        toast.success("Content generated successfully!");
      } else {
        toast.error(data.message || "Failed to generate content.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please login again.");
      } else if (error.response?.status === 400) {
        toast.error("Invalid request. Please check your blog title.");
      } else {
        toast.error("Failed to generate content. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <form className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll" onSubmit={onSubmitHandler}>
      <div className="bg-white w-full max-w-4xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload Thumbnail</p>
        <div className="w-24 relative mt-2">
          <label htmlFor="image">
            <img
              src={assets.upload_area}
              alt=""
              className="mt-2 h-16 rounded cursor-pointer"
            />
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              hidden
              required
            />
            <div>{blog.image && <img src={URL.createObjectURL(blog.image)} alt="Blog Thumbnail" className="absolute top-0 h-16 rounded" />}</div>
          </label>
        </div>
        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          className="border border-gray-300 mt-2 p-2 rounded w-full outline-primary"
          placeholder="Enter blog title"
          name="title"
          value={blog.title}
          onChange={handleChange}
          required
        />
        <p className="mt-4">Blog Subtitle</p>
        <input
          type="text"
          className="border border-gray-300 mt-2 p-2 rounded w-full outline-primary"
          placeholder="Enter blog subtitle"
          name="subtitle"
          value={blog.subtitle}
          onChange={handleChange}
          required
        />
        <p className="mt-4">Blog Author</p>
        <input
          type="text"
          className="border border-gray-300 mt-2 p-2 rounded w-full outline-primary"
          placeholder="Enter blog author"
          name="author"
          value={blog.author}
          onChange={handleChange}
          required
        />
        
        <p className="mt-4">Blog Description</p>
        <div className="max-w-4xl h-80 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef} ></div>
          <button 
            type="button" 
            onClick={generateContent} 
            disabled={isGenerating}
            className={`flex gap-2 items-center absolute right-2 bottom-2 rounded-full font-medium text-sm px-4 py-2 text-white text-center transition-all ${
              isGenerating 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A] hover:shadow-lg'
            }`}
          >
            <i className={`${isGenerating ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-wand-sparkles'} text-yellow-300`}></i>
            {isGenerating ? 'Generating...' : 'Generate with AI'}
          </button>
        </div>
        <p className="mt-4">Blog Category</p>
        <select
          name="category"
          id="category"
          value={blog.category}
          className="border border-gray-300 mt-2 p-2 rounded min-w-xs outline-primary"
          onChange={handleChange}
          required
        >
          <option value="" hidden>
            Select Categories
          </option>
          {blogCategories.map((key, idx) => (
            <option key={idx} value={key}>
              {key}
            </option>
          ))}
        </select>
        <div className="flex justify-end items-center gap-2 mt-8">
          <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-300">
            Save as Draft
          </button>
          <button
          type="submit"
            disabled={isPublishing}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            {isPublishing ? "Publishing..." : "Publish Now"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddBlog;
