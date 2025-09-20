import api from "./api";

const toggleSubscription = async(id)=>
{
    try{
       const response = await api.post(`/subscriptions/c/${id}`)

       return{
          success: true,
          data : response?.data?.data,
          message : response?.data?.message
       }
    }
    catch(error)
    {
      console.log(error.response?.data?.message || "Something went wrong while Toggling Subscription");

      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong while Toggling Subscription",
      };
    }
}

const isSubscribed = async(id)=>
{
    try{
       const response = await api.post(`/subscriptions/s/${id}`)

       return{
          success: true,
          data : response?.data?.data,
          message : response?.data?.message
       }
    }
    catch(error)
    {
      console.log(error.response?.data?.message || "Something went wrong while fetching status of subscription");

      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong while fetching status of subscription",
      };
    }
}

const getChannelSubscriber = async(id) =>{
     try{
       const response = await api.get(`/subscriptions/c/${id}`)

       return{
          success: true,
          data : response?.data?.data,
          message : response?.data?.message
       }
    }
    catch(error)
    {
      console.log(error.response?.data?.message || "Something went wrong while getting subscriber list");

      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong while getting subscriber list",
      };
    }
}

const getChannelSubscribed = async(id) =>{
     try{
       const response = await api.get(`/subscriptions/u/${id}`)

       return{
          success: true,
          data : response?.data?.data,
          message : response?.data?.message
       }
    }
    catch(error)
    {
      console.log(error.response?.data?.message || "Something went wrong while getting subscribed list");

      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong while getting subscribed list",
      };
    }
}

export { toggleSubscription, getChannelSubscriber, getChannelSubscribed, isSubscribed}