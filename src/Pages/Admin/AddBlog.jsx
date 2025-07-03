import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
    isPublished: false,
  });

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow", placeholder: "Write your blog description here..." });
    }
  }, []);
  return (
    <form className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll">
      <div className="bg-white w-full max-w-4xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload Thumbnail</p>
        <div className="w-24">
          <label htmlFor="image">
            <img
              src={assets.upload_area}
              alt=""
              className="mt-2 h-16 rounded cursor-pointer"
            />
            <input
              type="file"
              id="image"
              onChange={(e) => console.log(e.target.files[0])}
              hidden
              required
            />
          </label>
        </div>
        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          className="border border-gray-300 mt-2 p-2 rounded w-full outline-primary"
          placeholder="Enter blog title"
          required
        />
        <p className="mt-4">Blog Description</p>
        <div className="max-w-4xl h-80 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          <button className="flex gap-2 items-center absolute right-2 bottom-2 rounded-full font-medium text-sm px-4 py-2 text-white text-center bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
            <i class="fa-solid fa-wand-sparkles"></i>Generate with AI
          </button>
        </div>
        <p className="mt-4">Blog Category</p>
        <select
          name="category"
          id="category"
          className="border border-gray-300 mt-2 p-2 rounded min-w-xs outline-primary"
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
          <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-300">Save as Draft</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">Publish Now</button>
        </div>
      </div>
    </form>
  );
};

export default AddBlog;
