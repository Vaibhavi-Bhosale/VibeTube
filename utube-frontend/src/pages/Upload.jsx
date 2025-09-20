import React, { useState } from "react";
import Container from "../components/Container";
import { uploadVideo } from "../api/video";
import toast from "react-hot-toast";
 import { useNavigate } from "react-router-dom";
import Wait from "../components/Wait";


function Upload() {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();

    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("description", description);

    const response = await uploadVideo(formData);

    if (response.success) {
      toast.success(response.message);
      setUploading(false);
      navigate("/");
    } else {
      toast.error(response.message || "something went wrong while uploading video");
    }
  };

  if (uploading) {
    return ( 
      <Wait msg="Uplaoding..." /> 
    );
  }

  return (
    <Container>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-black border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center">
            Upload Video
          </h2>

          {/* Video File */}
          <div>
            <label htmlFor="videoFile" className="block text-sm text-white mb-2">
              Select Video File <span className="text-red-400">*</span>
            </label>
            <input
              type="file"
              id="videoFile"
              required
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="w-full text-sm text-white 
                file:mr-3 file:py-2 file:px-4 
                file:rounded-md file:border-0 
                file:bg-white file:text-black 
                hover:file:bg-gray-200 cursor-pointer
                focus:outline-none"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label htmlFor="thumbnail" className="block text-sm text-white mb-2">
              Upload Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="w-full text-sm text-white 
                file:mr-3 file:py-2 file:px-4 
                file:rounded-md file:border-0 
                file:bg-white file:text-black 
                hover:file:bg-gray-200 cursor-pointer
                focus:outline-none"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm text-white mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg 
                bg-black text-white border border-white/30 
                focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-white mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 rounded-lg 
                bg-black text-white border border-white/30 
                focus:outline-none focus:ring-2 focus:ring-white resize-none"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-lg font-semibold 
              hover:bg-gray-200 transition-all duration-200"
          >
            Upload
          </button>
        </form>
      </div>
    </Container>
  );
}

export default Upload;
