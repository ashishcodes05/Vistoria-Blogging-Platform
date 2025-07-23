import React from "react";
import { assets } from "../assets/assets";
import dayjs from "dayjs";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();
  const handleDelete = async () => {
    const result = await MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!'
    });
    if (result.isConfirmed) {
      try {
        const { data } = await axios.delete(`/api/blog/${blog._id}`);
        if (data.success) {
          toast.success("Blog deleted successfully.");
          await fetchBlogs(); // Refresh the blog list after deletion
        } else {
          toast.error(data.message || "Failed to delete blog.");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the blog.");
      }
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id : blog._id });
      if(data.success) {
        toast.success(`Blog ${data.isPublished ? "published" : "unpublished"} successfully.`);
        await fetchBlogs(); // Refresh the blog list after toggling publish status
      } else {
        toast.error(data.message || "Failed to toggle publish status.");
      }
    } catch (error) {
      toast.error("An error occurred while toggling publish status.");
    }
  }
  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">
        {dayjs(BlogDate).format("MMM D, YYYY")}
      </td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${blog.isPublished ? "text-green-600" : "text-red-600"}`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button className="border px-2 py-0.5 mt-1 rounded cursor-pointer" onClick={togglePublish}>
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <div className=" flex items-center justify-center hover:scale-110 transition-all cursor-pointer text-red-600"
          onClick={handleDelete}>
          <i className="fa-solid fa-circle-xmark fa-2x"></i>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
