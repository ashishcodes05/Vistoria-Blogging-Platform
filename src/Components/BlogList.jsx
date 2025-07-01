import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className="container mx-auto">
      <div className="flex justify-center gap-1 sm:gap-4 my-10 relative px-4 sm:px-8 lg:px-12 xl:px-16">
        {blogCategories.map((blogCategory, index) => (
          <button
            key={index}
            className={`text-black px-4 py-2 rounded-full hover:scale-105 transition-all cursor-pointer text-sm md:text-lg ${
              category === blogCategory ? "bg-primary text-white" : ""
            }`}
            onClick={() => setCategory(blogCategory)}
          >
            {blogCategory}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-8 sm:mx-16 xl:mx-24">
        {blog_data.filter((blog) => {
            return category === "All" || blog.category === category;
        }).map((blog) => (
          <BlogCard
            key={blog._id}
            title={blog.title}
            description={blog.description}
            category={blog.category}
            image={blog.image}
            _id={blog._id}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
