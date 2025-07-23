import React from "react";
import dayjs from "dayjs";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import toast from "react-hot-toast";

const MySwal = withReactContent(Swal);

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const formattedDate = dayjs(createdAt).format("MMMM D, YYYY");
  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", { id: _id });
      if (data.success) {
        toast.success("Comment approved successfully.");
        fetchComments();
      } else {
        toast.error(data.message || "Failed to approve comment.");
      }
    } catch (error) {
      toast.error("An error occurred while approving the comment.");
    }
  }

  const deleteComment = async () => {
    try {
      const result = await MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!'
      });

      if (result.isConfirmed) {
        const { data } = await axios.post("/api/admin/delete-comment", { id: _id });
        if (data.success) {
          toast.success("Comment deleted successfully.");
          fetchComments();
        } else {
          toast.error(data.message || "Failed to delete comment.");
        }
      }
    } catch (error) {
      toast.error("An error occurred while deleting the comment.");
    }
  }

  return (
    <tr className="order-y border-gray-300 border-b">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b> : {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">{formattedDate}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              onClick={approveComment}
            />
          ) : (
            <p className="text-green-500">Approved</p>
          )}
          <img src={assets.bin_icon} alt="" className="w-5 hover:scale-110 transition-all cursor-pointer" onClick={deleteComment} />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
