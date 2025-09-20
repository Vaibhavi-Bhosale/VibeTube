import api from "./api";

const createTweet = async(data)=>{
    try {
        const response = await api.post("/tweets/", data)
    
        return {
            success : true,
            message : response?.data?.message
        }
    } catch (error) {
        console.log(error.response?.data?.message || "something went wrong at creating tweet")

        return {
            success : false,
            message : error.response?.data?.message || "something went wrong at creating tweet"
        }
    }
}

const getAllTweet = async()=>{
    try{
        console.log("running till here in tweet")
        const response = await api.get("/tweets/")



        return {
            success : true,
            data : response?.data?.data,
            message : response?.data?.message  
        }
    }
    catch(error)
    {

         console.error("Full error object:", error);
    console.error("Status:", error.response?.status);
    console.error("Message:", error.response?.data?.message);
        console.log(error.response?.data?.message || "something went wrong at fetching all tweet")

        return {
            success : false,
            message : error.response?.data?.message || "something went wrong at fetching all tweet"
        }
    }
}

const getUserTweet = async(userId)=>{
    try {
        const response = await api.get(`/tweets/user/${userId}`)
        
        return {
            success : true,
            data : response?.data?.data,
            message :  response?.data?.message 
        }
    } catch (error) {
        console.log(error.response?.data?.message || "something went wrong at fetching user tweet")

        return {
            success : false,
            message : error.response?.data?.message || "something went wrong at fetching user tweet"
        }
    }
}

const getTweet = async(tweetId)=>{
    try {
        const response = await api.get(`/tweets/${tweetId}`)
        
        return {
            success : true,
            data : response?.data?.data,
            message :  response?.data?.message 
        }
    } catch (error) {
        console.log(error.response?.data?.message || "something went wrong at fetching tweet")

        return {
            success : false,
            message : error.response?.data?.message || "something went wrong at fetching tweet"
        }
    }
}
const editTweet = async(tweetId, data) =>{

    try{
        const response = await api.patch(`/tweets/${tweetId}`, data)
        return {
            success : true,
            message : response?.data?.message
        }
    }
    catch(error)
    {
        console.log(error.response?.data?.message || "something went wrong at updating tweet")

        return {
            success : false,
            message : error.response?.data?.message || "something went wrong at updating tweet"
        }
    }
}

const deleteTweet = async(tweetId) =>{

    
    try{
        const response = await api.delete(`/tweets/${tweetId}`)
        return {
            success : true,
            message : response?.data?.message
        }
    }
    catch(error)
    {
        console.log(error.response?.data?.message || "something went wrong at deleting tweet tweet")

        return {
            success : false,
            message : error.response?.data?.message || "something went wrong at  deleting tweet"
        }
    }
}

export {createTweet, getAllTweet, getUserTweet, getTweet,editTweet, deleteTweet}