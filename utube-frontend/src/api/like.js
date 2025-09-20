import api from "./api";

const likeVideo = async (videoId)=>{
    try{
        const response = await api.post(`/likes/toggle/v/${videoId}`)

        return{
            success : true,
            data : response.data,
            message :response.message
        }
        
    } catch (error) {
        console.log(error.response?.message || "No like added")
        return{
            success : false,
            message : error.response?.message || "No like added"
        }
    }
}

const likeTweet = async (tweetId)=>
{
     try{
        const response = await api.post(`/likes/toggle/t/${tweetId}`)

        return{
            success : true,
            data : response.data,
            message :response.message
        }
        
    } catch (error) {
        console.log(error.response?.message || "No like added")
        return{
            success : false,
            message : error.response?.message || "No like added"
        }
    }
}
const likeComment = async (commentId)=>
{
     try{
        const response = await api.post(`/likes/toggle/c/${commentId}`)

        return{
            success : true,
            data : response.data,
            message :response.message
        }
        
    } catch (error) {
        console.log(error.response?.message || "No like added")
        return{
            success : false,
            message : error.response?.message || "No like added"
        }
    }
}

const getLikedVideos = async()=>{
    try {

        const response = api.get("/likes/videos")

         return{
            success : true,
            data : response.data,
            message :response.message
        }
        
    } catch (error) {
        console.log(error.response?.message || "something went wrong at fetching liked videos")
        return{
            success : false,
            message : error.response?.message || "something went wrong at fetching liked videos"
        }
    }
}

export {
    likeComment,
    likeVideo,
    likeTweet,
    getLikedVideos
}