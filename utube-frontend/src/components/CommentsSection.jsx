import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getComments, addComment, deleteComment } from "../api/comment";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function CommentsSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [postingComment, setPostingComment] = useState(false);

  const userId = useSelector((state) => state.auth?.user?._id);

  // Fetch comments
  const loadComments = async () => {
    setLoadingComments(true);
    const res = await getComments(videoId);
    if (res.success) {
      setComments(res.data);
    } else {
      toast.error(res.message || "Failed to load comments");
    }
    setLoadingComments(false);
  };

  useEffect(() => {
    if (videoId) loadComments();
  }, [videoId]);

  // Add new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setPostingComment(true);
    const res = await addComment(videoId, { content: newComment });
    if (res.success) {
      toast.success("Comment added!");
      setNewComment("");
      loadComments();
    } else {
      toast.error(res.message || "Failed to add comment");
    }
    setPostingComment(false);
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    const res = await deleteComment(commentId);
    if (res.success) {
      toast.success("Comment deleted");
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } else {
      toast.error(res.message || "Failed to delete comment");
    }
  };

  return (
    <div className="w-full max-w-4xl mt-6">
      <h3 className="text-xl font-semibold mb-2 text-white">Comments</h3>

      {/* Add Comment */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-black text-white border border-gray-700 rounded-lg px-3 py-2 outline-none"
        />
        <button
          onClick={handleAddComment}
          disabled={postingComment}
          className="bg-white text-black px-4 rounded-lg hover:opacity-80 transition disabled:opacity-50"
        >
          {postingComment ? "Posting..." : "Post"}
        </button>
      </div>

      {/* Comments List */}
      {loadingComments ? (
        <p className="text-gray-400">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-400">No comments yet. Be the first!</p>
      ) : (
        <div className="flex flex-col gap-3">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex items-start gap-3 bg-black border border-gray-700 p-3 rounded-xl shadow-sm"
            >
              {/* Avatar */}
              <Link to={`/profile/${comment.owner._id}`}>
                <img
                  src={comment.owner.avatar}
                  alt={comment.owner.username}
                  className="w-10 h-10 rounded-full border border-gray-600 hover:opacity-80 transition cursor-pointer"
                />
              </Link>

              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <Link to={`/profile/${comment.owner._id}`}>
                    <p className="text-white font-semibold text-sm hover:underline cursor-pointer">
                      {comment.owner.username}
                    </p>
                  </Link>
                  {comment.owner._id === userId && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                <p className="text-gray-300 text-sm mt-1 break-words">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentsSection;
