import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { deleteVideo, getSingleVideo } from "../api/video";
import { likeVideo } from "../api/like";
import { ThumbsUp, ChevronDown, ChevronUp, MoreVertical } from "lucide-react";
import toast from "react-hot-toast";
import CommentsSection from "../components/CommentsSection";
import { useSelector } from "react-redux";
import Wait from "../components/Wait";


function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const userId = useSelector((state) => state.auth?.user._id);
  const [isdelete, setIsdelete] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  const navigate = useNavigate();

  const isOwner = video?.owner?._id === userId;

  // Fetch video
  useEffect(() => {
    (async () => {
      const videoRes = await getSingleVideo(id);
      if (videoRes.success) {
        setVideo(videoRes.data);
      } else {
        toast.error(videoRes.message || "Failed to load video");
      }
    })();
  }, [id]);

  // Handle Like
  const handleLike = async () => {
    if (!video || loadingLike) return;
    setLoadingLike(true);

    setVideo((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likesCount: prev.isLiked
        ? prev.likesCount - 1
        : prev.likesCount + 1,
    }));

    try {
      const res = await likeVideo(video._id);
      if (!res.success) {
        setVideo((prev) => ({
          ...prev,
          isLiked: !prev.isLiked,
          likesCount: prev.isLiked
            ? prev.likesCount - 1
            : prev.likesCount + 1,
        }));
        toast.error(res.message || "Failed to toggle like");
      }
    } catch {
      setVideo((prev) => ({
        ...prev,
        isLiked: !prev.isLiked,
        likesCount: prev.isLiked
          ? prev.likesCount - 1
          : prev.likesCount + 1,
      }));
      toast.error("Something went wrong!");
    } finally {
      setLoadingLike(false);
    }
  };


  // handle Delete
  const handleDelete = async () => {
    setIsdelete(true);

    const res = await deleteVideo(video._id);
    if (res.success) {
      toast.success("Video deleted!");
      navigate("/");
    } else {
      toast.error(res.message || "Failed to delete video");
      setIsdelete(false);
    }
  };

  
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  if (!video)
    return  <Wait msg="loading..."/>

  if (isdelete)
    return  <Wait msg="deleting..."/>
  return (
    <div className="flex flex-col items-center p-4 text-white bg-black min-h-screen">
      {/* Video Player */}
      <video
        controls
        autoPlay
        className="w-full max-w-5xl rounded-xl shadow-lg"
      >
        <source src={video.videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Title */}
      <h2 className="font-bold text-2xl mt-4 max-w-5xl w-full">
        {video.title}
      </h2>

      {/* Owner Info & Like/Options */}
      <div className="flex justify-between items-center w-full max-w-5xl mt-3">
        <Link to={`/profile/${video.owner._id}`}>
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src={video.owner.avatar}
              alt={video.owner.username}
              className="w-10 h-10 rounded-full border border-gray-600"
            />
            <span className="font-medium">{video.owner.username}</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition ${
              video.isLiked
                ? "bg-white text-black"
                : "bg-neutral-800 text-gray-300"
            }`}
            onClick={handleLike}
            disabled={loadingLike}
          >
            <ThumbsUp
              size={18}
              className={video.isLiked ? "text-black" : "text-gray-300"}
            />
            <span>{video.likesCount}</span>
          </button>

          {isOwner && (
            <div className="relative" ref={menuRef}>   {/* ⬅️ wrap with ref */}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="p-2 rounded-full hover:bg-neutral-800 transition"
              >
                <MoreVertical size={20} className="text-white" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-lg shadow-lg z-10 bg-neutral-900 border border-neutral-700">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(`/edit-video/${video._id}`);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-white hover:bg-neutral-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleDelete();
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-neutral-800"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Duration */}
      <p className="text-sm text-gray-400 mt-1 w-full max-w-5xl">
        Duration: {Math.floor(video.duration)} sec
      </p>

      {/* Description */}
      <div className="w-full max-w-5xl mt-4">
        <button
          onClick={() => setShowFullDesc(!showFullDesc)}
          className="flex justify-between items-center w-full bg-neutral-900 p-3 rounded-lg hover:bg-neutral-800 transition"
        >
          <span className="font-semibold">Description</span>
          {showFullDesc ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {showFullDesc && (
          <div className="bg-neutral-950 p-3 rounded-b-lg mt-1 text-gray-300 text-sm">
            {video.description || "No description provided."}
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className="w-full max-w-5xl mt-6">
        <CommentsSection videoId={id} />
      </div>
    </div>
  );
}

export default VideoPage;
