import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { assets, blog_data, comments_data } from "../assets/assets";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Loader from "../Components/Loader";

dayjs.extend(relativeTime);

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState(comments_data);
  const [comment, setComment] = useState({
    name: "",
    content: "",
    createdAt: ""
  })

  const fetchBlogData = async () => {
    const result = blog_data.find((item) => item._id === id);
    setData(result);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.name && comment.content) {
      setComments([...comments, {
        ...comment,
        _id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      }]);
      setComment({ name: "", content: "", createdAt: "" });
      e.target.reset();
    } else {
      alert("Please fill in both fields.");
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        className="absolute -top-50 -z-1 opacity-50"
        alt="Background"
      />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {dayjs(data.createdAt).format("MMMM D, YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Michael Brown
        </p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt={data.title} className="rounded-3xl mb-5" />
        <div className="rich-text max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: data.description }}></div>
      </div>
      <div className="mt-14 mb-10 max-w-3xl mx-auto">
        <p className="font-semibold mb-4">Comments ({comments.length})</p>
        <div className="flex flex-col gap-4">
          {comments.map((commentData) => (
            <div className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600" key={commentData._id}>
              <div className="flex items-center gap-2 mb-2">
                <img src={assets.user_icon} alt="" className="w-6" />
                <p>{commentData.name}</p>
              </div>
              <p className="text-sm max-w-md ml-8">{commentData.content}</p>
              <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">{dayjs(commentData.createdAt).fromNow()}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-3xl mx-auto mb-10 p-6 bg-white rounded-lg ">
        <p className="font-semibold mb-4">Leave a Comment</p>
        <form className="flex flex-col gap-4 align-start">
          <input type="text" value={comment.name} onChange={(e) => setComment({ ...comment, name: e.target.value })} className="border border-gray-300 p-2 rounded outline-none" placeholder="Your Name" />
          <textarea value={comment.content} onChange={(e) => setComment({ ...comment, content: e.target.value })} className="border border-gray-300 p-2 rounded outline-none" rows="4" placeholder="Write your comment..."></textarea>
          <button className="bg-primary text-white py-2 px-4 rounded w-24 md:w-32" onClick={handleCommentSubmit}>Submit</button>
        </form>
      </div>
      {/* Share buttons */}
      <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Share this post:</p>
          <div className="flex gap-4">
              <img src={assets.facebook_icon} alt="Facebook" />
              <img src={assets.twitter_icon} alt="Twitter" />
              <img src={assets.googleplus_icon} alt="Google Plus" />
          </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
