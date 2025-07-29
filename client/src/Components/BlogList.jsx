import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";
import Loader from "./Loader"

const BlogList = () => {
  const [category, setCategory] = useState("All");
  const { blogs, query, setQuery } = useAppContext();
  const filteredBlogs = blogs.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.category.toLowerCase().includes(query.toLowerCase())
    );
  });
  if(filteredBlogs.length === 0 && query !== "") {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">No blogs found.</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto">
      <div className="flex justify-center gap-1 sm:gap-4 my-10 relative px-4 sm:px-8 lg:px-12 xl:px-16">
        {blogCategories.map((blogCategory, index) => (
          <button
            key={index}
            className={`text-black px-4 rounded-full hover:scale-105 transition-all cursor-pointer text-sm md:text-lg ${
              category === blogCategory
                ? "border-2 border-primary text-primary font-semibold"
                : ""
            }`}
            onClick={() => setCategory(blogCategory)}
          >
            {blogCategory}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-8 sm:mx-16 xl:mx-24">
        {filteredBlogs ? filteredBlogs
          .filter((blog) => {
            return (
              category === "All" ||
              blog.category.toLowerCase() === category.toLowerCase()
            );
          })
          .map((blog) => (
            <BlogCard
              key={blog._id}
              title={blog.title}
              description={blog.description}
              category={blog.category}
              image={blog.image}
              _id={blog._id}
            />
          )): (
            <Loader />
          )}
      </div>
      <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-center pt-10">
        "From tech deep-dives to life reflections, motivational sparks to
        creative musings, <br />
        Vistoria is your canvas."
      </p>
    </div>
  );
};

export default BlogList;
