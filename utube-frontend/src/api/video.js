import api from "./api";

const getAllVideos = async(query=null)=>
{
    try{
       const response = await api.get(`/videos?sortBy=createdAt&sortType=desc${query || ""}`)
      
       return {
        success : true,
        data : response.data.data.allVideos,
        message : response?.data?.message 
       }
    }
    catch(error)
    {
       console.log(error.response?.data?.message || "something went wrong at fetching videos")

       return{
        success : false,
        message : error.response?.data?.message || "something went wrong at fetching videos"
       }
    }
}

const getSingleVideo = async (id)=>{
      
     try{
          const response = await api.get(`/videos/${id}`)

          return {
            success : true,
            data : response.data.data,
            message :  response?.data?.message 
          }
     }
     catch(error)
     {
          console.log(error.response?.data?.message || "something went wrong at fetching videos")

          return {
            success : false,
            message : error.response?.data?.message || "something went wrong at fetching videos"
          }
     }
}

const  uploadVideo = async(formData)=>{
    
   try{
       const response = await api.post("/videos/", formData)

       return {
         success: true,
         message : response?.data?.message
       }
   }
   catch(error)
   {
       console.log(error.response?.data?.message || "something went wrong at uploading video")

       return {
            success : false,
            message : error.response?.data?.message || "something went wrong at uploading video"
          }
   }
}

const updateVideo = async(videoId, formData) =>{
    try{
        const response  = await api.patch(`/videos/${videoId}`, formData)

         return {
         success: true,
         message : response?.data?.message
       }
    }
    catch{

       console.log(error.response?.data?.message || "something went wrong at updating video")

       return {
            success : false,
            message : error.response?.data?.message || "something went wrong at updating video"
          }
   
    }
}

const deleteVideo = async(videoId) =>{
   try{
        const response  = await api.delete(`/videos/${videoId}`)

         return {
         success: true,
         message : response?.data?.message || "Video Delete Successfully"
       }
    }
    catch(error){

       console.log(error.response?.data?.message || "something went wrong at deleting video")

       return {
            success : false,
            message : error.response?.data?.message || "something went wrong at deleting video"
          }
   
    }
}
export{ getAllVideos, getSingleVideo, uploadVideo, updateVideo, deleteVideo}