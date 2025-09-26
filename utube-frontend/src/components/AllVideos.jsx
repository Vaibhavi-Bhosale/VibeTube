import React, { useEffect, useState } from "react";
import { getAllVideos } from "../api/video";
import { Link } from "react-router-dom";

function AllVideos({ user = "", query = "" }) {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);   // wait karke query update
    }, 500);

    return () => {
      clearTimeout(handler);      // agar fast type kar rahe ho to cancel karega
    };
  }, [query]);

  // API call effect
  useEffect(() => {
    (async () => {
      const response = await getAllVideos(`${user}${debouncedQuery}`);
      if (response.success) {
        setError("");
        setVideos(response.data);
      } else {
        console.error(response.message || "something went wrong");
        setError(response.message || "something went wrong");
      }
    })();
  }, [user, debouncedQuery]);

  // Utility to format duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="md:p-7 ">
      {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
      {videos.length === 0 ? (
        <p className="text-gray-400 text-center">No videos available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-black md:bg-[#3C3D37]/60 md:rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
            >
              {/* Thumbnail */}
              <Link to={`/video/${video._id}`}>
                <div className="relative w-full h-48  ">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                  </span>
                </div>

                {/* Details */}
                <div className="md:p-4 p-1">
                  <h2 className="md:text-lg text-sm text-gray-100 truncate">
                    {video.title}
                  </h2>
                   
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="p-10 "></div>
    </div>
  );
}

export default AllVideos;
