import React, { useEffect, useState } from "react";
import { createTweet, editTweet } from "../api/tweet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function TweetPostForm({ tweet }) {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // Sync state with incoming tweet
  useEffect(() => {
    if (tweet) {
      setContent(tweet.content || "");
    }
  }, [tweet]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Tweet content cannot be empty!");
      return;
    }

    const response = tweet
      ? await editTweet(tweet._id, { content })
      : await createTweet({ content });

    if (response.success) {
      toast.success(response.message);
      navigate("/tweet");
    } else {
      toast.error(response.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-black rounded-2xl shadow-md p-4 sm:p-6">
      {/* User Info */}
      {tweet && (
        <div className="flex items-center gap-3 mb-4">
          <img
            src={tweet.avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="w-12 h-12 rounded-full border-2 border-[#697565] object-cover"
          />
          <div>
            <h3 className="font-semibold text-[#ECDFCC] text-lg">
              {tweet.fullname}
            </h3>
            <span className="text-sm text-[#697565]">@{tweet.username}</span>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          id="content"
          placeholder="Write your tweet here!"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full resize-none rounded-xl border border-[#697565] bg-black p-3 text-white focus:ring-2 focus:ring-[#697565] focus:outline-none min-h-[120px]"
        ></textarea>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!content.trim()}
            className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 shadow-md 
              ${
                content.trim()
                  ? "bg-white text-black hover:bg-gray-200 cursor-pointer font-bold"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
          >
            {tweet ? "Edit Tweet" : "Create Tweet"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TweetPostForm;
