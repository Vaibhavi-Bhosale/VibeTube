import api from "./api";

const getComments = async(videoId)=>{
    try {
        const response = await api.get(`/comments/${videoId}`)

        return{
            success : true,
            data : response?.data?.data.allComment,
            message : response?.data?.data.message
        }
    } catch (error) {
        console.log(error.response?.data?.data.message || "something went wrong")
        return{
            success: false,
            message : error.response?.data?.data.message || "something went wrong"
        }
    }
}

const addComment = async (videoId, data)=>{
    
    try {
        const response = await api.post(`/comments/${videoId}`, data)

        return{
            success : true,
            data : response?.data?.data,
            message : response?.data?.data.message
        }
    } catch (error) {
        console.log(error.response?.data?.data.message || "something went wrong")
        return{
            success: false,
            message : error.response?.data?.data.message || "something went wrong"
        }
    }
    
}

const commentUpdate = async (commentId, data)=>{
    
    try {
        const response = await api.patch(`/comments/c/${commentId}`, data)

        return{
            success : true,
            data : response?.data?.data,
            message : response?.data?.data.message
        }
    } catch (error) {
        console.log(error.response?.data?.data.message || "something went wrong")
        return{
            success: false,
            message : error.response?.data?.data.message || "something went wrong"
        }
    }
}

const deleteComment = async (commentId)=>{
     try {
        const response = await api.delete(`/comments/c/${commentId}`)

        return{
            success : true,
            data : response?.data?.data,
            message : response?.data?.data.message
        }
    } catch (error) {
        console.log(error.response?.data?.data.message || "something went wrong")
        return{
            success: false,
            message : error.response?.data?.data.message || "something went wrong"
        }
    }
}

export { getComments, addComment, commentUpdate, deleteComment}