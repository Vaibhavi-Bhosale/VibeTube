import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { getSingleVideo, updateVideo } from "../api/video";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Wait from "../components/Wait";


function VideoEdit() {
  
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);


  const {id} = useParams()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditing(true);
    const formData = new FormData();

    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("description", description);

    const response = await updateVideo(id, formData);

    if (response.success) {
      toast.success(response.message);
      setEditing(false);
      navigate("/");
    } else {
      toast.error(response.message || "something went wrong while updating video");
    }
  };

  
  useEffect(()=>{
    ;(async()=>{
      const  video =await getSingleVideo(id)
      
      if( video.success)
          {
            setTitle(video.data?.title)
             setDescription(video.data?.description)
          }
          else 
            {
              toast.error(video.message)
            }
          })()
  }, [id])

  if (editing) {
    return (
       <Wait msg="Updateing Video..."/>
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
            Update video Details Video
          </h2>

          

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

export default VideoEdit;
