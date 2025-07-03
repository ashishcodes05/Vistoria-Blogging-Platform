import React from "react";
import dayjs from "dayjs";
import { assets } from "../assets/assets";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const formattedDate = dayjs(createdAt).format("MMMM D, YYYY");

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
            />
          ) : (
            <p className="text-green-500">Approved</p>
          )}
          <img src={assets.bin_icon} alt="" className="w-5 hover:scale-110 transition-all cursor-pointer" />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
