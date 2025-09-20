import { useState, useRef, useEffect } from "react";
import { Heart, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

const TweetCard = ({ tweet, onEdit, onDelete, handleLike, userId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // ✅ ref for menu wrapper
  const isOwner = tweet.owner === userId;

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div
      className="relative border border-gray-200 dark:border-[#3C3D37] rounded-2xl p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-300 
      w-full max-w-xl mx-auto break-words"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between">
        {/* Left Side: Avatar + Name */}
        <Link to={`/profile/${tweet.owner}`}>
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={tweet.avatar}
              alt={tweet.username}
              className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-[#697565]"
            />
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-[#ECDFCC] capitalize truncate">
                {tweet.username}
              </h3>
              <p className="text-sm text-gray-500">@{tweet.username}</p>
            </div>
          </div>
        </Link>

        {/* Right Side: Menu (for owner only) */}
      {isOwner && (
  <div className="relative" ref={menuRef}>
    <button
      onClick={() => setMenuOpen((prev) => !prev)}
      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      <MoreVertical
        size={20}
        className="text-gray-800 dark:text-gray-200"
      />
    </button>

    {menuOpen && (
      <div className="absolute right-0 mt-2 w-28 rounded-lg shadow-md z-10 
                      bg-white dark:bg-black border border-gray-300 dark:border-gray-600">
        <button
          onClick={() => {
            setMenuOpen(false);
            onEdit(tweet._id);
          }}
          className="w-full px-3 py-2 text-left text-sm 
                     text-black dark:text-white 
                     hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Edit
        </button>
        <button
          onClick={() => {
            setMenuOpen(false);
            onDelete(tweet._id);
          }}
          className="w-full px-3 py-2 text-left text-sm 
                     text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Delete
        </button>
      </div>
    )}
  </div>
)}

      </div>

      {/* Tweet Content */}
      <p className="mt-3 text-gray-800 dark:text-[#ECDFCC] text-base leading-relaxed whitespace-pre-wrap break-words">
        {tweet.content}
      </p>

      {/* Action Buttons */}
      <div className="flex items-center gap-6 mt-4 text-gray-600 dark:text-[#ECDFCC]">
        {/* Like Button */}
        <button
          className="flex items-center gap-2 hover:text-red-500 transition-colors duration-200"
          onClick={() => {
            handleLike(tweet._id);
          }}
        >
          <Heart
            size={20}
            className={tweet.isLiked ? "fill-red-500 text-red-500" : ""}
          />
          <span className="text-sm">{tweet.likeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default TweetCard;
